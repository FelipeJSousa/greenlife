import React from 'react'
import { Card, Text } from 'react-native-paper'
import {View, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <View style={styles.view}>
        <Card>
            <Card.Title 
                title="Seja Bem-vindo!" 
                subtitle="Primeiro Aplicativo."
            />
            <Card.Content>
                <Text>Esse aqui é o conteúdo do card!</Text>
            </Card.Content>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>
        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    view: {flex:1, justifyContent: 'center', padding:10}
  });
  

export default Home;