import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../providers/AuthContextProvider';
import CardPost from './CardPost';

const styles = StyleSheet.create({
  view: { flex: 1, padding: 10 },
  feedList: { flex: 5, padding: 10 },
});

const Home = () => {
  const navigation = useNavigation();
  const { Logout } = useContext(AuthContext);
  const CardPressHandle = () => {
    navigation?.navigate('Post');
  };

  const CriarPostagem = () => {
    navigation.navigate('NovoPost');
  };
  useEffect(() => {
    navigation.removeListener('beforeRemove');
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      Alert.alert('Realizar logout', 'Deseja sair?', [
        {
          text: 'Ficar',
          style: 'cancel',
          onPress: () => {
            console.log();
          },
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
        <CardPost onPress={CardPressHandle} />
        <CardPost onPress={CardPressHandle} />
        <CardPost onPress={CardPressHandle} />
        <CardPost onPress={CardPressHandle} />
        <CardPost onPress={CardPressHandle} />
        <CardPost onPress={CardPressHandle} />
        <CardPost onPress={CardPressHandle} />
        <CardPost onPress={CardPressHandle} />
      </ScrollView>
    </>
  );
};

export default Home;
