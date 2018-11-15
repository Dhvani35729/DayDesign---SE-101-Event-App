import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native'
import firebase from 'react-native-firebase';

class Feed extends React.Component {

  state = { currentUser: null };

  constructor(props) {
    super(props);
    this.addAssignments = this.addAssignments.bind(this);
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

    firebase.database().ref("University of Waterloo Courses/Software Engineering/MATH115/assignments").once("value").then(function(snapshot) {
      let assignments = Object.keys(snapshot.val());

      for (let i = 0; i < assignments.length; i++) {
        firebase.database().ref(currentUser.uid + "/todo").set({
          name: assignments[i],
        });
      }
      
      /*firebase.database().ref(currentUser.uid + "/todo").once("value").then(function(snapshot) {
        let todos = Object.keys(snapshot.val());
      });*/
    });
  }

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

  addAssignments() {

  }
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Feed</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => (  firebase.auth().signOut().then(function() {
              // Sign-out successful.
            }, function(error) {
              // An error happened.
            }))}>
          <Text
            style={styles.buttonText}>Institution</Text>
          <Image //Sort of works but not as we'd like it to
            style={{alignSelf: "stretch", flex: 1}}
            source={{uri: "https://www.exerciseismedicine.org//admin/ckeditor/plugins/imageuploader/uploads/425e058c.jpg"}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}>
          <Text
            style={styles.buttonText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}>
          <Text
           style={styles.buttonText}>Social</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 35,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 5
  },
  buttonText: {
    backgroundColor: "transparent",
    fontSize: 16
  }
});

export default Feed
