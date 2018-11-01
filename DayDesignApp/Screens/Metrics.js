import React from 'react'
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'

class Metrics extends React.Component {

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
      <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 35}}>Metrics</Text>
        <TouchableOpacity style={{backgroundColor: '#333333', marginTop: 50, padding: 15}}
          onPress={() => this.props.nav.navigate('Profile')}
        >
          <Text style={{color: 'white'}}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Metrics
