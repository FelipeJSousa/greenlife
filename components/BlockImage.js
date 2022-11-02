import React from 'react';
import { Image } from 'react-native';

const BlockImage = ({ uri = null, height, width, border, random = true }) => {
  const value = random ? Math.round(Math.random(1) * 1000) : 500;

  return (
    <Image
      source={{
        uri: uri ?? `https://picsum.photos/${value}`,
      }}
      style={{
        height: height ?? 120,
        width: width ?? 120,
        borderRadius: border ?? 20,
      }}
    />
  );
};

export default BlockImage;
