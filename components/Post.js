import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import BlockImage from './BlockImage';
import Firebase from '../config/Firebase';
import Tags from './Tags';
import { AuthContext } from '../providers/AuthContextProvider';

const Post = ({ route }) => {
  const [imagem, setImagem] = useState(null);
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const { user } = useContext(AuthContext);

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
      let likes = [];
      if (snapshot.val()?.likes)
        likes = Object.entries(snapshot.val()?.likes).map((e) => e);

      setPost({
        id: snapshot.key,
        nomeLocal: snapshot.val().nomeLocal,
        tags: snapshot.val().tags,
        descricao: snapshot.val().descricao,
        dataInclusao: snapshot.val().dataInclusao,
        endereco: snapshot.val().endereco,
        usuario: snapshot.val().usuario,
        likes,
      });

      setQtdeLikes(likes?.length ?? 0);
      setLiked(JaDeuLike(likes));
    });
  };

  useEffect(() => {
    ObterPost();
    obterImagem();
  }, []);

  const randomValue = () => Math.round(Math.random(1) * 1000);
  const initComents = randomValue();
  const [coments, setComents] = useState(initComents);
  const [qtdeLikes, setQtdeLikes] = useState(0);

  const getLikeId = (value = null) =>
    value
      ? value?.filter((x) => x[1] === user.uid)
      : post?.likes?.filter((x) => x[1] === user.uid);

  const JaDeuLike = (value = null) => getLikeId(value)?.length > 0;

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      const db = Firebase.database().ref(`posts/${post.id}/likes`);
      db.push(user.uid);
      setQtdeLikes(qtdeLikes + 1);
      return;
    }
    const likeId = getLikeId()[0][0];
    const db = Firebase.database().ref(`posts/${post.id}/likes/${likeId}`);
    db.remove();
    setQtdeLikes(qtdeLikes - 1);
  };

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
          <ScrollView horizontal>
            <Tags tags={post?.tags} />
          </ScrollView>
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
          <Text style={{ fontSize: 20 }}>{post?.descricao}</Text>
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
                {post?.endereco?.logradouro}
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
            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 20,
                alignItems: 'center',
              }}
            >
              <AntDesign
                name="like1"
                size={50}
                color={liked ? '#008C8C' : 'black'}
              />
              <Text style={{ fontSize: 30 }}>{qtdeLikes}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </ScrollView>
  );
};

export default Post;
