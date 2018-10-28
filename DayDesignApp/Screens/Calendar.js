import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'

class Calendar extends React.Component {
    state = { currentUser: null }

  componentDidMount() {
    const { nav } = this.props
      const { currentUser } = firebase.auth()

    this.setState({ currentUser })
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
