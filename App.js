import 'react-native-gesture-handler';
import React from 'react';
import {createAppContainer} from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from './SplashScreen/SplashScreen';
import PlayerScreen from './PlayerScreen/PlayerScreen';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerPages() {
  return (
    <Drawer.Navigator initialRouteName="Player" backBehavior="initialRoute">
      <Drawer.Screen name="הצג מפה" component={PlayerScreen} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="DrawerPages" component={DrawerPages} options={ props => { 
          const navigation = props.navigation;
          return {
            title: 'Anyway - Kobi Krasnoff', 
            headerStyle: { backgroundColor: '#f4511e'}, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: () => (
              <View style={{paddingLeft:16}}>
                <Icon
                  name="bars"
                  size={30}
                  color='white'
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }} 
                />
              </View>
            ),
        }}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;