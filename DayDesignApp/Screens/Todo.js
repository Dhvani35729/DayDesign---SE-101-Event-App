import React from 'react'
import { View, Text } from 'react-native'

class Todo extends React.Component {

  componentDidMount() {
    const { nav } = this.props


  }

  render() {
    const data = ["Feed the horses", "Feed the cats", "Paint the house", "Build a fence", "Advance humankind"];
    return (
      <View style={{flex: 1, backgroundColor: '#64fb71'}}>
        <Text style={styles.title}>Todo</Text>
        <FlatList
          data={data}
          renderItem={ ({item}) => <Text>{item}</Text>}
          style={styles.todoList} />
      </View>
    );
  }
}

export default Todo
