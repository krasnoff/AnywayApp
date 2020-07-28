import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  
});
