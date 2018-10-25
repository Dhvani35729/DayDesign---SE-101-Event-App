import SwipeNavigator from 'react-native-swipe-navigation'
import LoginScreen from './Screens/LoginScreen'
import CreateAccountScreen from './Screens/CreateAccountScreen'

const Navigator = SwipeNavigator({

  LoginScreen: {
    screen: LoginScreen,
    type: 'over',
  },
  CreateAccountScreen: {
    screen: CreateAccountScreen,
    type: 'over',
  },

})

export default Navigator
