import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  View,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Button, Snackbar, TextInput, Title } from 'react-native-paper';
import ImageModal from 'react-native-image-modal';
import Firebase from '../config/Firebase';
import { NovoPostContext } from '../providers/NovoPostContextProvider';
import Badge from './Badge';

const NovoPost = () => {
  const navigation = useNavigation();
  const [nomeLocal, setNomeLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagens, setImagens] = useState([]);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const { enderecoMap, setEnderecoMap } = useContext(NovoPostContext);
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
      nomeLocal !== '' && descricao !== '' && imagens !== '' && !!enderecoMap;

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
  return (
    <ScrollView
      nestedScrollEnabled
      style={{ paddingTop: getStatusBarHeight(), paddingHorizontal: 10 }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingVertical: 50,
        }}
      >
        <Title
          style={{
            fontSize: 25,
            lineHeight: 25,
            textAlign: 'center',
          }}
        >
          Preencha as informações:
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
          label="Descrição"
          placeholder="Digite a descrição do local"
          onChangeText={setDescricao}
          keyboardType="email-address"
        />
        <Button
          icon="map"
          mode="outlined"
          style={{ marginVertical: 10 }}
          onPress={SelecionarEndereco}
        >
          Inserir Endereço
        </Button>
        {enderecoMap && (
          <View>
            {enderecoMap &&
              Object.entries(enderecoMap).map(([key, value]) => (
                <Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    {key}:
                  </Text>{' '}
                  {value}
                </Text>
              ))}
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
        <Modal
          visible={showModalTag}
          animationType="fade"
          transparent
          onRequestClose={() => {
            setShowModalTag(!showModalTag);
          }}
        >
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowModalTag(!showModalTag)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <ScrollView horizontal style={{ height: 50, marginHorizontal: 20 }}>
              {tags?.length > 0 ? (
                tags.map((tag, i) => (
                  <Badge key={`novatag${i}`} size={13}>
                    {tag}
                  </Badge>
                ))
              ) : (
                <Text>Não há tags.</Text>
              )}
            </ScrollView>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextInput
                mode="outlined"
                label="Adicionar nova tag"
                placeholder="Digite o nome da tag"
                onChangeText={setNovaTag}
                value={novaTag}
                onSubmitEditing={() => addNovaTag(novaTag)}
                style={{ width: 250, height: 60 }}
              />
              <Pressable
                onPress={() =>
                  novaTag.length > 0 ? addNovaTag(novaTag) : console.log()
                }
              >
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 40,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 60,
                    marginTop: 8,
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    backgroundColor: '#2196F3',
                  }}
                >
                  +
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <ScrollView horizontal style={{ height: 50 }}>
          {tags?.length > 0 ? (
            tags.map((tag, i) => (
              <Badge key={`tag${i}`} size={15}>
                {tag}
              </Badge>
            ))
          ) : (
            <Text>Não há tags.</Text>
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
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    display: 'flex',
    height: 'auto',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 100,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default NovoPost;
