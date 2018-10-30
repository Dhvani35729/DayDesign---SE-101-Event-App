import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import firebase from 'react-native-firebase'

class CreateAccountScreen extends React.Component {
    state = { email: '', password: '', errorMessage: null }

  constructor(props) {
    super();
    this.createAccount = this.createAccount.bind(this);
  }

  createAccount() {
    //Add account to Firebase through this method
    const { email, password } = this.state
    if(email.trim() == "" || password.trim() == "") {
      this.setState({errorMessage: "Please fill in all fields!"});
    } else {
      firebase.auth()
              .createUserWithEmailAndPassword(email, password)
              .then((user => {
                this.props.nav.navigate('LoginScreen');
              }))
              .catch(error => this.setState({ errorMessage: error.message }));
      }
    }


  render() {
      const { navigate } = this.props.nav;

    return (
      <View
        style={createAccountStyles.container}>
        <KeyboardAvoidingView behavior="padding" enabled
          style={createAccountStyles.credentialsInputHolder}>
          <Text
            style={createAccountStyles.title}>{ "We'll just need some information, please!" }</Text>

          {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" enabled
          style={createAccountStyles.credentialsInputHolder}>
          <TextInput
            placeholder="First Name"
            style={createAccountStyles.credentialsInput}
            placeholderTextColor="white"
            underlineColorAndroid="white"
            selectionColor="white" />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" enabled
          style={createAccountStyles.credentialsInputHolder}>
          <TextInput
            placeholder="Last Name"
            style={createAccountStyles.credentialsInput}
            placeholderTextColor="white"
            underlineColorAndroid="white"
            selectionColor="white" />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" enabled
          style={createAccountStyles.credentialsInputHolder}>
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
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" enabled
          style={createAccountStyles.credentialsInputHolder}>
          <TextInput
            placeholder="Username"
            style={createAccountStyles.credentialsInput}
            placeholderTextColor="white"
            underlineColorAndroid="white"
            autoCapitalize = 'none'
            textContentType="username"
            selectionColor="white" />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" enabled
          style={createAccountStyles.credentialsInputHolder}>
          <TextInput
            placeholder="Password"
            style={createAccountStyles.credentialsInput}
            placeholderTextColor="white"
            underlineColorAndroid="white"
            selectionColor="white"
            autoCapitalize = 'none'
            textContentType="password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password} />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={this.createAccount}
          style={createAccountStyles.createAccountButton}>
          <Text
            style={createAccountStyles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("LoginScreen")}
          style={createAccountStyles.backButton}>
          <Text
            style={createAccountStyles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const createAccountStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
  credentialsInputHolder: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 4,
  },  
  credentialsInput: {
    fontSize: 16,
    color: "white",
    paddingBottom: 2.5,
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
