import { Text, ScrollView, View, TouchableNativeFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import BlockImage from './BlockImage';
import Firebase from '../config/Firebase';
import Tags from './Tags';

const TextResumo = ({ children }) => {
  const text = `${children.substring(0, 65)}...`;

  return <Text style={{ fontSize: 15 }}>{text}</Text>;
};
const CardPost = ({ onPress, post }) => {
  const [imagem, setImagem] = useState(null);
  const { id, nomeLocal, tags, descricao } = post;
  const obterImagem = () => {
    const storage = Firebase.storage().ref(`posts/${id}`);
    storage
      ?.getDownloadURL()
      ?.then((resp) => {
        if (resp) setImagem(resp);
      })
      ?.catch((e) => {});
  };
  useEffect(() => {
    obterImagem();
  }, []);
  return (
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
        <BlockImage random={false} uri={imagem} />
        <View style={{ padding: 5, flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20 }}>
              {nomeLocal ?? 'Titulo do post'}
            </Text>
          </View>
          <ScrollView horizontal>
            <Tags tags={tags} />
          </ScrollView>
          <View style={{ flex: 1 }}>
            {descricao ? (
              <TextResumo>{descricao}</TextResumo>
            ) : (
              <TextResumo>
                Resumo do post bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla bla
              </TextResumo>
            )}
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CardPost;
