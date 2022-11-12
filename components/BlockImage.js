import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const BlockImage = ({ uri = null, height, width, border, random = false }) => {
  const styles = StyleSheet.create({
    block: {
      height: height ?? 120,
      width: width ?? 120,
      borderRadius: border ?? 20,
    },
    none: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#91a897',
    },
  });

  const value = random ? Math.round(Math.random(1) * 1000) : 500;

  if (uri != null || random === true)
    return (
      <Image
        source={{
          uri: random === false ? uri : `https://picsum.photos/${value}`,
        }}
        style={styles.block}
      />
    );
  return (
    <View style={[styles.block, styles.none]}>
      <Entypo name="image" size={40} color="#4d483d" />
    </View>
  );
};

export default BlockImage;
