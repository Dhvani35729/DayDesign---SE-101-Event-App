import React from 'react'
import {  Modal, View, Text, TouchableOpacity, BackHandler, ScrollView, StyleSheet, PanResponder,
    Animated, ListView, TouchableHighlight } from 'react-native'
import firebase from 'react-native-firebase'
import { Container, Content, Icon, Thumbnail, Card, CardItem, Header, Left, Right, Button } from 'native-base'


class Calendar extends React.Component {
    state = {modalVisible: false, currentUser: null, rowId: 0 };

    constructor() {
          super();
          const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
          this.state = {
              pan: new Animated.ValueXY(),
              dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7', 'row 8', 'row 9', 'row 10']),
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
    this.setState({rowId: rowData});
    this.setModalVisible(true);
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
        borderRadius: CIRCLE_RADIUS
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'gray',
       borderWidth: 1,
    }
})

export default Calendar
