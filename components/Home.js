import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../config/Context';
import CardPost from './CardPost';

const styles = StyleSheet.create({
  view: { flex: 1, padding: 10 },
});

const Home = () => {
  const navigation = useNavigation();
  const { Logout } = useContext(AuthContext);
  const CardPressHandle = () => {
    navigation?.navigate('Post');
  };

  navigation.addListener('beforeRemove', (e) => {
    e.preventDefault();

    Alert.alert('Realizar logout', 'Deseja sair?', [
      { text: 'Ficar', style: 'cancel', onPress: () => {} },
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

  return (
    <>
      <Text
        style={{
          fontSize: 50,
          lineHeight: 50,
          textAlign: 'center',
          padding: 25,
        }}
      >
        Feed
      </Text>
      <ScrollView style={{ flex: 5, padding: 10 }}>
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
