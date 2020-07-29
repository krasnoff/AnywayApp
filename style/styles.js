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
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
  },
  belowMaps: {
    marginTop: Dimensions.get('window').width + 10,
  },
});
