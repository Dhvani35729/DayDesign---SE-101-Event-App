import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Navigator from './Navigator'

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
