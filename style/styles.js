import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  textContainer : {
    padding: 8,
    width: Dimensions.get('window').width
  },
  imageContainer : {
    padding: 10
  },
  artist : {
    width: '95%',
    flexWrap: 'wrap'
  },
  buttonsContainer : {
    flexDirection: 'row',
    height: 100,
    borderWidth: 0.0,
  },
  innerTouchableOpacity: {
    borderWidth: 0.0,
    alignItems: 'center',
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  belowMaps: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerBox: {
    width: '60%',
    height: 100,
    backgroundColor: '#000000',
    opacity: 0.5,
    borderRadius: 20
  }
});
