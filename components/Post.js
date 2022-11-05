import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';
import BlockImage from './BlockImage';
import Firebase from '../config/Firebase';

const Post = ({ route }) => {
  const [imagem, setImagem] = useState(null);
  const { id } = route.params;
  const [post, setPost] = useState(null);

  const obterImagem = () => {
    const storage = Firebase.storage().ref(`posts/${id}`);
    storage
      ?.getDownloadURL()
      ?.then((resp) => {
        setImagem(resp);
      })
      ?.catch((e) => {});
  };

  const ObterPost = () => {
    const db = Firebase.database().ref(`posts/${id}`);
    db.on('value', (snapshot) => {
      setPost({
        id: snapshot.key,
        nomeLocal: snapshot.val().nomeLocal,
        tags: snapshot.val().tags,
        descricao: snapshot.val().descricao,
        dataInclusao: snapshot.val().dataInclusao,
        endereco: snapshot.val().endereco,
        usuario: snapshot.val().usuario,
      });
    });
  };

  useEffect(() => {
    ObterPost();
    obterImagem();
  }, []);

  const randomValue = () => Math.round(Math.random(1) * 1000);
  const initLike = randomValue();
  const initComents = randomValue();
  const [coments, setComents] = useState(initComents);
  const [like, setLike] = useState(initLike);
  const handleLike = () => setLike(like + 1);
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <BlockImage
          width={Dimensions.get('window').width}
          height={250}
          border={0}
          uri={imagem}
        />
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 50, paddingHorizontal: 5 }}>
            {post?.nomeLocal ?? 'Titulo do Post'}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ fontSize: 15 }}>Autor: {post?.usuario ?? '-'}</Text>
            <Text style={{ fontSize: 15 }}>
              {moment(post?.dataInclusao).fromNow() ?? '20/09/01 às 19:50'}
            </Text>
          </View>
          <Text style={{ fontSize: 20 }}>
            {post?.descricao ??
              `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            at nibh tincidunt, pretium dui ut, laoreet lacus. Nunc faucibus arcu
            quis rutrum condimentum. Nam mollis lectus enim, a congue neque
            tristique at. Maecenas quam libero, scelerisque vitae porta non,
            congue semper erat. Pellentesque maximus lectus risus, eget ornare
            arcu ullamcorper vel. Fusce aliquet egestas justo sit amet
            efficitur. Donec ultricies cursus odio, id commodo dolor`}
          </Text>
          <View style={{ flex: 1, paddingVertical: 10, flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
              }}
            >
              <Entypo name="location-pin" size={50} color="#008C8C" />
            </View>
            <View
              style={{
                flex: 5,
                flexDirection: 'column',
              }}
            >
              <Text style={{ fontSize: 20, textAlign: 'center' }}>
                {post?.endereco?.logradouro ??
                  `R. José Bongiovani 259 - Pres. Prudente - SP - 19050-050 -
                Brasil`}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 30, paddingHorizontal: 5 }}>
            {coments} Comentários
          </Text>
          <TouchableNativeFeedback onPress={handleLike}>
            <View style={{ flexDirection: 'column', paddingHorizontal: 20 }}>
              <AntDesign name="like1" size={50} color="#008C8C" />
              <Text style={{ fontSize: 30 }}>{like}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </ScrollView>
  );
};

export default Post;
