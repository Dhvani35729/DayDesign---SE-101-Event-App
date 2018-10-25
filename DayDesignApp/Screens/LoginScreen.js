import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
  }

  authenticate() {
    //Firebase authentication stuff, using the username and password inputted (actually probably email)
    this.props.nav.navigate("Calendar");
  }

  render() {
    const { navigate } = this.props.nav;
    return (
      <View style={loginStyles.container}>
        <Text
          style={loginStyles.title}>DayDesign</Text>
        <TextInput
          placeholder="Username"
          style={loginStyles.credentialsInput}
          placeholderTextColor="white"
          underlineColorAndroid="white"
          selectionColor="white" />
        <TextInput
          placeholder="Password"
          style={loginStyles.credentialsInput}
          placeholderTextColor="white"
          underlineColorAndroid="white"
          selectionColor="white" />
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
