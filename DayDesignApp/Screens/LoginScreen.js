import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import firebase from 'react-native-firebase'

class LoginScreen extends React.Component {
    state = { email: '', password: '', errorMessage: null }

  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
  }

  authenticate() {
    //Firebase authentication stuff, using the username and password inputted (actually probably email)
    // this.props.nav.navigate("Calendar");
    const { email, password } = this.state
    if(email.trim() == "" || password.trim() == ""){
      this.setState({errorMessage: "Please fill in all fields!"})
    }
    else{
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.nav.navigate('Calendar'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }


      console.log(this.state.errorMessage)
  }

  render() {
    const { navigate } = this.props.nav;
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
          onPress={() => navigate("CreateAccountScreen")}>
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
