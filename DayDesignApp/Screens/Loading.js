import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, BackHandler} from 'react-native'
import firebase from 'react-native-firebase'

class Loading extends React.Component {
  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    firebase.auth().onAuthStateChanged(user => {
      this.props.nav.navigate(user ? 'Calendar' : 'LoginScreen')
    })
  }

  componentWillUnmount() {
       BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }

   handleBackButton() {
      //  ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return false;
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Loading
