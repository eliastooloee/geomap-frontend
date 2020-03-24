import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import MyMaps from './containers/MyMaps'
import MapPage from './containers/MapPage'
import Navbar from "./components/NavBar";
import { api } from "./services/api";

import { Route } from "react-router-dom";

class App extends Component {

   state = {
    auth: {
      user: {}
    },
    currentMap: {
    mapName: "",
    latitude: 0,
    longitude: 0,
    zoom: 4,
    },
    maps: [],
    myMaps: []
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
      this.getMaps();
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
    this.props.history.push('/login');
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

  selectMap = (map) => {
    this.setState({
      currentMap: {
        latitude: map.latitude,
        longitude: map.longitude,
        zoom: map.zoom,
        mapName: map.name
      }
    })
  }

  getMaps = () => {
    fetch(`http://localhost:3000/api/v1/maps/`)
    .then(res => res.json())
    .then(myMaps => this.setState({
      myMaps: myMaps
    }))
    .catch(err => console.log(err))
  }
  
  newMap = () => {
    fetch("http://localhost:3000/api/v1/maps", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        map: {
        "user_id": parseFloat(this.state.auth.user.id),
        "name": this.state.currentMap.mapName,
        "latitude": parseFloat(this.state.currentMap.latitude),
        "longitude": parseFloat(this.state.currentMap.longitude),
        "zoom": parseFloat(this.state.currentMap.zoom)
        }
      })
    })
  }

  render() {
    return (
      <div>
        <div className="ui container grid">
            <Navbar
              color="green"
              title="GeoMap"
              description="Make dank maps"
              currentUser={this.state.auth.user}
              handleLogout={this.logout}
            />
          <div id="content" className="sixteen wide column">
         
            <Route 
              exact 
              path="/mymaps" 
              render={props => <MyMaps currentMap={this.state.currentMap} selectMap={this.selectMap} myMaps={this.state.myMaps}  />} 
            />
            <Route
              exact
              path="/login"
              render={props => <Login {...props} onLogin={this.login} />}
            />
            <Route 
              exact
              path="/map" 
              render={props => <MapPage currentMap={this.state.currentMap}  handleChange={this.handleChange} newMap={this.newMap} />}
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
