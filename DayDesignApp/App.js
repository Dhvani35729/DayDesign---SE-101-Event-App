import { createStackNavigator } from 'react-navigation';
import { LoginScreen } from './LoginScreen';
import { CreateAccountScreen } from './CreateAccountScreen';

const App = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    CreateAccount: { screen: CreateAccountScreen },
  },
  {
    initialRouteName: 'Login',
  }
);

export default App;
