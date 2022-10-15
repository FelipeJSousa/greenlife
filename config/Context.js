import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, createContext } from 'react';
import Firebase from './Firebase';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const [run, setRun] = useState(true);

  const Logout = (navigate = true) => {
    Firebase.auth().signOut();
    setUser(null);
    setRun(true);
    if (navigate) navigation?.navigate('Login');
  };

  const GetProfileImage = async (uid) => {
    const storage = Firebase.storage().ref(`/usuarios/${uid}`);
    let profileImage = null;
    await storage.getDownloadURL().then((url) => {
      profileImage = url;
    });
    return Promise.resolve(profileImage);
  };

  const GetUserInfo = async (uid) => {
    let userInfo = { nomeCompleto: '', email: '', profileImage: '' };
    const profileImage = await GetProfileImage(uid);
    Firebase.database()
      .ref(`usuarios/${uid}`)
      .on('value', (snapshot) => {
        userInfo = {
          nomeCompleto: snapshot.val().nomeCompleto,
          email: snapshot.val().email,
          profileImage,
        };
      });
    return Promise.resolve(userInfo);
  };

  useEffect(() => {
    Firebase.auth().onIdTokenChanged(async (usuarioLogado) => {
      if (!run) {
        return;
      }
      if (usuarioLogado === null || usuarioLogado.uid === null) {
        return;
      }
      setRun(false);
      usuarioLogado.getIdToken();

      const { uid } = usuarioLogado;

      const userInfo = await GetUserInfo(uid);
      setUser({ uid, ...userInfo });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
