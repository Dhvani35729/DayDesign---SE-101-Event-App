import React from 'react'
import {  Modal, View, Text, TouchableOpacity, BackHandler, ScrollView, StyleSheet, PanResponder,
    Animated, ListView, TouchableHighlight, Linking,Platform } from 'react-native'
import firebase from 'react-native-firebase'
import { Container, Content, Icon, Thumbnail, Card, CardItem, Header, Left, Right, Button } from 'native-base'
import WifiManager from 'react-native-wifi';
import NfcManager, {Ndef} from 'react-native-nfc-manager';

const RtdType = {
    URL: 0,
    TEXT: 1,
};

class Calendar extends React.Component {
    state = {modalVisible: false, currentUser: null, rowId: 0, row2Id: '' };

    constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
        pan: new Animated.ValueXY(),
        dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7', 'row 8', 'row 9', 'row 10']),
        supported: true,
        enabled: false,
        isWriting: false,
        urlToWrite: 'https://www.google.com',
        rtdType: RtdType.URL,
        parsedText: null,
        tag: {},
    };
    this.state.modalVisible = false;
    }

    componentWillMount() {

       this._val = { x: 0, y: 0 }
       this.state.pan.addListener((value) => this._val = value);

       this.panResponder = PanResponder.create({
           onStartShouldSetPanResponder: () => true,
           onPanResponderMove: Animated.event([null, {
               dx: this.state.pan.x,
               dy: this.state.pan.y
           }]),
           onPanResponderRelease: (e, gesture) => {
               Animated.spring(this.state.pan, {
                   toValue: { x: 0, y: 0 },
                   friction: 5
               }).start();
           }
       });
   }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.setState({ currentUser })
  }

  componentWillUnmount() {
       BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

   handleBackButton() {
      //  ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return false;
    }

  openModal(rowData){
    console.log("CLICKED");
    console.log(rowData);

    if( Platform.OS === 'android' ){
      try {
        WifiManager.isEnabled(function(enabled) {
          console.log("WiFi", "isEnabled", enabled);
          WifiManager.loadWifiList(function(successCallback) {
            console.log("List", successCallback);

          }, function(errorrCallback) {
            console.log("List Error", errorrCallback);

          });


        });
      } catch (e) {
        console.log("WiFi", "can't isEnabled", e);
      }


    }


    NfcManager.registerTagEvent(this._onTagDiscovered)
        .then(result => {
            console.log('registerTagEvent OK', result)
            this.setState({rowId: this.state.parsedText});


            WifiManager.connectToProtectedSSID("WIFI_NAME", this.state.parsedText, true)
              .then(() => {
              	console.log('Connected successfully!')
                  this.setState({rowId2: "SUCCESS"});
                    this.setModalVisible(true);

              }, () => {
              	console.log('Connection failed!')
                this.setState({rowId2: "FAIL"});
                  this.setModalVisible(true);
              })

        })
        .catch(error => {
            console.warn('registerTagEvent fail', error)
        })


//     WifiManager.getCurrentWifiSSID().then((ssid) => {
// 	console.log("Your current connected wifi SSID is " + ssid)
//       this.setState({rowId: this.state.parsedText});
//       this.setModalVisible(true);
// }, () => {
// 	console.log('Cannot get current SSID!')
//   this.setState({rowId: "rekt"});
//       this.setModalVisible(true);
// })

  }

  renderAgenda(rowData) {
     return (
         <Card>
             <CardItem>
                 <Left>
                     <Text>Time-Start</Text>
                 </Left>
                 <Button transparent onPress={() => {this.openModal(rowData)}} style={{ padding: '10%', alignSelf: 'center' }}>
                     <Icon name="add" />
                 </Button>
                 <Right>
                     <Text>Time-End</Text>
                 </Right>
             </CardItem>
         </Card>
     );
   }

   setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _onTagDiscovered = tag => {
      console.log('Tag Discovered', tag);
      this.setState({ tag });
      let url = this._parseUri(tag);
      if (url) {
          Linking.openURL(url)
              .catch(err => {
                  console.warn(err);
              })
      }

      let text = this._parseText(tag);
      this.setState({parsedText: text});
  }


  _parseUri = (tag) => {
      try {
          if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
              return Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
          }
      } catch (e) {
          console.log(e);
      }
      return null;
  }

  _parseText = (tag) => {
      try {
          if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
              return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
          }
      } catch (e) {
          console.log(e);
      }
      return null;
  }

   render(){
     const panStyle = {
         transform: this.state.pan.getTranslateTransform()
     }
     return (
         <Container style={styles.container}>
             <Content>
             <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      <View style={{marginTop: 22}}>
        <View>
          <Text>Hello World!</Text>
          <Text>{this.state.rowId}</Text>
          <Text>{this.state.rowId2}</Text>
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
                 <Animated.View
                     {...this.panResponder.panHandlers}
                     style={[panStyle, styles.circle]}
                 />

                 <ListView
                     dataSource={this.state.dataSource}
                     renderRow={(rowData) => this.renderAgenda(rowData)}
                 />

             </Content>
         </Container >
     );
 }

}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
    circle: {
        backgroundColor: "skyblue",
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        zIndex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'gray',
        zIndex: -1,
       borderWidth: 1,

    }
})

export default Calendar
