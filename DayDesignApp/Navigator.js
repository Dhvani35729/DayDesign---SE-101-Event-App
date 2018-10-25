import SwipeNavigator from 'react-native-swipe-navigation'
import LoginScreen from './Screens/LoginScreen'
import CreateAccountScreen from './Screens/CreateAccountScreen'
import Calendar from './Screens/Calendar'
import Feed from './Screens/Feed'
import Metrics from './Screens/Metrics'
import Projector from './Screens/Projector'
import Todo from './Screens/Todo'
import Automate from './Screens/Automate'
import Profile from './Screens/Profile'

const Navigator = SwipeNavigator({

  LoginScreen: {
    screen: LoginScreen,
    type: 'over',
  },

  CreateAccountScreen: {
    screen: CreateAccountScreen,
    type: 'over',
  },

  Calendar: {
    screen: Calendar,
    left: 'Feed',
    right: 'Metrics',
    top: 'Projector',
    bottom: 'Todo',
  },

  Feed: {
    screen: Feed,
    type: 'push',
  },

  Metrics: {
    screen: Metrics,
    type: 'over',
  },

  Projector: {
    screen: Projector,
    type: 'place',
  },

  Todo: {
    screen: Todo,
    right: 'Automate',
  },

  Automate: {
    screen: Automate,
    type: 'over',
    color: '#fbb464',
  },

  Profile: {
    screen: Profile,
    left: '@BACK',
    type: 'over',
  },

})

export default Navigator
