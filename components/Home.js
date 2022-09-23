import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import CardPost from './CardPost';

const styles = StyleSheet.create({
  view: { flex: 1, padding: 10 },
});

function Home() {
  const navigation = useNavigation();
  const CardPressHandle = () => {
    navigation?.navigate('Post');
  };
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
}

export default Home;
