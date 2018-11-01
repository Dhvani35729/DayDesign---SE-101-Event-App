import React from 'react'
import { View, Text, BackHandler } from 'react-native'

class Projector extends React.Component {

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
      <View style={{flex: 1, backgroundColor: '#333333', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 35, color: 'white'}}>Projector</Text>
      </View>
    );
  }
}

export default Projector
