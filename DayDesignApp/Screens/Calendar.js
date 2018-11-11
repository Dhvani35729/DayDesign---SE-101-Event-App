import React from 'react'
import { View, Text, TouchableOpacity,  BackHandler } from 'react-native'
import firebase from 'react-native-firebase'

myList = []

class Calendar extends React.Component {
    state = { currentUser: null }

  componentDidMount() {
    const { nav } = this.props
    const { currentUser } = firebase.auth()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    firebase.database().ref(currentUser.uid + '/len_list').once('value').then(function(snapshot) {

     myList.length = snapshot.val();

    var userListFire = firebase.database().ref(currentUser.uid + '/todo');
    userListFire.on('value', function(snapshot) {

         var keys = Object.keys(snapshot.val());
         var counter = 0;

         for(var i = 0; i < keys.length; i++){

           if(snapshot.val()[keys[i]] != null){

             myList[counter] = {
                 id: counter+1,
                 title: String(snapshot.val()[keys[i]].name),
                 complete: false,
                 archived: false,
                 progress: Math.random()
             };

             counter++;
           }

         }

     });

 });

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
