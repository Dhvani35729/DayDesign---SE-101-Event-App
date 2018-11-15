import React from 'react'
import { View, Text, BackHandler } from 'react-native'

class Profile extends React.Component {

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

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fb6469', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 35}}>Profile</Text>
      </View>
    );
  }
}

export default Profile
