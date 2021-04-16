/**
 * @format
 */
import {AppRegistry} from 'react-native';
// Make swipe working
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
// Makes swipe working on android
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
