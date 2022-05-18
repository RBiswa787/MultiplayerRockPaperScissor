import { useEffect, useState } from "react";
import { StyleSheet, Text, View,Image, TouchableOpacity } from "react-native";
import { Component } from "react/cjs/react.production.min";
import { socket } from "./Socket";

let socketId= "";
socket.on("connect", () => {
    socketId = socket.id;
    console.log(socketId); // x8WIv7-mJelg7on_ALbx
  });

export default class Game extends Component {
  constructor(){
 
    super();
 
    this.state={
      me: "",
      url : "https://i.ibb.co/f4dCY6j/wait.jpg",
      uri : "https://i.ibb.co/f4dCY6j/wait.jpg",
      code: "",
      player1: "Waiting!",
      player2: "Waiting!",
      rounds: 5,
      round: 0,
      player1wins: 0,
      player2wins: 0,
      toggle: false,
      col1 : "pink",
      col2 : "pink"
    }
  }
  componentDidMount(){
    socket.on("updateInit", data => {
      this.setState({
        code: data["code"],
        player1: data["player1"],
        player2: data["player2"],
        rounds: data["rounds"],
        round: data["round"],
        player1wins: data["player1wins"],
        player2wins: data["player2wins"]
      })
    });
    socket.on("greet", data => {
      alert("Welcome " + data);
      this.state.me = data;
      console.log(this.state.me);
    });
    socket.on("update",data => {
      console.log("Recieved update!");
      if(data["player1wins"]>this.state.player1wins && this.state.me === this.state.player1){
        this.Col2Green();
      }
      else if(data["player1wins"]>this.state.player1wins && this.state.me === this.state.player2){
        this.Col1Green();
      }
      else if(data["player2wins"]>this.state.player2wins && this.state.me === this.state.player2){
        this.Col2Green();
      }
      else if(data["player2wins"]>this.state.player2wins && this.state.me === this.state.player1){
        this.Col1Green();
      }
      else{
        this.ColOrange();
      }
      this.state.toggle = !this.state.toggle;
      console.log(data);
      this.setState({
        round: data["round"],
        player1wins: data["player1wins"],
        player2wins: data["player2wins"]}
        );
      console.log(this.state.round);
      if(this.state.player1===this.state.me){
      if(data["player2choice"] == 0){
        this.LoadRocURI();
      }
      else if(data["player2choice"] == 1){
        this.LoadPapURI();
      }
      else{
        this.LoadSciURI();
      }}
      else{
        if(data["player1choice"] == 0){
          this.LoadRocURI();
        }
        else if(data["player1choice"] == 1){
          this.LoadPapURI();
        }
        else{
          this.LoadSciURI();
        }
      }
    });
    socket.on("load",data => {
      console.log("Triggered");
      this.state.toggle = !this.state.toggle;
      this.LoadWait();
      this.LoadWaitURI();
      this.ColPink();
    });
    socket.on("result",data => {
      alert(data + " Wins!");
      this.props.navigation.navigate('Open');
    });
    socket.on("left",data=>{
      alert(data);
      this.props.navigation.navigate('Open');
    })
  }
  componentWillUnmount(){
    if(this.state.round!=5){
    socket.emit("leave",this.state.code);
    }
  }
  reset=()=>{
    this.ColPink();
    this.LoadWait();
    this.LoadWaitURI();
    this.state.toggle = !this.state.toggle;
    socket.emit("reset",this.state.code);
  }
  Col1Green=()=>{
 
    this.setState({
 
      col1 : "lightgreen"
 
    })
  }
  ColPink=()=>{
 
    this.setState({
 
      col1 : "pink",
      col2 : "pink"
 
    })
  }
  Col2Green=()=>{
 
    this.setState({
 
      col2 : "lightgreen"
 
    })
  }
  ColOrange=()=>{
 
    this.setState({
 
      col1 : "orange",
      col2 : "orange"
 
    })
  }
  LoadSci=()=>{
 
    this.setState({
 
      url : "https://i.ibb.co/xSvbNLZ/sci.png"
 
    })
  }
  LoadPap=()=>{
 
    this.setState({
 
      url : "https://i.ibb.co/gFPJqXF/pap.png"
 
    })
  }
  LoadRoc=()=>{
 
    this.setState({
 
      url : "https://i.ibb.co/FK6KLZV/roc.png"
 
    })
  }
  
