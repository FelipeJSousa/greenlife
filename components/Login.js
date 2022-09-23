import { Card, Button, TextInput, Title, Snackbar } from 'react-native-paper';
import React, { useState } from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

function Login({ navigation }) {
  const [visivel, setVisivel] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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

  return (
    <View style={{ flex: 1, paddingTop: getStatusBarHeight() }}>
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
        />
        <TextInput
          mode="outlined"
          label="senha"
          placeholder="Digite sua senha"
          onChangeText={setSenha}
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
          onPress={acessar}
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
