import React, { Component } from 'react';
import { View, Text, Image, AppState, Platform, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from '../style/styles';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, CalloutSubview } from 'react-native-maps';
import { RSS_URL, DEVICE_LIST_LODED, LATITUDE_DELTA, LONGITUDE_DELTA } from '../actions/types';
import { getDataSaga } from '../actions/rest';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomCallout from '../Components/CustomCallout';

class PlayerScreen extends Component {
    static navigationOptions = {
        title: 'AnyWay - Kobi Krasnoff',
    };

    state = {
        initialPosition: null,
        lastPosition: null,
        selectedRegion: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0
        },
        markers: [],
        spinner: false
    };

    // fires when the user manually changes the map postion
    onRegionChange(region) {
        if (region.latitude !== 0 && region.longitude !== 0) {
            if (!(parseFloat(this.state.selectedRegion.latitude).toFixed(5) === parseFloat(region.latitude).toFixed(5) &&
                parseFloat(this.state.selectedRegion.longitude).toFixed(5) === parseFloat(region.longitude).toFixed(5) &&
                parseFloat(this.state.selectedRegion.latitudeDelta).toFixed(5) === parseFloat(region.latitudeDelta).toFixed(5) &&
                parseFloat(this.state.selectedRegion.longitudeDelta).toFixed(5) === parseFloat(region.longitudeDelta).toFixed(5))) {
                    console.log('onRegionChange-2', region)
                    this.getPositions(region);   
            }
            this.setState({selectedRegion: region});
        }
    }

    watchID = null;

    getPositions(selectedRegion) {
        let baseURLObj = RSS_URL;
        
        const NE_LAT = (selectedRegion.latitude + selectedRegion.latitudeDelta / 4).toString();
        const NE_LNG = (selectedRegion.longitude + selectedRegion.longitudeDelta / 4).toString();
        const SW_LAT = (selectedRegion.latitude - selectedRegion.latitudeDelta / 4).toString();
        const SW_LNG = (selectedRegion.longitude - selectedRegion.longitudeDelta / 4).toString();

        baseURLObj = baseURLObj.replace(/NE_LAT_1/gi, NE_LAT);
        baseURLObj = baseURLObj.replace(/NE_LNG_1/gi, NE_LNG);
        baseURLObj = baseURLObj.replace(/SW_LAT_1/gi, SW_LAT);
        baseURLObj = baseURLObj.replace(/SW_LNG_1/gi, SW_LNG);

        console.log('getPositions', baseURLObj)
        this.props.getDataSaga({
            baseURL: baseURLObj,
            callbackFunction: DEVICE_LIST_LODED
        });  
    }
    
    componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
                // this.setState({initialPosition: position});
                // this.setState({spinner: true});
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
          this.watchID = Geolocation.watchPosition(position => {
            const selectedRegion = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };
            
            this.setState({selectedRegion: selectedRegion});
            // this.getPositions(selectedRegion);   
        });
          
    }

    componentWillUnmount() {
        this.watchID != null && Geolocation.clearWatch(this.watchID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // callback function from server
        if (this.props.OriginalXMLResponse !== prevProps.OriginalXMLResponse) {
            console.log(this.props.OriginalXMLResponse[0].payload.markersNew);
            this.setState({markers: this.props.OriginalXMLResponse[0].payload.markersNew, spinner: false});
        }

        if (this.props.errorCode !== 0) {
            alert('תקלה בתקשורת. אנא נסה שנית מאוחר יותר');
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={this.state.selectedRegion}
                        onRegionChangeComplete={(region) => this.onRegionChange(region)}>
                        {this.state.markers.map((marker, i) => (
                            <Marker
                                coordinate={marker.latlng}
                                key={i}
                                pinColor = {marker.severity == 3 ? '#ffd82b' : marker.severity == 2 ? '#ff9f1c' : '#d81c32'}
                                // calloutOffset={{ x: 0, y: 0 }}
                                // calloutAnchor={{ x: 0, y: 0 }}
                                title={marker.title}
                                description={marker.description}
                            >
                                <Callout
                                    alphaHitTest
                                    tooltip
                                    onPress={e => {
                                        if (
                                        e.nativeEvent.action === 'marker-inside-overlay-press' ||
                                        e.nativeEvent.action === 'callout-inside-press'
                                        ) {
                                        return;
                                        }

                                        Alert.alert('callout pressed');
                                    }}
                                    style={styles_callout.customView}
                                >
                                    <CustomCallout>
                                        <Text>{marker.description}</Text>
                                    </CustomCallout>
                                </Callout>
                            </Marker>
                        ))}
                    </MapView>
                </View>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'אנא המתן...'}
                    textStyle={styles.spinnerTextStyle}
                />
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        OriginalXMLResponse: state.rests.OriginalXMLResponse,
        TrackPlayerList: state.rests.TrackPlayerList,
        errorCode: state.rests.errorCode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDataSaga: args => dispatch(getDataSaga(args))
    }
}

const styles_callout = StyleSheet.create({
    customView: {
      width: 260,
      height: 215,
    },
    plainView: {
      width: 60,
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    bubble: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.7)',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20,
    },
    latlng: {
      width: 200,
      alignItems: 'stretch',
    },
    button: {
      width: 80,
      paddingHorizontal: 12,
      alignItems: 'center',
      marginHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: 20,
      backgroundColor: 'transparent',
    },
    calloutButton: {
      width: 'auto',
      backgroundColor: 'rgba(255,255,255,0.7)',
      paddingHorizontal: 6,
      paddingVertical: 6,
      borderRadius: 12,
      alignItems: 'center',
      marginHorizontal: 10,
      marginVertical: 10,
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(PlayerScreen)