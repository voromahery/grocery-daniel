import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CurrentList from '../screens/CurrentList';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default CurrentListStack;
// export default createAppContainer(CurrentListStack);
