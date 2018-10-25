import React from 'react'
import { View, Text } from 'react-native'

class Automate extends React.Component {

  componentDidMount() {
    const { nav } = this.props


  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fbb464', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 35}}>Automate</Text>
      </View>
    );
  }
}

export default Automate
