import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Button, Snackbar, TextInput, Title } from 'react-native-paper';
import ImageModal from 'react-native-image-modal';
import Firebase from '../config/Firebase';
import { NovoPostContext } from '../providers/NovoPostContextProvider';

const NovoPost = () => {
  const navigation = useNavigation();
  const [nomeCompleto, setNomeLocal] = useState('');
  const [email, setDescricao] = useState('');
  const [senha, setSenha] = useState('');
  const [imagens, setImagens] = useState([]);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const { enderecoMap } = useContext(NovoPostContext);

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
      nomeCompleto !== '' && email !== '' && senha !== '' && imagens !== '';

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
        });

        const imageContent = await fetch(imagens);
        const imagemBlob = await imageContent.blob();

        Firebase.storage().ref('usuarios').child(uid).put(imagemBlob);

        navigation.navigate('Login');
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

  const SelecionarEndereco = () => {
    navigation.navigate('MapMarker');
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
          Selecionar foto de perfil
        </Button>
        {imagens ? (
          <ScrollView horizontal>
            {imagens?.length > 0 &&
              imagens?.map((ele) => {
                console.log(ele);
                return (
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
                );
              })}
          </ScrollView>
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

export default NovoPost;
