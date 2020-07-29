import React, { Component } from 'react';
import { View, Text, Image, AppState, Platform } from 'react-native';
import { connect } from 'react-redux';
import styles from '../style/styles';
import Geolocation from '@react-native-community/geolocation';

class PlayerScreen extends Component {
    static navigationOptions = {
        title: 'Player - Kobi Krasnoff',
    };

    state = {
        initialPosition: null,
        lastPosition: null,
    };

    watchID = null;
    
    componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
              this.setState({initialPosition: position});
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
          this.watchID = Geolocation.watchPosition(position => {
            this.setState({lastPosition: position});
          });
    }

    componentWillUnmount() {
        this.watchID != null && Geolocation.clearWatch(this.watchID);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello 2</Text>
                <Text>latitude: {this.state.initialPosition ? this.state.initialPosition.coords.latitude : null}, 
                longitude: {this.state.initialPosition ? this.state.initialPosition.coords.longitude : null}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        TrackPlayerList: ownProps.route.params.TrackPlayerList
    }
}

const mapDispatchToProps = dispatch => {
    return {
     
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerScreen)