import React, { Component } from 'react';
import { View, Text, Image, AppState, Platform } from 'react-native';
import { connect } from 'react-redux';
import styles from '../style/styles';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class PlayerScreen extends Component {
    static navigationOptions = {
        title: 'Player - Kobi Krasnoff',
    };

    state = {
        initialPosition: null,
        lastPosition: null,
        selectedRegion: null,
    };

    // fires when the user manually changes the map postion
    onRegionChange(region) {
        // this.setState({ selectedRegion: region });
        // console.log(region);
    }

    watchID = null;
    
    componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
              // this.setState({initialPosition: position});
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
          this.watchID = Geolocation.watchPosition(position => {
            this.setState({selectedRegion: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.012,
                longitudeDelta: 0.012,
            }});
          });
    }

    componentWillUnmount() {
        this.watchID != null && Geolocation.clearWatch(this.watchID);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={this.state.selectedRegion}
                        onRegionChange={(region) => this.onRegionChange(region)}
                    />
                </View>
                <View style={styles.belowMaps}>
                    <Text>Hello 2</Text>
                    <Text>latitude: {this.state.initialPosition ? this.state.initialPosition.coords.latitude : null}, 
                    longitude: {this.state.initialPosition ? this.state.initialPosition.coords.longitude : null}</Text>
                </View>
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