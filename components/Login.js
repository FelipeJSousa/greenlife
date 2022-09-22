import { Card, Button, TextInput, Title, Snackbar } from 'react-native-paper';
import React, { useState } from 'react';

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
    <>
      <Card>
        <Card.Content>
          <Title>Acessar o Aplicativo</Title>
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
          <Button icon="arrow-right" mode="contained" onPress={acessar}>
            Acessar
          </Button>
        </Card.Content>
      </Card>
      <Snackbar
        visible={visivel}
        onDismiss={fecharSnack}
        action={{ label: 'Fechar' }}
      >
        Nome de usuário e/ou senha incorretos!
      </Snackbar>
    </>
  );
}

export default Login;
