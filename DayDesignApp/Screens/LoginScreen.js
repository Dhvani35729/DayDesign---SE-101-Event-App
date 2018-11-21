import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, BackHandler } from 'react-native';
import firebase from 'react-native-firebase'
import {Navigation} from 'react-native-navigation';

myList = [];
totalTodos = 0;

class LoginScreen extends React.Component {
  state = { email: '', password: '', errorMessage: null };

  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    //  ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return false;
  }

    goHome(user){

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

      });

    }

  authenticate() {
    // this.props.nav.navigate("Calendar");
    const { email, password } = this.state
    if (email.trim() == "" || password.trim() == "") {
      this.setState({errorMessage: "Please fill in all fields!"});
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => this.goHome(user))
        .catch(error => this.setState({ errorMessage: error.message }));
    }
    console.log(this.state.errorMessage);
  }

  render() {
    return (
      <View style={loginStyles.container}>
        <Text
          style={loginStyles.title}>DayDesign</Text>
        <KeyboardAvoidingView behavior="padding" enabled>
        <TextInput
          placeholder="Email"
          style={loginStyles.credentialsInput}
          placeholderTextColor="white"
          underlineColorAndroid="white"
          type="email"
          selectionColor="white"
          autoCapitalize = 'none'
          textContentType="emailAddress"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}/>
        <TextInput
          placeholder="Password"
          style={loginStyles.credentialsInput}
          placeholderTextColor="white"
          underlineColorAndroid="white"
          selectionColor="white"
          textContentType="password"
          autoCapitalize = 'none'
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}/>
          {this.state.errorMessage &&
         <Text style={{ color: 'red' }}>
           {this.state.errorMessage}
         </Text>}
         </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={this.authenticate}
          style={loginStyles.loginButton}>
          <Text
            style={loginStyles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>   Navigation.push(this.props.componentId, {
            component: {
              name: 'CreateAccount',
              passProps: {
                text: 'Back'
              },
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                animate: false,
                  title: {
                    text: 'Create Account'
                  }
                }
              }
            }
          })}>
          <Text
            style={loginStyles.noAccountText}>{"Don't have an account? Tap here to create one."}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0e9aa7"
  },
  title: {
    flex: 3,
    fontSize: 60,
    textAlign: "center",
    color: "white",
    marginTop: 75
  },
  credentialsInput: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 4,
    fontSize: 16,
    color: "white",
    paddingBottom: 5
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: "#3da4ab",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20
  },
  loginButtonText: {
    fontSize: 20,
    color: "white",
  },
  noAccountText: {
    color: "white",
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 75,
  }
});

 export default LoginScreen
