import React, { Component } from 'react';
import './App.css';
import CurrentMap from './components/CurrentMap'
// import EditControlExample from "./edit-control";
import NewMapForm from './components/NewMapForm'

class App extends Component {

   state = {
    loggedIn: false,
    currentUser: {
      id: "",
      name: ""
    },
    mapName: "",
    lat: 0,
    long: 0,
    zoom: 4
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  

  newMap = () => {
    fetch("http://localhost:3000/maps", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "user_id": this.props.currentUser.id,
        "map_name": this.state.mapName,
        "latitude": this.state.lat,
        "longitude": this.state.lat,
        "zoom": this.state.zoom
      })
    })
  }

  render() {
    return (
      <div className="App">
        <CurrentMap mapName = {this.state.mapName} lat = {this.state.lat} long = {this.state.long} zoom = {this.state.zoom} />
        <NewMapForm newMapSpecs = {this.state} handleChange = {this.handleChange} />
      </div>
    );
  }
}
export default App;
