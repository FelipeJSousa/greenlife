import { Text, ScrollView, View, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import Badge from './Badge';
import BlockImage from './BlockImage';

const TextResumo = ({ children }) => {
  const text = `${children.substring(0, 65)}...`;

  return <Text style={{ fontSize: 15 }}>{text}</Text>;
};
const CardPost = ({ onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View
      style={{
        borderStyle: 'solid',
        borderWidth: 5,
        borderRadius: 20,
        borderColor: '#008C8C',
        padding: 10,
        flexDirection: 'row',
        marginBottom: 10,
      }}
    >
      <BlockImage />
      <View style={{ padding: 5, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20 }}>Titulo do post</Text>
        </View>
        <ScrollView horizontal>
          <View
            onStartShouldSetResponder={() => true}
            style={{ flexDirection: 'row' }}
          >
            <Badge>Tag 1</Badge>
            <Badge>Tag 2</Badge>
            <Badge>Tag loooonga 3</Badge>
            <Badge>Tag 4</Badge>
            <Badge>Tag 5</Badge>
          </View>
        </ScrollView>
        <View style={{ flex: 1 }}>
          <TextResumo>
            Resumo do post bla bla bla bla bla bla bla bla bla bla bla bla bla
            bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
            bla
          </TextResumo>
        </View>
      </View>
    </View>
  </TouchableNativeFeedback>
);

export default CardPost;
