import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux';

class Splash extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    state = {
        OriginalXMLResponse: {},
        TrackPlayerList: []
      }

    componentDidMount() {
        // activate
        this.props.navigation.replace('DrawerPages', {screen: 'Player', params: {TrackPlayerList: this.props.OriginalXMLResponse}})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
      
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
            <Image
                style={{width: 100, height: 100}} 
                source={require('../img/rss.png')}>
            </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const mapStateToProps = state => {
    return {
      OriginalXMLResponse: state.rests.OriginalXMLResponse,
      TrackPlayerList: state.rests.TrackPlayerList,
      errorCode: state.rests.errorCode
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Splash)