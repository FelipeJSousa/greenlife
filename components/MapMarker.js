import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native-paper';
import { NovoPostContext } from '../providers/NovoPostContextProvider';

const MapMarker = () => {
  const [defaultRegion, setDefaultRegion] = useState();
  const [marker, setMarker] = useState();
  const { setEnderecoMap } = useContext(NovoPostContext);

  let localizacaoAtual;
  const ObterLocalizacaoAtual = async () => {
    await Location.requestForegroundPermissionsAsync();
    localizacaoAtual = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (position) => {
        setDefaultRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        localizacaoAtual.remove();
      }
    );
  };
  // , []);

  useEffect(() => {
    ObterLocalizacaoAtual();
  }, []);

  return (
    <View style={styles.container}>
      {defaultRegion ? (
        <MapView
          onPress={async (e) => {
            const coord = {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            };
            const { 0: endereco } = await Location.reverseGeocodeAsync({
              latitude: coord.latitude,
              longitude: coord.longitude,
            });

            setEnderecoMap({
              logradouro: `${endereco.street}, ${endereco.streetNumber}`,
              bairro: endereco.district,
              cep: endereco.postalCode,
              cidade: endereco.city ?? endereco.subregion,
              estado: endereco.region,
              pais: endereco.country,
            });
            setMarker(coord);
          }}
          style={{ alignSelf: 'stretch', height: '100%' }}
          region={marker ?? defaultRegion}
        >
          {marker && (
            <Marker coordinate={marker} title="Endreço selecionado!" />
          )}
        </MapView>
      ) : (
        <ActivityIndicator animating={!defaultRegion} size={40} />
      )}
    </View>
  );
};
export default MapMarker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
