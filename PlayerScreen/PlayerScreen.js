import React, { Component } from 'react';
import { View, Text, Image, AppState, Platform } from 'react-native';
import { connect } from 'react-redux';
import styles from '../style/styles';

class PlayerScreen extends Component {
    static navigationOptions = {
        title: 'Player - Kobi Krasnoff',
    };

    myProgressTimer = null;
    myTimer = null;

    state = {
        isPlaying: false,
        appState: AppState.currentState,
        progress: 0.0,
        duration: 0.0,
        durationFormat: '00:00',
        durationProgress: '00:00',
        currentTrack: {
            artist: "",
            artwork: "https://previews.123rf.com/images/alekseyvanin/alekseyvanin1705/alekseyvanin170501394/77840540-feed-icon-vector-rss-solid-logo-illustration-colorful-pictogram-isolated-on-white.jpg",
            id: "",
            title: "",
            url: ""
        }
    }
    
    componentDidMount() {
        
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello</Text>
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