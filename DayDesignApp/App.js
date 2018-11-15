import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

// Don't need this file, we keep it for possible future use
class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        // <Navigator />
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
