// export default () => null;

import React from 'react';
import {View, Text, SectionList} from 'react-native'; 
import { useCurrentList } from './../util/ListManager';
export default () => {
  const {favorite} = useCurrentList();
  console.log(favorite.length);
  return (
    <View>
      {favorite.map(item => (
        <Text>{item.name}</Text>
      ))}
    </View>
  );
};
