import React, { Component } from 'react';
import { View, Text, Image, AppState, Platform } from 'react-native';
import { connect } from 'react-redux';
import styles from '../style/styles';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { RSS_URL, DEVICE_LIST_LODED, LATITUDE_DELTA, LONGITUDE_DELTA } from '../actions/types';
import { getDataSaga } from '../actions/rest';

class PlayerScreen extends Component {
    static navigationOptions = {
        title: 'Player - Kobi Krasnoff',
    };

    state = {
        initialPosition: null,
        lastPosition: null,
        selectedRegion: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0
        }
    };

    allowGetLocation = true;
    urlRetry = 0;
    selectedRegion = {};

    args = {
        str: 'sdfsdfsdf',
        baseURL: RSS_URL,
        callbackFunction: DEVICE_LIST_LODED
    }

    // fires when the user manually changes the map postion
    onRegionChange(region) {
        // this.setState({ selectedRegion: region }/*, () => this.getPositions(this.state.selectedRegion)*/);
        
    }

    watchID = null;

    getPositions(selectedRegion) {
        const NE_LAT = (selectedRegion.latitude + selectedRegion.latitudeDelta / 2).toString();
        const NE_LNG = (selectedRegion.longitude + selectedRegion.longitudeDelta / 2).toString();
        const SW_LAT = (selectedRegion.latitude - selectedRegion.latitudeDelta / 2).toString();
        const SW_LNG = (selectedRegion.longitude - selectedRegion.longitudeDelta / 2).toString();

        this.args.baseURL = this.args.baseURL.replace(/NE_LAT_1/gi, NE_LAT);
        this.args.baseURL = this.args.baseURL.replace(/NE_LNG_1/gi, NE_LNG);
        this.args.baseURL = this.args.baseURL.replace(/SW_LAT_1/gi, SW_LAT);
        this.args.baseURL = this.args.baseURL.replace(/SW_LNG_1/gi, SW_LNG);

        console.log('getPositions', this.args.baseURL)
        this.props.getDataSaga(this.args);  
    }
    
    componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
                // this.setState({initialPosition: position});
                
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
          this.watchID = Geolocation.watchPosition(position => {
            this.selectedRegion = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };
            
            this.setState({selectedRegion: this.selectedRegion});
            this.getPositions(this.selectedRegion);          
        });
          
    }

    componentWillUnmount() {
        this.watchID != null && Geolocation.clearWatch(this.watchID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // callback function from server
        if (this.props.OriginalXMLResponse !== prevProps.OriginalXMLResponse) {
            this.urlRetry = 0;
            console.log(this.props)
        }

        // if (this.props.errorCode !== 0) {
        //     this.urlRetry++;
        //     if (this.urlRetry < 5)
        //         this.props.getDataSaga(this.args);  
        //     else 
        //         alert('תקלה בתקשורת. אנא נסה שנית מאוחר יותר')
        //     console.log('error: ', this.props.urlRetry);
        // }
        // console.log('markers', this.props.OriginalXMLResponse.markers)

        // if (prevState.selectedRegion.latitude !== this.state.selectedRegion.latitude || prevState.selectedRegion.longitude !== this.state.selectedRegion.longitude) {
        //     if (this.allowGetLocation /*&& this.state.selectedRegion.longitude !== 0 && this.state.selectedRegion.latitude !== 0*/) {
        //         console.log('prevState', this.state.selectedRegion);
        //         this.getPositions(this.state.selectedRegion)
        //         this.allowGetLocation = false;
        //         setTimeout(() => {
        //             this.allowGetLocation = true;
        //         }, 1000);
        //     }
        // }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={this.state.selectedRegion}
                        onRegionChangeComplete={(region) => this.onRegionChange(region)}
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
        OriginalXMLResponse: state.rests.OriginalXMLResponse,
        TrackPlayerList: state.rests.TrackPlayerList,
        errorCode: state.rests.errorCode,
        urlRetry: state.rests.urlRetry,
        urlRetryCount: state.rests.urlRetryCount
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDataSaga: args => dispatch(getDataSaga(args))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerScreen)