import { Text, ScrollView, View, TouchableNativeFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import Badge from './Badge';
import BlockImage from './BlockImage';
import Firebase from '../config/Firebase';

const TextResumo = ({ children }) => {
  const text = `${children.substring(0, 65)}...`;

  return <Text style={{ fontSize: 15 }}>{text}</Text>;
};
const CardPost = ({ onPress, post }) => {
  const [imagem, setImagem] = useState(null);
  const { id, nomeLocal, tags, descricao } = post;
  const obterImagem = () => {
    const storage = Firebase.storage().ref(`posts/${id}`);
    storage.getDownloadURL().then((resp) => {
      setImagem(resp);
    });
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
        <BlockImage random={!!imagem} uri={imagem} />
        <View style={{ padding: 5, flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20 }}>
              {nomeLocal ?? 'Titulo do post'}
            </Text>
          </View>
          <ScrollView horizontal>
            <View
              onStartShouldSetResponder={() => true}
              style={{ flexDirection: 'row' }}
            >
              {tags?.length > 0 &&
                tags.map((tag, i) => <Badge key={`tag${i}`}>{tag}</Badge>)}
            </View>
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
