import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapMarker = () => {
  const imageURL = '';
  const [defaultRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState();

  const localizacaoAtual = useCallback(async () => {
    await Location.requestForegroundPermissionsAsync();
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (result) => {
        console.log(result.coords);

        // setmapRegion(result.coords);
        // localizacao?.remove();
      }
    );
  }, []);

  useEffect(() => {
    // localizacaoAtual();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        onPress={(e) =>
          setMarker({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={defaultRegion}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>
    </View>
  );
};
export default MapMarker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
