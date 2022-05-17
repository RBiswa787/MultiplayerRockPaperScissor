import { useEffect, useState } from "react";
import { StyleSheet, Text, View,Image, TouchableOpacity } from "react-native";
import { Component } from "react/cjs/react.production.min";
import Game from "./Pages/Game";
import Open from "./Pages/Open";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Replace this URL with your own socket-io host, or start the backend locally
const Stack = createNativeStackNavigator();
export default class App extends Component {
  render(){
    return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Open" screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Open" component={Open} style={styles.screen}/>
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 16,
  },
  footnote: {
    fontSize: 14,
    fontStyle: "italic",
  },
  gamespace:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop:"10%",
    width: "90%",
    aspectRatio: 0.75,
    borderColor: "black",
    borderWidth: 1,
    flexWrap: "wrap",
    alignItems: "center"
  },
  choices: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    aspectRatio: 3.97,
    marginTop: "10%",
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center"
  },
  rock: {
    height: "100%",
    aspectRatio: 1
  },
  pap:{
    height: "90%",
    aspectRatio: 0.50,
    alignSelf: "center",
    marginTop: "5%"
    
  },
  p1: {
    display: "flex",
    justifyContent: "center",
    width: "95%",
    height: "48.5%",
    borderWidth: 1,
    borderColor: "black",
    marginTop: "2%"
  },
  pap2:{
    height: "90%",
    aspectRatio: 0.50,
    alignSelf: "center",
    marginTop: "-5%",
    transform: [{rotate:"180deg"}]  
  },
  score: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    aspectRatio: 3.97,
    marginTop: "15%",
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center"
  },
  click: {
    height: "90%",
    aspectRatio: 0.50,
    alignSelf: "center",
    marginTop: "5%"
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    width: "25%",
    aspectRatio: 1
  }
});