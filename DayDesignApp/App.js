import { createStackNavigator } from 'react-navigation';
import { LoginScreen } from './Screens/LoginScreen';
import { CreateAccountScreen } from './Screens/CreateAccountScreen';

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
