import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class Calendar extends React.Component {

  componentDidMount() {
    const { nav } = this.props
  }

  render() {
    return (

      <View style={{flex: 1, backgroundColor: '#63bcfc', alignItems: 'center', justifyContent: 'center', borderColor: 'gray', borderWidth: 1}}>
        <Text style={{fontSize: 35}}>Calendar | Home</Text>
        <TouchableOpacity style={{backgroundColor: '#333333', marginTop: 50, padding: 15}}
          onPress={() => this.props.nav.navigate('LoginScreen')}
        >
          <Text style={{color: 'white'}}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Calendar
