import { Card, Button, TextInput, Title, Snackbar } from 'react-native-paper';
import React, { useState } from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

function Login({ navigation }) {
  const [visivel, setVisivel] = useState(false);
  const [email, setEmail] = useState('a');
  const [senha, setSenha] = useState('a');

  const mostrarSnack = () => {
    setVisivel(true);
  };

  const fecharSnack = () => {
    setVisivel(false);
  };

  const acessar = () => {
    if (email && senha) {
      navigation.navigate('MenuLateral');
    } else {
      mostrarSnack();
    }
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
        visible={visivel}
        onDismiss={fecharSnack}
        action={{ label: 'Fechar' }}
      >
        Nome de usuário e/ou senha incorretos!
      </Snackbar>
    </View>
  );
}

export default Login;
