import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Snackbar, TextInput, Title } from 'react-native-paper';
import ImageModal from 'react-native-image-modal';
import { Entypo } from '@expo/vector-icons';
import Firebase from '../config/Firebase';
import { NovoPostContext } from '../providers/NovoPostContextProvider';
import { AuthContext } from '../providers/AuthContextProvider';
import Tags from './Tags';

const NovoPost = () => {
  const navigation = useNavigation();
  const [nomeLocal, setNomeLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagens, setImagens] = useState([]);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const { enderecoMap, setEnderecoMap } = useContext(NovoPostContext);
  const { user } = useContext(AuthContext);
  const [showModalTag, setShowModalTag] = useState(false);
  const [tags, setTags] = useState([]);
  const [novaTag, setNovaTag] = useState([]);

  const mostrarSnack = (message) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const fecharSnack = () => {
    setSnackBarMessage('');
    setShowSnackBar(false);
  };

  const SolicitarPermissao = async () => {
    await ImagePicker.getMediaLibraryPermissionsAsync();
  };

  const SelecionarNovaFoto = async () => {
    const imagemResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!imagemResult.cancelled)
      setImagens((current) => [...current, imagemResult.uri]);
  };

  useEffect(() => {
    SolicitarPermissao();
  }, []);

  const DadosEhValido = () => {
    const result =
      nomeLocal !== '' &&
      descricao !== '' &&
      imagens?.length > 0 &&
      !!enderecoMap;

    if (result === false) mostrarSnack('Preencha todos os dados!');
    return result;
  };

  const Salvar = async () => {
    if (DadosEhValido() === false) return;
    const content = {
      nomeLocal,
      descricao,
      endereco: enderecoMap,
      dataInclusao: Date(),
      tags,
      usuario: user.nomeCompleto,
      likes: [],
    };

    const db = Firebase.database().ref('posts');
    const postResponse = await db.push(content);

    const imageContent = await fetch(imagens);
    const imagemBlob = await imageContent.blob();

    Firebase.storage().ref('posts').child(postResponse.key).put(imagemBlob);

    navigation.goBack();
  };

  const dispose = useCallback(() => {
    navigation.removeListener('beforeRemove');
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      setEnderecoMap(null);
      navigation.dispatch(e.data.action);
    });
  }, []);

  useEffect(() => dispose(), []);

  const SelecionarEndereco = () => {
    navigation.navigate('MapMarker');
  };

  const addNovaTag = (tag) => {
    setTags((e) => [...e, tag]);
    setNovaTag('');
  };

  const renderAddressProp = (key) =>
    !['latitude', 'longitude', 'latitudeDelta', 'longitudeDelta'].includes(key);

  return (
    <>
      <ScrollView style={{ paddingVertical: 30, paddingHorizontal: 10 }}>
        <View>
          <Title
            style={{
              padding: 20,
              fontSize: 25,
              lineHeight: 25,
              textAlign: 'center',
            }}
          >
            Preencha as informa????es:
          </Title>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'space-evenly',
            flexDirection: 'column',
          }}
        >
          <TextInput
            mode="outlined"
            label="Nome do local"
            placeholder="Digite o nome do local"
            onChangeText={setNomeLocal}
          />
          <TextInput
            mode="outlined"
            label="Descri????o"
            placeholder="Digite a descri????o do local"
            onChangeText={setDescricao}
            keyboardType="email-address"
          />
          <Button
            icon="map"
            mode="outlined"
            style={{ marginVertical: 10 }}
            onPress={SelecionarEndereco}
          >
            Inserir Endere??o
          </Button>
          {enderecoMap && (
            <View>
              {enderecoMap &&
                Object.entries(enderecoMap).map(([key, value]) => {
                  if (renderAddressProp(key))
                    return (
                      <Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                          {key}:
                        </Text>{' '}
                        {value}
                      </Text>
                    );

                  return <></>;
                })}
            </View>
          )}
          <Button
            icon="image"
            mode="outlined"
            style={{ marginVertical: 10 }}
            onPress={SelecionarNovaFoto}
          >
            Selecionar Foto do local
          </Button>
          {imagens ? (
            <ScrollView horizontal>
              {imagens?.length > 0 &&
                imagens?.map((ele) => (
                  <ImageModal
                    resizeMode="contain"
                    style={{
                      width: Dimensions.get('window').height / 5,
                      height: Dimensions.get('window').height / 5,
                    }}
                    source={{
                      uri: ele,
                    }}
                  />
                ))}
            </ScrollView>
          ) : (
            ''
          )}
          <Button
            icon="tag"
            mode="outlined"
            style={{ marginVertical: 10 }}
            onPress={() => setShowModalTag(true)}
          >
            Adicionar Tags
          </Button>

          <ScrollView horizontal style={{ height: 50 }}>
            {tags?.length > 0 ? (
              <Tags tags={tags} />
            ) : (
              <Text>N??o h?? tags.</Text>
            )}
          </ScrollView>
          <Button
            icon="check"
            mode="contained"
            onPress={Salvar}
            style={{ marginVertical: 10 }}
          >
            Salvar Dados
          </Button>
        </View>
        <Snackbar
          visible={showSnackBar}
          onDismiss={fecharSnack}
          action={{ label: 'Fechar' }}
        >
          {snackBarMessage}
        </Snackbar>
      </ScrollView>
      <Modal
        visible={showModalTag}
        animationType="fade"
        transparent
        onRequestClose={() => {
          setShowModalTag(!showModalTag);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowModalTag(!showModalTag)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <ScrollView horizontal style={{ height: 50, marginHorizontal: 20 }}>
              {tags?.length > 0 ? (
                <Tags tags={tags} />
              ) : (
                <Text>N??o h?? tags.</Text>
              )}
            </ScrollView>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: '40%',
              }}
            >
              <TextInput
                mode="outlined"
                label="Adicionar nova tag"
                placeholder="Digite o nome da tag"
                onChangeText={setNovaTag}
                value={novaTag}
                onSubmitEditing={() => addNovaTag(novaTag)}
                style={{
                  width: 250,
                  height: '100%',
                  position: 'relative',
                }}
              />
              <Pressable
                onPress={() =>
                  novaTag.length > 0 ? addNovaTag(novaTag) : console.log()
                }
                style={{
                  marginTop: '2.3%',
                  marginLeft: -10,
                  width: '20%',
                  height: '94.5%',
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                  backgroundColor: '#2196F3',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Entypo name="plus" color="white" size={40} />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  modalView: {
    minHeight: 200,
    height: '20%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 100,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default NovoPost;
