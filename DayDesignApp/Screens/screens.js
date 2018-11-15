import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Login', () => require('./LoginScreen').default);
  Navigation.registerComponent('CreateAccount', () => require('./CreateAccountScreen').default);
  Navigation.registerComponent('Initializing', () => require('./Loading').default);
  Navigation.registerComponent('Calendar', () => require('./Calendar').default);
  Navigation.registerComponent('Feed', () => require('./Feed').default);
  Navigation.registerComponent('TodoScene', () => require('../scenes/todo/TodoScene').default);
}
