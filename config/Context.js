import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, createContext } from 'react';
import Firebase from './Firebase';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const navigation = useNavigation();

  const Logout = () => {
    setUser(null);
    setNomeUsuario(null);
    Firebase.auth().signOut();
    navigation?.navigate('Login');
  };

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((usuarioLogado) => {
      setUser(usuarioLogado);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, nomeUsuario, setNomeUsuario, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