  LoadWait=()=>{
 
    this.setState({
 
      url : "https://i.ibb.co/f4dCY6j/wait.jpg"
 
    })
  }
  LoadSciURI=()=>{
 
    this.setState({
 
      uri : "https://i.ibb.co/xSvbNLZ/sci.png"
 
    })
  }
  LoadPapURI=()=>{
 
    this.setState({
 
      uri : "https://i.ibb.co/gFPJqXF/pap.png"
 
    })
  }
  LoadRocURI=()=>{
 
    this.setState({
 
      uri : "https://i.ibb.co/FK6KLZV/roc.png"
 
    })
  }
  
  LoadWaitURI=()=>{
 
    this.setState({
 
      uri : "https://i.ibb.co/f4dCY6j/wait.jpg"
 
    })
  }
  PlayRoc=()=>{
    this.LoadRoc();
    socket.emit("play", {"code":this.state.code,"me":this.state.me,"choice": 0});
  }
  PlayPap=()=>{
    this.LoadPap();
    socket.emit("play", {"code":this.state.code,"me":this.state.me,"choice": 1});
  }
  PlaySci=()=>{
    this.LoadSci();
    socket.emit("play", {"code":this.state.code,"me":this.state.me,"choice": 2});
  }
  
 render(){
  return (
    
   <View style={styles.container}>
     <View style = {styles.score}>
       <View style = {styles.up}>
         <Text style={styles.heading}>Player 1</Text>
         <Text style={styles.heading}>Round</Text>
         <Text style={styles.heading}>Player 2</Text>
       </View>
       <View style = {styles.down}>
       <Text>{this.state.player1}</Text>
         <Text>{this.state.player1wins}/5</Text>
         <Text>{this.state.round}</Text>
         <Text>{this.state.player2wins}/5</Text>
         <Text>{this.state.player2}</Text>
       </View>
    </View>
     <View style={styles.gamespace}>
     <View style={{display: "flex",
    justifyContent: "center",
    width: "95%",
    height: "48.5%",
    borderWidth: 4,
    borderColor: this.state.col1,
    marginTop: "2%",
    borderRadius: 10,}}>
       <Image
        style={styles.pap2}
        source={{ uri: this.state.uri }}
      />
    
     </View>
     <View style={{display: "flex",
    justifyContent: "center",
    width: "95%",
    height: "48.5%",
    borderWidth: 4,
    borderColor: this.state.col2,
    marginTop: "2%",
    borderRadius: 10,}}>
       <Image
        style={styles.pap}
        source={{ uri: this.state.url }}
      />
     </View>
     <TouchableOpacity style={styles.next} onPress={this.reset}><Text>Next Round</Text></TouchableOpacity>
     </View>
     <View style = {styles.choices}>
       <TouchableOpacity onPress={this.PlayRoc} style= {styles.button} disabled={this.state.toggle}>
      <Image
        style={styles.rock}
        source={require('../assets/rock.png')}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={this.PlayPap} style= {styles.button} disabled={this.state.toggle}>
      <Image
        style={styles.rock}
        source={require('../assets/paper.png')}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={this.PlaySci} style= {styles.button} disabled={this.state.toggle}>
      <Image
        style={styles.rock}
        source={require('../assets/scissor.png')}
      />
      </TouchableOpacity>
     </View>
   </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
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
    width: "90%",
    aspectRatio: 3.97,
    marginTop: "15%",
    borderWidth: 2,
    borderColor: "black",
  },
  click: {
    height: "90%",
    aspectRatio: 0.50,
    alignSelf: "center",
    marginTop: "5%"
  },
  button: {
    width: "25%",
    aspectRatio: 1
  },
  up: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    position: "relative",
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    height: "50%",
    marginTop:"0%",
    alignItems: "center"
  },
  down: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    position: "relative",
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    height: "50%",
    marginTop:"12%",
    marginLeft: "-100%",
    alignItems: "center"
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold"
  },
  next: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "10%",
    borderRadius: 50,
    backgroundColor: "pink",
    marginTop: "-7%",
    elevation: 5
  },
  
});