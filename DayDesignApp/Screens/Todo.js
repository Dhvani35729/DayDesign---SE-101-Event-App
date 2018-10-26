import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

class Todo extends React.Component {

  componentDidMount() {
    const { nav } = this.props


  }

  render() {
    const data = [{title: "Feed the horses", description: "Use the pitchfork to get some hay for the horses"}, 
                  {title: "Feed the cats", description: "Get the cat food from the pantry and fill the bowl beside the door"}];

    return (
      <View style={{flex: 1, backgroundColor: '#64fb71'}}>
        <Text style={styles.title}>Todo</Text>
        <FlatList
          data={data}
          renderItem={ ({item}) => 
            <View
              style={styles.todoListItem}>
              <Text style={styles.todoListItemTitle}>{item.title}</Text>
              <Text style={styles.todoListItemDescription}>{item.description}</Text>
            </View> }
          style={styles.todoList} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 30,
  },
  todoList: {
    marginLeft: 20,
  },
  todoListItem: {
    marginBottom: 5,
  },
  todoListItemTitle: {
    fontSize: 16,
  },
  todoListItemDescription: {
    fontSize: 12,
  },
})

export default Todo
