import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Firebase from '../config/Firebase';
import { AuthContext } from '../providers/AuthContextProvider';
import CardPost from './CardPost';

const styles = StyleSheet.create({
  view: { flex: 1, padding: 10 },
  feedList: { flex: 5, padding: 10 },
});

const Home = () => {
  const navigation = useNavigation();
  const { Logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const CardPressHandle = () => {
    navigation?.navigate('Post');
  };

  const CriarPostagem = () => {
    navigation.navigate('NovoPost');
  };

  const ObterUltimosPosts = () => {
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
    });
    setPosts(postsCarregados);
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
      console.log(posts);
    }, [])
  );

  useEffect(() => {
    DisposeEvent();
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
      <ScrollView style={styles.feedList}>
        {posts?.length > 0 ? (
          posts.map((post, i) => (
            <CardPost key={i} onPress={CardPressHandle} post={post} />
          ))
        ) : (
          <Text>Não há nenhum Post.</Text>
        )}
      </ScrollView>
    </>
  );
};

export default Home;
