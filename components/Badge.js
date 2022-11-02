import React from 'react';
import { Text, View } from 'react-native';

const Badge = ({ children, size }) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        backgroundColor: '#008C8C',
        fontSize: size ?? 10,
        padding: 8,
        fontWeight: 'bold',
        marginRight: 5,
        borderRadius: 20,
        color: 'white',
      }}
    >
      {children}
    </Text>
  </View>
);

export default Badge;
