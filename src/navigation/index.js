import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CurrentList from '../screens/CurrentList';
import ItemDetails from '../screens/ItemDetails';

// const CurrentListStack = createStackNavigator({
//   CurrentList: {
//     screen: CurrentList,
//   },
// });

const Stack = createStackNavigator();

const CurrentListStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CurrentList" component={CurrentList} />
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetails}
          options={({route}) => {
            return {
              headerTitle: () => {
                return <Text>{route.params.item.name}</Text>;
              },
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default CurrentListStack;
// export default createAppContainer(CurrentListStack);
