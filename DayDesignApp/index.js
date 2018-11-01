/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
    SwipeList
} from './src/components';
export { default as constants } from './src/constants';
export { SwipeRow } from './src/components';
export { HorizontalGestureResponder } from './src/components';
export default SwipeList;

AppRegistry.registerComponent(appName, () => App);
