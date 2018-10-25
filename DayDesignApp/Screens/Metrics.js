import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class Metrics extends React.Component {

  componentDidMount() {
    const { nav } = this.props


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
