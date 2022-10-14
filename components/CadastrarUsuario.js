import { Button, TextInput, Title, Snackbar } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import ImageModal from 'react-native-image-modal';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Firebase from '../config/Firebase';

let localizacao = null;

const CadastrarUsuario = () => {
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

    await Firebase.auth()
      .createUserWithEmailAndPassword(email, senha)
      .then(async (value) => {
        const { uid } = value;

        const db = Firebase.database().ref(`usuarios`);
        await db.child(uid).set({
          nomeCompleto,
          email,
          longitude,
          latitude,
        });

        const imageContent = await fetch(imagem);
        const imagemBlob = await imageContent.blob();

        Firebase.storage().ref(`usuarios`).child(uid).put(imagemBlob);

        mostrarSnack('Salvo com sucesso!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use')
          mostrarSnack('Este email já foi cadastrado!');
        else if (error.code === 'auth/invalid-email')
          mostrarSnack('O email informado é inválido!');
        else if (error.code === 'auth/weak-password')
          mostrarSnack('A senha deve ter ao menos 8 caracteres');
        else mostrarSnack(`Erro ao cadastrar o usuário${error.code}`);
      });
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
};

export default CadastrarUsuario;
