import React from 'react';
import { Image } from 'react-native';

function BlockImage({ uri = null, height, width, border }) {
  const value = Math.round(Math.random(1) * 1000);

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
}

export default BlockImage;
