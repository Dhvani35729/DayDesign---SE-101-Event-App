import React from 'react'
import { View, Text } from 'react-native'

class Todo extends React.Component {

  componentDidMount() {
    const { nav } = this.props


  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#64fb71', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 35}}>Todo</Text>
      </View>
    );
  }
}

export default Todo
