import React from 'react'
import { Text, List} from 'react-native-paper'
import {View, StyleSheet, ScrollView} from 'react-native';

const ListItems = () => {
  return (
    <View style={styles.view}>
      <Text>Exemplo de Listas</Text>
      <ScrollView>
        <List.Accordion title="Itens Categoria 1">
            <List.Item title="Item 1"></List.Item>
            <List.Item title="Item 2"></List.Item>
            <List.Section>
              <List.Subheader>Seção da Lista</List.Subheader>
              <List.Item title="Item 2.1"></List.Item>
              <List.Item title="Item 2.2"></List.Item>
              <List.Item title="Item 2.3"></List.Item>
              <List.Item title="Item 2.4"></List.Item>
              <List.Item title="Item 2.5"></List.Item>
            </List.Section>
            <List.Item title="Item 3"></List.Item>
            <List.Item title="Item 4"></List.Item>
        </List.Accordion>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {flex:1, justifyContent: 'center', padding:10}
});

export default ListItems