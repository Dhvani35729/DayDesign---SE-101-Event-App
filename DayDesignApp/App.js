import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View>
        <Text>Hello world!</Text>
      </View>
    );
  }
}

// import React from 'react';
// import { View, Text } from 'react-native';
// import { createStackNavigator, createAppContainer } from 'react-navigation';
//
// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1}}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
// }
//
// class DetailsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1}}>
//         <Text>Details Screen</Text>
//       </View>
//     );
//   }
// }
//
// const RootStack = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Details: DetailsScreen,
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );
//
// const AppContainer = createAppContainer(RootStack);
//
// export default class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
