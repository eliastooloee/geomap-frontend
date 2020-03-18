import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import MyMaps from './containers/MyMaps'
import MapPage from './containers/MapPage'
import { api } from "./services/api";

import { Route } from "react-router-dom";

class App extends Component {

   state = {
    auth: {
      user: {}
    },
    currentMap: {
    mapName: "",
    lat: 0,
    long: 0,
    zoom: 4,
    },
    MyMaps: []
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      // console.log('there is a token');
      // make a request to the backend and find our user
      api.auth.getCurrentUser().then(user => {
        // console.log(user)
        const updatedState = { ...this.state.auth, user: user };
        this.setState({ auth: updatedState });
      });
    }
  }

  login = data => {
    const updatedState = { ...this.state.auth, user: {id: data.id,  username: data.username} };
    localStorage.setItem("token", data.jwt);
    this.setState({ auth: updatedState });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ auth: { user: {} } });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      currentMap: {
        ...prevState.currentMap,
      [name]: value
      }
    }))
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
        "map_name": this.state.currentMap.mapName,
        "latitude": this.state.currentMap.lat,
        "longitude": this.state.currentMap.long,
        "zoom": this.state.currentMap.zoom
      })
    })
  }

  render() {
    return (
      <div>
        <div className="ui container grid">
          <div id="content" className="sixteen wide column">
            <Route 
              exact 
              path="/mymaps" 
              render={props => <MyMaps MyMaps={this.state.MyMaps}  />} 

            />
            <Route
              exact
              path="/login"
              render={props => <Login {...props} onLogin={this.login} />}
            />
            <Route 
              exact
              path="/map" 
              render={props => <MapPage currentMap={this.state.currentMap}  handleChange={this.handleChange} />}
              />
          </div>
        </div>
      </div>
    );
  }

  // lat={this.state.lat} long={this.state.long} zoom={this.state.zoom}


  // render() {
  //   return (
  //     <div className="App">
  //       <CurrentMap mapName = {this.state.mapName} lat = {this.state.lat} long = {this.state.long} zoom = {this.state.zoom} />
  //       <NewMapForm newMapSpecs = {this.state} handleChange = {this.handleChange} />
  //     </div>
  //   );
  // }
 }
export default App;
