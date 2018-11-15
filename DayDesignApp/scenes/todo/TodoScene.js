import React from 'react';
import createReactClass from 'create-react-class';
import { View, Text, StyleSheet, TouchableHighlight, BackHandler, TextInput} from 'react-native';
import times from 'lodash/times';

import { Todo, TodoCollection } from '../../models';
import { TodoSwipeList, TodoDetails } from './components'
import { ListItem, ListItemButton } from '../../components';

import firebase from 'react-native-firebase';

import { Navigation } from 'react-native-navigation'

/*
  Author: Andrew Grewell <andrew.grewell@provatahealth.com>
  Link: https://github.com/ProvataHealth/react-native-smooth-swipe-list
*/

// With edits by Dhvani Patel

states = { currentUser: null };
totalHere = 0;

const TodoScene = createReactClass({

    getInitialState() {
        // using this component's state as a store for simplicity sake
        totalHere = this.props.count;
        // console.log(this.props.count);
        console.log("here");
        console.log(totalHere);
        if(this.props.todoList){
          return {
              text: '',
              activeTodo: null,
              todoCount: this.props.todoList.length,
              todos: new TodoCollection(this.props.todoList)
          };
        }
        return {
            text: '',
            activeTodo: null,
            todoCount: 0,
            todos: new TodoCollection(this.props.todoList)
        };

    },

    archiveTodo(todo) {
        let updatedTodo = todo.setArchived(true);
        this.setState({
            todos: this.state.todos.putById(updatedTodo.getId(), updatedTodo)
        });
    },

    toggleTodoComplete(todo) {
      //  let updatedTodo = todo.setComplete(!todo.isComplete());
        let updatedTodo = todo.setArchived(true);
        console.log(this.state);
        this.setState({
            todos: this.state.todos.putById(updatedTodo.getId(), updatedTodo)
        });
        firebase.database().ref(states.uid + '/len_list').once('value').then(function(snapshot) {

          firebase.database().ref(states.uid + '/len_list').set(snapshot.val()-1);
          console.log(todo.getId());
          firebase.database().ref(states.uid + '/todo' + '/' + todo.getId()).remove();
            });
    },

    addTodo(t_name) {
      // console.log(totalHere);
      let count = this.props.count+1;
      let task_name = t_name;
      // console.log("Count + " + count);
       this.setState({
           todoCount: this.state.todoCount+1,
           todos: this.state.todos.unshift({
               id: count,
               title: task_name,
               complete: false,
               archived: false,
              progress: Math.random()
           })
       });

         firebase.database().ref(states.uid + '/len_list').once('value').then(function(snapshot) {

           firebase.database().ref(states.uid + '/len_list').set(snapshot.val()+1);
           //console.log(this.state.todoCount-1);
            firebase.database().ref(states.uid + '/total_todos').once('value').then(function(snapshot) {


           firebase.database().ref(states.uid + '/todo' + '/' + (snapshot.val()+1)).set({
             name: task_name
           });
              firebase.database().ref(states.uid + '/total_todos').set(snapshot.val()+1);
              this.props.count++;
              });

          });

        this.tryCloseSwipeRow();
    },

    tryCloseSwipeRow() {
        this.swipeList && this.swipeList.tryCloseOpenRow();
    },

    setSwipeListRef(component) {
        this.swipeList = component;
    },

    componentDidMount() {
      const { currentUser } = firebase.auth();
       states = currentUser;

    },
    componentDidUpdate(prevProps) {
        console.log('wow outside');
  if (this.props !== prevProps) {
    console.log('wow');

  }

  },

    refresh(){

          // REFRESH HERE

          //  this.getInitialState();

   //    Navigation.mergeOptions(this.props.componentId, {
   //   bottomTabs: {
   //     currentTabId: 'TAB2_ID'
   //   }
   // });

            Navigation.setRoot({
          root: {
            stack: {
              id: 'App',
              children: [
                {
                  component: {
                    name: 'Initializing'
                  }
                }
            ],
            }
          }
        })

    },

    componentWillUnmount() {
         BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
     },

     handleBackButton() {
        //  ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
          return false;
      },

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Tasks
                </Text>
                <TextInput
                  placeholder="task name"
                  placeholderTextColor="black"
                  underlineColorAndroid="black"
                  selectionColor="white"
                  autoCapitalize = 'none'
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}/>
                {this.renderActiveView()}
            </View>
        );
    },

    renderActiveView() {
        if (this.state.activeTodo) {
            return <TodoDetails todo={this.state.activeTodo} />;
        }
        return (
            <TodoSwipeList ref={this.setSwipeListRef}
                           todos={this.state.todos}
                           addTodo={() => this.addTodo(this.state.text)}
                           archiveTodo={this.archiveTodo}
                           refresh={this.refresh}
                           toggleTodoComplete={this.toggleTodoComplete} />
        );
    }
});
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "white"
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    }
});



export default TodoScene;
