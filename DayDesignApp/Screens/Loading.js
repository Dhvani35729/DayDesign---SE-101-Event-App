import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, BackHandler} from 'react-native'
import firebase from 'react-native-firebase'
import { Navigation } from 'react-native-navigation'

myList = [];
totalTodos = 0;

class Loading extends React.Component {
  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    firebase.auth().onAuthStateChanged(user => {
    if(user){
      console.log("logged in");
      firebase.database().ref(user.uid + '/total_todos').once('value').then(function(snapshot) {
        totalTodos = snapshot.val();
        // console.log(snapshot.val());
      });

      firebase.database().ref(user.uid + '/len_list').once('value').then(function(snapshot) {
        myList.length = snapshot.val();
        if (myList.length != 0) {
          firebase.database().ref(user.uid + '/todo').once('value').then(function(snapshot) {

            var keys = Object.keys(snapshot.val());
            var counter = 0;

            for(var i = 0; i < keys.length; i++){

              if(snapshot.val()[keys[i]] != null){

                myList[counter] = {
                  id: keys[i],
                  title: String(snapshot.val()[keys[i]].name),
                  complete: false,
                  archived: false,
                  progress: Math.random()
                };
                counter++;
              }

            }

                  if(this.props){
                        console.log("REFRESHED!");
                  }
                  // put here
                  Navigation.setRoot({
                      root: {
                        bottomTabs: {
                          id: 'BottomTabs',
                          children: [
                            {
                              stack: {
                                id: 'TAB2_ID',
                                children: [
                                  {
                                    component: {
                                      name: 'Feed',
                                      passProps: {
                                        text: 'This is tab 2'
                                      }
                                    }
                                  }
                                ],
                                options: {
                                  topBar: {
                                    visible: false,
                                    drawBehind: true,
                                     animate: false
                                  },
                                  bottomTab: {
                                    text: 'Feed',
                                    icon: require('../images/two.png')
                                  }
                                }
                              }
                            },
                            {
                              stack: {
                                id: 'TAB1_ID',
                                children: [
                                  {
                                    component: {
                                      name: 'Calendar',
                                      passProps: {
                                        text: 'This is tab 1',
                                        myFunction: () => 'Hello from a function!'
                                      },
                                      options: {
                                        topBar: {
                                          visible: true,
                                          animate: false,
                                          title: {
                                            text: 'Calendar'
                                          }
                                        },
                                        bottomTab: {
                                          text: 'Tab 1',
                                          icon: require('../images/one.png'),
                                          selectedIcon: require('../images/one.png')
                                        }
                                      }
                                    }
                                  }
                                ],
                                options: {
                                  topBar: {
                                    visible: false
                                  }
                                }
                              }
                            },
                            {
                              stack: {
                                id: 'TAB3_ID',
                                children: [
                                  {
                              component: {
                                name: 'TodoScene',
                                passProps: {
                                  text: 'This is tab 3',
                                  todoList: myList,
                                  count: totalTodos,
                                  myFunction: () => 'Hello from a function!'
                                },
                                options: {
                                  topBar: {
                                    visible: false,
                                    drawBehind: true,
                                     animate: false
                                  }
                                }
                              }
                            }
                              ],
                              options: {
                                topBar: {
                                  visible: false,
                                  drawBehind: true,
                                   animate: false
                                },
                                bottomTab: {
                                  text: 'Todo',
                                  icon: require('../images/one.png'),
                                  selectedIcon: require('../images/one.png')

                                }
                              }
                              }
                            }
                          ],
                          options: {
                            bottomTabs: {
                              titleDisplayMode: 'alwaysShow',
                            }
                          }
                        }
                      }
                    })

          });
          }
          else{
            console.log("here in");
            // put here
            Navigation.setRoot({
                root: {
                  bottomTabs: {
                    id: 'BottomTabs',
                    children: [
                      {
                        stack: {
                          id: 'TAB1_ID',
                          children: [
                            {
                              component: {
                                name: 'Calendar',
                                passProps: {
                                  text: 'This is tab 1',
                                  myFunction: () => 'Hello from a function!'
                                },
                                options: {
                                  topBar: {
                                    visible: true,
                                    animate: false,
                                    title: {
                                      text: 'Calendar'
                                    }
                                  },
                                  bottomTab: {
                                    text: 'Tab 1',
                                    icon: require('../images/one.png'),
                                    selectedIcon: require('../images/one.png')
                                  }
                                }
                              }
                            }
                          ],
                          options: {
                            topBar: {
                              visible: false
                            }
                          }
                        }
                      },
                      {
                        stack: {
                          children: [
                            {
                              component: {
                                name: 'Feed',
                                passProps: {
                                  text: 'This is tab 2'
                                }
                              }
                            }
                          ],
                          options: {
                            bottomTab: {
                              text: 'Feed',
                              icon: require('../images/two.png')
                            }
                          }
                        }
                      },
                      {
                        component: {
                          name: 'TodoScene',
                          passProps: {
                            text: 'This is tab 3',
                            todos: myList,
                            count: totalTodos,
                            myFunction: () => 'Hello from a function!'
                          },
                          options: {
                            topBar: {
                              visible: true,
                              animate: false
                            },
                            bottomTab: {
                              text: 'Todo',
                              icon: require('../images/one.png'),
                              selectedIcon: require('../images/one.png')
                            }
                          }
                        }
                      }
                    ],
                    options: {
                      bottomTabs: {
                        titleDisplayMode: 'alwaysShow',
                      }
                    }
                  }
                }
              })

          }

   });

    }
    else{
      Navigation.setRoot({
    root: {
      stack: {
        id: 'App',
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  visible: false,
                  animate: false,
                  title: {
                    text: 'DayDesign'
                  }
                }
              }
            },

          }
      ],
      }
    }
  })
    }


    })
  }

  componentWillUnmount() {
       BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Loading
