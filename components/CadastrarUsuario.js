import { Button, TextInput, Title, Snackbar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import ImageModal from 'react-native-image-modal';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import firebase from '../config/firebase';

let localizacao = null;

function CadastrarUsuario() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imagem, setImagem] = useState('');
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const mostrarSnack = (message) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };

  const fecharSnack = () => {
    setSnackBarMessage('');
    setShowSnackBar(false);
  };

  const Cadastrar = () => {
    mostrarSnack();
  };

  const SolicitarPermissao = async () => {
    const imagePermissao = await ImagePicker.getMediaLibraryPermissionsAsync();
    const localizacaoPermissao =
      await Location.requestForegroundPermissionsAsync();
  };

  const SelecionarFoto = async () => {
    const imagemResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!imagemResult.cancelled) setImagem(imagemResult.uri);
  };

  const SelecionarLocalizacao = async () => {
    await SolicitarPermissao();
    localizacao = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (result) => {
        setLatitude(result.coords.latitude);
        setLongitude(result.coords.longitude);
        localizacao?.remove();
      }
    );
  };

  useEffect(() => {
    SolicitarPermissao();
  }, []);

  const DadosEhValido = () => {
    const result =
      nomeCompleto !== '' &&
      email !== '' &&
      senha !== '' &&
      latitude !== '' &&
      longitude !== '' &&
      imagem !== '';

    if (result === false) mostrarSnack('Preencha todos os dados!');
    return result;
  };

  const Salvar = async () => {
    if (DadosEhValido() === false) return;
    const db = firebase.database().ref('usuarios');
    const usuarioResponse = await db.push({
      nomeCompleto,
      email,
      senha,
      longitude,
      latitude,
    });

    const imageContent = await fetch(imagem);
    const imagemBlob = await imageContent.blob();

    firebase
      .storage()
      .ref('usuarios')
      .child(usuarioResponse.key)
      .put(imagemBlob);

    mostrarSnack('Salvo com sucesso!');
  };

  return (
    <ScrollView
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
            fontSize: 40,
            lineHeight: 40,
            textAlign: 'center',
          }}
        >
          Cadastrar Usuario
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
          label="Nome Completo"
          placeholder="Digite seu nome completo"
          onChangeText={setNomeCompleto}
        />
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Digite seu email"
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          mode="outlined"
          label="senha"
          placeholder="Digite sua senha"
          onChangeText={setSenha}
        />
        <Button
          icon="map"
          mode="outlined"
          style={{ marginVertical: 10 }}
          onPress={SelecionarLocalizacao}
        >
          Registrar Dados de Localização
        </Button>
        <Text style={{ fontSize: 20, paddingVertical: 10, color: 'blue' }}>
          latitude: {latitude || ''}
        </Text>
        <Text style={{ fontSize: 20, paddingVertical: 10, color: 'blue' }}>
          longitude: {longitude || ''}
        </Text>
        <Button
          icon="image"
          mode="outlined"
          style={{ marginVertical: 10 }}
          onPress={SelecionarFoto}
        >
          Selecionar foto de perfil
        </Button>
        {imagem ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            {/* <TouchableNativeFeedback onPress={setShowImagemModal(true)}>
              <Image
                source={{ uri: imagem }}
                style={{
                  flex: 1,
                  height: Dimensions.get('window').height / 5,
                  width: Dimensions.get('window').height / 5,
                }}
              />
            </TouchableNativeFeedback> */}
            <ImageModal
              resizeMode="contain"
              isTranslucent
              style={{
                width: Dimensions.get('window').height / 5,
                height: Dimensions.get('window').height / 5,
              }}
              source={{
                uri: imagem,
              }}
            />
          </View>
        ) : (
          ''
        )}
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
}

export default CadastrarUsuario;
