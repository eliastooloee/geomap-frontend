import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import SignUp from "./components/Signup";
import MyMaps from './containers/MyMaps'
import MapPage from './containers/MapPage'
import Navbar from "./components/NavBar";
import { api } from "./services/api";
import L from 'leaflet';

import { Route, Link, withRouter } from "react-router-dom";

class App extends Component {

   state = {
    auth: {
      user: {}
    },
    currentMap: {
    id: null,  
    mapName: "",
    latitude: 0,
    longitude: 0,
    zoom: 4,
    tile_url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    mapFeatures: []
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
    // console.log()
    // console.log (map.mapFeatures)
    let feature_array=[];
    for(let i = 0, l = map.features.length; i < l; i++) {
      let json_feature=JSON.parse(map.features[i].feature_data);
      let geoJsonFeature = L.geoJSON(json_feature)
      console.log(json_feature)
      for(let j = 0, l = json_feature.geometry.coordinates[0].length; j < l; j++) {
         json_feature.geometry.coordinates[0][j].reverse()
      }
      console.log(json_feature);
      feature_array.push(json_feature);
    }
    this.setState({
      currentMap: {
        id: map.id,
        latitude: map.latitude,
        longitude: map.longitude,
        zoom: map.zoom,
        tile_url: map.tile_url,
        attribution: map.attribution,
        mapName: map.name,
        mapFeatures: feature_array
      }
    })
   this.props.history.push('/map');
  //  console.log
  }

  // getFeatures = () => {
  //   fetch(`http://localhost:3000/api/v1/features/`)
  //   .then(res => res.json())
  //   .then(myMaps => this.setState({
  //     myMaps: myMaps
  //   }))
  //   .catch(err => console.log(err))
  // }

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
        "zoom": parseFloat(this.state.currentMap.zoom),
        "tile_url": this.state.currentMap.tile_url
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
              title="Simple Map"
              description="Cartography Doesn't Have to be Hard"
              currentUser={this.state.auth.user}
              handleLogout={this.logout}
            />
          <div id="content" className="sixteen wide column">
         
            <Route 
              exact 
              path="/mymaps" 
              render={props => <MyMaps {...props} currentMap={this.state.currentMap} selectMap={this.selectMap} myMaps={this.state.myMaps}  />} 
            />
            <Route
              exact
              path="/login"
              render={props => <Login {...props} onLogin={this.login} />}
            />
             <Route
              exact
              path="/signup"
              render={props => <SignUp {...props} signUp={this.signUp} />}
            />
            <Route 
              exact
              path="/map" 
              render={props => <MapPage {...props} currentMap={this.state.currentMap}  handleChange={this.handleChange} newMap={this.newMap} />}
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
export default withRouter(App);
