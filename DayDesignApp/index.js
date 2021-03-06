/** @format */
//
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
//
//
// AppRegistry.registerComponent(appName, () => App);


import { Navigation } from "react-native-navigation";

import {
    SwipeList
} from './src/components';
export { default as constants } from './src/constants';
export { SwipeRow } from './src/components';
export { HorizontalGestureResponder } from './src/components';

import {registerScreens} from './Screens/screens';

// Navigation setup
registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {
   Navigation.setDefaultOptions({
     bottomTab: {
       iconColor: '#1B4C77',
       selectedIconColor: '#EF8354',
       textColor: '#1B4C77',
       selectedTextColor: '#EF8354',
       fontFamily: 'HelveticaNeue-Italic',
       fontSize: 13
     },
     _animations: {
       push: {
         waitForRender: false,
       }
     },
     animations: {
       setRoot: {
         alpha: {
           from: 0,
           to: 1,
           duration: 300
         }
       },
       _push: {
         topBar: {
           id: 'TEST',
           alpha: {
             from: 0,
             to: 1,
             duration: 500,
             interpolation: 'accelerate'
           }
         },
         bottomTabs: {
           y: {
             from: 1000,
             to: 0,
             duration: 500,
             interpolation: 'decelerate',
           },
           alpha: {
             from: 0,
             to: 1,
             duration: 500,
             interpolation: 'decelerate'
           }
         },
         content: {
           y: {
             from: 1000,
             to: 0,
             duration: 500,
             interpolation: 'accelerate',
           },
           alpha: {
             from: 0,
             to: 1,
             duration: 500,
             interpolation: 'accelerate'
           }
         }
       },
       _pop: {
         topBar: {
           id: 'TEST',
           alpha: {
             from: 1,
             to: 0,
             duration: 500,
             interpolation: 'accelerate'
           }
         },
         bottomTabs: {
           y: {
             from: 0,
             to: 100,
             duration: 500,
             interpolation: 'accelerate',
           },
           alpha: {
             from: 1,
             to: 0,
             duration: 500,
             interpolation: 'accelerate'
           }
         },
         bottomTabs: {
           y: {
             from: 0,
             to: 100,
             duration: 500,
             interpolation: 'decelerate',
           },
           alpha: {
             from: 1,
             to: 0,
             duration: 500,
             interpolation: 'decelerate'
           }
         },
         content: {
           y: {
             from: 0,
             to: 1000,
             duration: 500,
             interpolation: 'decelerate',
           },
           alpha: {
             from: 1,
             to: 0,
             duration: 500,
             interpolation: 'decelerate'
           }
         }
       }
     }
   });

  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    },
  });
});

export default SwipeList;
