import { Button, TextInput, Title, Snackbar } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Firebase from '../config/Firebase';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('felipe@mail.com');
  const [senha, setSenha] = useState('12345678');
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const mostrarSnack = (message) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  };
  const ocultarSnack = () => setShowSnackBar(false);

  const DadosEhValido = () => {
    const result = email !== '' && senha !== '';

    if (result === false)
      mostrarSnack('Nome de usuário e/ou senha incorretos!');

    return result;
  };

  const RealizarLogin = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        navigation.navigate('MenuLateral');
      })
      .catch((e) => {
        console.log(e);
        mostrarSnack('Usuario ou senha inválidos!');
      });
  };

  const acessar = () => {
    if (DadosEhValido() === false) return;
    RealizarLogin();
  };

  const CadastrarUsuario = () => {
    navigation.navigate('CadastrarUsuario');
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: getStatusBarHeight(),
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Title
          style={{
            fontSize: 50,
            lineHeight: 50,
            textAlign: 'center',
          }}
        >
          Green Life
        </Title>
      </View>
      <View style={{ flex: 2, justifyContent: 'space-evenly' }}>
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Digite seu emmail"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          mode="outlined"
          label="senha"
          placeholder="Digite sua senha"
          onChangeText={setSenha}
          value={senha}
        />
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'space-evenly',
          flexDirection: 'column',
        }}
      >
        <Button
          icon="arrow-right"
          mode="contained"
          onPress={acessar}
          contentStyle={{ flexDirection: 'row-reverse' }}
        >
          Acessar
        </Button>
        <Button
          icon="arrow-right"
          mode="contained"
          onPress={CadastrarUsuario}
          contentStyle={{ flexDirection: 'row-reverse' }}
          color="green"
        >
          Cadastrar
        </Button>
      </View>
      <Snackbar
        visible={showSnackBar}
        onDismiss={ocultarSnack}
        action={{ label: 'Fechar' }}
      >
        {snackBarMessage}
      </Snackbar>
    </View>
  );
};

export default Login;
