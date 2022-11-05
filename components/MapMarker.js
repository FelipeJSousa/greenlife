import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { NovoPostContext } from '../providers/NovoPostContextProvider';

const Unmaker = () => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 70,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Entypo name="location-pin" size={50} color="black" />
  </View>
);

const Marker = () => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 60,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Entypo name="location-pin" size={50} color="#008C8C" />
  </View>
);

const MapMarker = () => {
  const [currentRegion, setCurrentRegion] = useState();
  const [pinned, setPinned] = useState(true);
  const { enderecoMap, setEnderecoMap } = useContext(NovoPostContext);

  let localizacaoAtual;
  const ObterLocalizacaoAtual = async () => {
    await Location.requestForegroundPermissionsAsync();
    localizacaoAtual = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (position) => {
        setCurrentRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        localizacaoAtual.remove();
      }
    );
  };

  useEffect(() => {
    ObterLocalizacaoAtual();
  }, []);

  return (
    <View style={styles.container}>
      {currentRegion ? (
        <>
          <View style={{ height: 'auto', width: '100%' }}>
            <Text style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
              Endereço:
            </Text>
            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                fontWeight: 'bold',
                Height: 10,
              }}
            >
              {pinned
                ? `${enderecoMap.logradouro}, ${enderecoMap.bairro} - ${enderecoMap.cidade} - ${enderecoMap.estado} - ${enderecoMap.pais} - ${enderecoMap.cep}`
                : '\n '}
            </Text>
          </View>
          <MapView
            onTouchMove={() => setPinned(false)}
            onRegionChangeComplete={(region) => {
              const { latitude, longitude, latitudeDelta, longitudeDelta } =
                region;
              Location.reverseGeocodeAsync({
                latitude,
                longitude,
              }).then(({ 0: endereco }) => {
                if (endereco) {
                  setEnderecoMap({
                    logradouro: `${endereco?.street}, ${endereco.streetNumber}`,
                    bairro: endereco.district,
                    cep: endereco.postalCode,
                    cidade: endereco.city ?? endereco.subregion,
                    estado: endereco.region,
                    pais: endereco.country,
                    latitude,
                    latitudeDelta,
                    longitude,
                    longitudeDelta,
                  });

                  setPinned(true);
                }
              });
            }}
            style={{ alignSelf: 'stretch', height: '90%' }}
            region={{
              latitude: enderecoMap?.latitude ?? currentRegion.latitude,
              longitude: enderecoMap?.longitude ?? currentRegion.longitude,
              latitudeDelta: enderecoMap?.latitudeDelta ?? 0.005,
              longitudeDelta: enderecoMap?.longitudeDelta ?? 0.005,
            }}
          />
          {pinned ? Marker() : Unmaker()}
        </>
      ) : (
        <ActivityIndicator animating={!currentRegion} size={40} />
      )}
    </View>
  );
};
export default MapMarker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
