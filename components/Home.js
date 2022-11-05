import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, ActivityIndicator } from 'react-native-paper';
import Firebase from '../config/Firebase';
import { AuthContext } from '../providers/AuthContextProvider';
import CardPost from './CardPost';

const styles = StyleSheet.create({
  view: { flex: 1, padding: 10 },
  feedList: { flex: 5, padding: 10 },
});

const Loading = ({ animate }) => {
  if (animate === true)
    return <ActivityIndicator animating={animate} color="#008C8C" />;
  return <Text>Não há nenhum Post.</Text>;
};

const Home = () => {
  const navigation = useNavigation();
  const { Logout } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const CardPressHandle = (PostId) => {
    navigation?.navigate('Post', { id: PostId });
  };

  const CriarPostagem = () => {
    navigation.navigate('NovoPost');
  };

  const ObterUltimosPosts = async () => {
    const db = Firebase.database().ref('posts');
    const postsCarregados = [];
    db.on('value', (snapshot) => {
      snapshot.forEach((value) => {
        postsCarregados.push({
          id: value.key,
          nomeLocal: value.val().nomeLocal,
          tags: value.val().tags,
          descricao: value.val().descricao,
          dataInclusao: value.val().dataInclusao,
        });
      });
      setPosts(postsCarregados);
    });
  };

  const DisposeEvent = () => {
    navigation.removeListener('beforeRemove');
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      Alert.alert('Realizar logout', 'Deseja sair?', [
        {
          text: 'Ficar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            navigation.dispatch(e.data.action);
            Logout();
          },
        },
      ]);
    });
  };

  useFocusEffect(
    useCallback(() => {
      ObterUltimosPosts();
    }, [])
  );

  useEffect(() => {
    DisposeEvent();
    // ObterUltimosPosts();
  }, []);

  return (
    <>
      <View style={{ alignItems: 'center' }}>
        <Button
          icon="plus"
          mode="text"
          onPress={CriarPostagem}
          contentStyle={{
            flexDirection: 'row-reverse',
            color: '#008C8C',
            borderRadius: 20,
            borderColor: '#008C8C',
            borderStyle: 'solid',
            borderWidth: 5,
          }}
          color="#008C8C"
          style={{ width: 250, margin: 10 }}
        >
          Nova Postagem
        </Button>
      </View>
      <Text
        style={{
          fontSize: 25,
          lineHeight: 25,
          textAlign: 'center',
          padding: 10,
        }}
      >
        Ultimas postagens
      </Text>
      {posts?.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item, i }) => (
            <CardPost
              key={i}
              onPress={() => CardPressHandle(item.id)}
              post={item}
            />
          )}
        />
      ) : (
        <Loading animate={posts == null} />
      )}
    </>
  );
};

export default Home;
