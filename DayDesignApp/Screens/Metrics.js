import React from 'react'
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'

class Metrics extends React.Component {

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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
    return (
      <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 35}}>Metrics</Text>
        <TouchableOpacity style={{backgroundColor: '#333333', marginTop: 50, padding: 15}}
          onPress={() => this.logout}
        >
          <Text style={{color: 'white'}}>LOGOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '#333333', marginTop: 70, padding: 15}}
          onPress={() => console.log("profile")}
        >
          <Text style={{color: 'white'}}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Metrics
