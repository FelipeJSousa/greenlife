import React from 'react';
import { View } from 'react-native';
import Badge from './Badge';

const Tags = ({ tags }) => {
  if (tags)
    return (
      <View
        onStartShouldSetResponder={() => true}
        style={{ flexDirection: 'row' }}
      >
        {tags?.length > 0 &&
          tags.map((tag, i) => <Badge key={`tag${i}`}>{tag}</Badge>)}
      </View>
    );
  return <></>;
};

export default Tags;
