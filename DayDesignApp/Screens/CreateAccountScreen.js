import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, BackHandler } from 'react-native';
import firebase from 'react-native-firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Navigation } from 'react-native-navigation'

class CreateAccountScreen extends React.Component {

  state = { email: '', password: '', errorMessage: null, firstName: '', lastName: '' }

  constructor(props) {
    super();
    this.createAccount = this.createAccount.bind(this);
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

  createAccount() {
    //Add account to Firebase through this method
    const { email, password, firstName, lastName } = this.state;
    if(email.trim() == "" || password.trim() == "" || firstName.trim() == "" || lastName.trim() == "") {
      this.setState({errorMessage: "Please fill in all fields!"});
    } else {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user => {
          firebase.database().ref(user.user.uid + '/len_list').set(0);
          firebase.database().ref(user.user.uid + '/total_todos').set(0);
          firebase.database().ref(user.user.uid + '/full_name').set(firstName + ' ' + lastName);
          user.user.sendEmailVerification();
          firebase.auth().signOut().then(function() {
            // Sign-out successful.
            Navigation.setRoot({
              root: {
                stack: {
                  id: 'App',
                  children: [
                    {
                      component: {
                        name: 'Login',
                      }
                    }
                  ],
                }
              }
            });
          }, function(error) {
            // An error happened.
          });
        })).catch(error => this.setState({ errorMessage: error.message }));
      }
    }


  render() {

    return (
      <KeyboardAwareScrollView
        style={createAccountStyles.container}>
        <Text
          style={createAccountStyles.title}>{ "We'll just need some information, please!" }</Text>

        {this.state.errorMessage &&
        <Text style={{ color: 'red' }}>
          {this.state.errorMessage}
        </Text>}
        <TextInput
          placeholder="First Name"
          style={createAccountStyles.credentialsInput}
          placeholderTextColor="white"
          underlineColorAndroid="white"
          selectionColor="white"
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName} />
        <TextInput
          placeholder="Last Name"
          style={createAccountStyles.credentialsInput}
          placeholderTextColor="white"
          underlineColorAndroid="white"
          selectionColor="white"
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName} />
        <TextInput
          placeholder="Email"
          style={createAccountStyles.credentialsInput}
          placeholderTextColor="white"
          underlineColorAndroid="white"
          selectionColor="white"
          autoCapitalize = 'none'
          textContentType="emailAddress"
          onChangeText={email => this.setState({ email })}
          value={this.state.email} />
        <TextInput
          placeholder="Password"
          style={createAccountStyles.credentialsInput}
          placeholderTextColor="white"
          underlineColorAndroid="white"
          selectionColor="white"
          autoCapitalize = 'none'
          textContentType="password"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password} />
        <TouchableOpacity
          onPress={this.createAccount}
          style={createAccountStyles.createAccountButton}>
          <Text
            style={createAccountStyles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>   Navigation.pop(this.props.componentId)}
          style={createAccountStyles.backButton}>
          <Text
            style={createAccountStyles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const createAccountStyles = StyleSheet.create({
  container: {
    flex: 1,
  // justifyContent: "center",
    backgroundColor: "#0e9aa7"
  },
  title: {
    flex: 3,
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginLeft: 25,
    marginRight: 25,
    marginTop: 50
  },
  credentialsInput: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 4,
    fontSize: 16,
    color: "white",
    paddingBottom: 2.5
  },
  createAccountButton: {
    alignItems: "center",
    backgroundColor: "#3da4ab",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#3da4ab",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50
  },
  createAccountButtonText: {
    fontSize: 20,
    color: "white",
  },
  backButtonText: {
    fontSize: 20,
    color: "white",
  }
});

export default CreateAccountScreen
