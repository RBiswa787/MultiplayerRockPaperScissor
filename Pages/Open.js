import { useEffect, useState } from "react";
import { StyleSheet, Text, View,Image, TouchableOpacity,TextInput } from "react-native";
import { Component } from "react/cjs/react.production.min";
import { socket } from "./Socket";

// Replace this URL with your own socket-io host, or start the backend locally
let socketId= "";
socket.on("connect", () => {
    socketId = socket.id;
    console.log(socketId); // x8WIv7-mJelg7on_ALbx
  });
export default class Open extends Component {
    constructor(){
 
        super();
     
        this.state={
        gamecode : "125y32as",
        roomcode: "",
        name: "",
        }
     
      }
  handleClick=() => {
    this.props.navigation.navigate('Game')
    }
      
        
    makecode(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    gencode=()=>{
 
        this.setState({
     
          gamecode : this.makecode(5)
     
        })
      }
    handlecode = (text) => {
        this.setState({ roomcode: text });
     }
     handlename = (text) => {
      this.setState({ name: text });
   }
    reqjoinroom=()=>{
        socketId = socket.id;
        socket.emit("joinroom", {"code":this.state.roomcode,"id":socket.id,"name": this.state.name});
        this.props.navigation.navigate('Game');
    }
    
 render(){
  return (
    /*
    <View style={styles.container}>
      {!hasConnection && (
        <>
          <Text style={styles.paragraph}>
            Connecting to {socketEndpoint}...
          </Text>
          <Text style={styles.footnote}>
            Make sure the backend is started and reachable
          </Text>
        </>
      )}

      {hasConnection && (
        <>
          <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
            Server time
          </Text>
          <Text style={styles.paragraph}>{time}</Text>
        </>
      )}
    </View>
    */
   <View style={styles.container}>
       <View style={styles.name}>
       <Image
        style={styles.title}
        source={require("../assets/title.png")}
      />
       </View>
       <TextInput style={styles.nameinp} onChangeText={this.handlename} placeholder="enter your name"></TextInput>
       <TextInput style={styles.codeinp} onChangeText={this.handlecode} placeholder="enter code"></TextInput>
       <TouchableOpacity style={styles.submit} onPress={this.reqjoinroom}>
           <Text style={styles.gentext} >Enter Game</Text>
       </TouchableOpacity>
   </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
      width: "90%",
      aspectRatio: 1.1,
      marginTop: "5%"
    },
code: {
        display: "flex",
        borderColor: "black",
        borderWidth: 2,
        width: "90%",
        aspectRatio: 4,
        marginTop: "10%",
        justifyContent: "center",
        alignItems: "center"
      },
codetext: {
    fontSize: 20
},
generate: {
    width: "60%",
    aspectRatio: 5,
    borderRadius: 10,
    backgroundColor: "pink",
    elevation: 5,
    marginTop: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
},
gentext: {
    fontSize: 14
},
codeinp: {
  display: "flex",
  justifyContent: "center",
    borderWidth: 2,
    borderColor: "grey",
    width: "60%",
    height: "7%",
    marginTop: "10%",
    borderRadius: 10,
    paddingLeft: "5%"
},
nameinp: {
  display: "flex",
  justifyContent: "center",
    borderWidth: 2,
    borderColor: "grey",
    width: "60%",
    height: "7%",
    marginTop: "10%",
    borderRadius: 10,
    paddingLeft: "5%"
},
submit: {
    width: "60%",
    aspectRatio: 5,
    borderRadius: 10,
    backgroundColor: "lightgreen",
    elevation: 5,
    marginTop: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
},
title: {
  width: "50%",
  height: "50%"
}
});