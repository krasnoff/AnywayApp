// HomeScreen.js

import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import ListItem from '../components/ListItem';
import { connect } from 'react-redux';
import { addPlace } from '../actions/place';
import { getDataSaga } from '../actions/rest';
import { BASE_URL, DEVICE_LIST_LODED, SEARCH_RESULTS_LOADED, API_ERRORED } from '../actions/types';


class HomeScreen extends Component {

static navigationOptions = {
    title: 'Search screen',
};

state = {
  placeName: '',
  places: [],
  posts: [],
  OriginalXMLResponse: [],
  burstList: [],
  buttonDisabled: false,
  sendUrl: ''
}

args = {
  str: 'sdfsdfsdf',
  baseURL: BASE_URL + 'v2/devices',
  callbackFunction: DEVICE_LIST_LODED
}

argsSearch = {
  str: 'sdfsdfsdf',
  baseURL: BASE_URL + 'v2/search?q={q}&device={device}',  
  callbackFunction: SEARCH_RESULTS_LOADED
}

componentDidMount() {
  // activate   
  if (this.props.OriginalXMLResponse && this.props.OriginalXMLResponse.length === 0) {
    // this.props.getDataSaga(this.args);  
  }
}

componentDidUpdate(prevProps, prevState, snapshot) {
  if (this.props.OriginalXMLResponse !== prevProps.OriginalXMLResponse) {
    // this.setState({OriginalXMLResponse: this.props.OriginalXMLResponse});
  }
  
  
  if (this.props.burstList !== prevProps.burstList) {
    // this.setState({buttonDisabled: false});
    // this.setState({burstList: this.props.burstList[0].bursts});
    
  }

  if (this.props.errorCode !== prevProps.errorCode) {
      alert('Error: ' + this.props.errorCode)
  }
}

placeSubmitHandler = () => {
  // get search results
  let sendUrl = this.argsSearch.baseURL;
  sendUrl = sendUrl.replace("{q}", encodeURI(this.state.placeName));
  sendUrl = sendUrl.replace("{device}", this.state.OriginalXMLResponse[0]);

  this.setState({buttonDisabled: true, sendUrl: sendUrl});
  this.props.getDataSaga({
    str: this.argsSearch.str,
    baseURL: sendUrl,  
    callbackFunction: this.argsSearch.callbackFunction
  });
}

placeNameChangeHandler = (value) => {
  this.setState({
    placeName: value
  });    
}

chooseBurstHandler = (value) => {
  //alert(value); 
  this.props.navigation.navigate('Player', { burstItem: value }) 
}

placesOutput = () => {
   return (
    <FlatList style = { styles.listContainer }
      data = { this.state.burstList }
      keyExtractor={(item, index) => index.toString()}
      renderItem = { info => (
        <TouchableOpacity onPress={ () => { this.chooseBurstHandler(info.item) }}>
        <ListItem  
          placeName={ info.item.title }
        />
        </TouchableOpacity>
      )}
    />
  )
}

render() {
  return (
    <View style={ styles.container }>
      <View style = { styles.inputContainer }>
        <TextInput
          placeholder = "Seach Places"
          style = { styles.placeInput }
          value = { this.state.placeName }
          onChangeText = { this.placeNameChangeHandler }
          
        ></TextInput>
        {/* <Button title = 'Add' 
          style = { styles.placeButton }
          onPress = { this.placeSubmitHandler }
          disabled = {this.state.buttonDisabled}
        /> */}
        <Image
            style={{width: 100, height: 100}} 
            source={require('../img/rss.png')}>
        </Image>
        </View>
        <View><Text>{this.state.sendUrl}</Text></View>
        <View style = { styles.listContainer }>
          { this.placesOutput() }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  },
  listContainer: {
    width: '100%'
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    OriginalXMLResponse: state.rests.OriginalXMLResponse,
    burstList: state.rests.burstList,
    errorCode: state.rests.errorCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (name) => {
      dispatch(addPlace(name))
    },
    getDataSaga: args => dispatch(getDataSaga(args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)