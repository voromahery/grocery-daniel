import React from 'react';
import {Text, Image, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import CurrentList from '../screens/CurrentList';
import ItemDetails from '../screens/ItemDetails';
import FavoritesList from '../screens/FavoritesList';

// const CurrentListStack = createStackNavigator({
//   CurrentList: {
//     screen: CurrentList,
//   },
// });

const Stack = createStackNavigator();

export const CurrentListStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Shopping List" component={CurrentList} />
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

const Tab = createBottomTabNavigator();

const FavoritesListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritesList" component={FavoritesList} />
    </Stack.Navigator>
  );
};
const Tabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, focused}) => {
            let image;
            if (route.name === 'Shopping List') {
              image = Platform.select({
                ios: require('../assets/icons/ios-list.png'),
                android: require('../assets/icons/md-list.png'),
              });
            } else if (route.name === 'FavoriteList') {
              image = Platform.select({
                ios: focused
                  ? require('../assets/icons/ios-star.png')
                  : require('../assets/icons/ios-star-outline.png'),
                android: focused
                  ? require('../assets/icons/md-star.png')
                  : require('../assets/icons/md-star-outline.png'),
              });
            }
            return (
              <Image
                source={image}
                resizeMode="contain"
                style={{width: 25, tintColor: color}}
              />
            );
          },
        })}>
        <Tab.Screen name="Shopping List" component={CurrentList} />
        <Tab.Screen name="FavoriteList" component={FavoritesListStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
// export default createAppContainer(CurrentListStack);
