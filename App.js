/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View,StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import SignUp from './screens/SignUp';
import Quiz from './screens/Quiz';

const Stack=createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
    
      <StatusBar backgroundColor="#0f4c75"/>
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp"
        screenOptions={{
          headerStyle:{
            backgroundColor:'#0000'
          },
          title: 'Quiz App',
          headerTitleStyle:{
              textAlign: 'center',
              color: '#00b7c2'
          }
  
        }}>
          
          <Stack.Screen name="SignUp" component={SignUp}/>
          <Stack.Screen name="Quiz" component={Quiz}/>

        </Stack.Navigator>
      </NavigationContainer>
   
       </> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;