import React from 'react'
import { View, Text, TouchableOpacity,  BackHandler } from 'react-native'
import firebase from 'react-native-firebase'

class Calendar extends React.Component {
    state = { currentUser: null }

  componentDidMount() {
    const { nav } = this.props
    const { currentUser } = firebase.auth()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.setState({ currentUser })
  }

  componentWillUnmount() {
       BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }

   handleBackButton() {
      //  ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return false;
    }

  logout(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  }

  render() {

    const { currentUser } = this.state

    return (

      <View style={{flex: 1, backgroundColor: '#63bcfc', alignItems: 'center', justifyContent: 'center', borderColor: 'gray', borderWidth: 1}}>
        <Text style={{fontSize: 35}}>Hi {currentUser && currentUser.email}!</Text>
        <TouchableOpacity style={{backgroundColor: '#333333', marginTop: 50, padding: 15}}
          onPress={this.logout}
        >
          <Text style={{color: 'white'}}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Calendar
