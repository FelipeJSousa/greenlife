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
import { Button, TextInput } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
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
  const [coment, setComent] = useState('');
  const [qtdeComents, setQtdeComents] = useState(0);
  const [qtdeLikes, setQtdeLikes] = useState(0);

  const obterImagem = () => {
    const storage = Firebase.storage().ref(`posts/${id}`);
    storage
      ?.getDownloadURL()
      ?.then((resp) => {
        setImagem(resp);
      })
      ?.catch((e) => { });
  };

  const ObterPost = () => {
    const db = Firebase.database().ref(`posts/${id}`);
    db.on('value', (snapshot) => {
      let likes = [];
      if (snapshot.val()?.likes)
        likes = Object.entries(snapshot.val()?.likes).map((e) => e);

      let coments = [];
      if (snapshot.val()?.coments)
        coments = Object.entries(snapshot.val()?.coments).map((e) => e[1]);

      setPost({
        id: snapshot.key,
        nomeLocal: snapshot.val().nomeLocal,
        tags: snapshot.val().tags,
        descricao: snapshot.val().descricao,
        dataInclusao: snapshot.val().dataInclusao,
        endereco: snapshot.val().endereco,
        usuario: snapshot.val().usuario,
        likes,
        coments,
      });

      setQtdeLikes(likes?.length ?? 0);
      setQtdeComents(coments?.length ?? 0);
      setLiked(JaDeuLike(likes));
    });
  };

  useEffect(() => {
    ObterPost();
    obterImagem();
  }, []);

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

  const novoComentario = () => {
    if (coment) {
      const db = Firebase.database().ref(`posts/${post.id}/coments`);
      db.push({
        user: user.uid,
        userNome: user.nomeCompleto,
        comentario: coment,
        dataInclusao: Date(),
      });
      setQtdeComents(qtdeComents + 1);
      setComent('');
    }
  };

  return (
    <>
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
              <Text style={{ fontSize: 15 }}>
                Autor: {post?.usuario ?? '-'}
              </Text>
              <Text style={{ fontSize: 15 }}>
                {moment(post?.dataInclusao).fromNow()}
              </Text>
            </View>
            <Text style={{ fontSize: 20 }}>{post?.descricao}</Text>
            <View
              style={{ flex: 1, paddingVertical: 10, flexDirection: 'row' }}
            >
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
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 30, paddingHorizontal: 5 }}>
              {qtdeComents} Comentários
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
          <View>
            {post?.coments?.length > 0 &&
              post.coments.map((item, i) => (
                <View
                  key={`comentario${i}`}
                  style={{
                    borderWidth: 1,
                    borderRadius: 20,
                    padding: 20,
                    margin: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ fontWeight: 'bold' }}>{item.userNome}</Text>
                    <Text>{moment(item.dataInclusao).fromNow()}</Text>
                  </View>
                  <Text style={{ fontSize: 20, padding: 5 }}>
                    {item.comentario}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <TextInput
          style={{ width: '75%' }}
          mode="outlined"
          label="Novo Comentário"
          placeholder="Digite seu comentário"
          onChangeText={setComent}
          value={coment}
        />
        <TouchableNativeFeedback onPress={novoComentario}>
          <Entypo
            style={{
              borderRadius: 20,
              borderColor: '#008C8C',
              borderStyle: 'solid',
              borderWidth: 1,
              margin: 10,
              alignItems: 'center',
              textAlign: 'center',
            }}
            size={40}
            color="#008C8C"
            name="arrow-right"
          />
        </TouchableNativeFeedback>
      </View>
    </>
  );
};

export default Post;
