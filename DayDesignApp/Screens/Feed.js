import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native'

class Feed extends React.Component {

  componentDidMount() {
    const { nav } = this.props
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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
        <Text style={styles.title}>Feed</Text>
        <TouchableOpacity
          style={styles.button}>
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
