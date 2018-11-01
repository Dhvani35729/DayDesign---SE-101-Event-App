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
import Loading from './Screens/Loading'
import { TodoScene } from './scenes';

const Navigator = SwipeNavigator({

  Loading: {
    screen: Loading,
    type: 'over',
  },

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
    bottom: 'TodoScene',
  },

  Feed: {
    screen: Feed,
    type: 'push',
  },

  Metrics: {
    screen: Metrics,
    type: 'push',
  },

  Projector: {
    screen: Projector,
    type: 'place',
  },

  TodoScene: {
    screen: TodoScene,
    type: 'over',
  },

  Automate: {
    screen: Automate,
    type: 'place',
    color: '#fbb464',
  },

  Profile: {
    screen: Profile,
    left: '@BACK',
    type: 'over',
  },

})

export default Navigator
