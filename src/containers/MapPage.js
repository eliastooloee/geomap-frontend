import React, { Component } from 'react';
import CurrentMap from '../components/CurrentMap'
import NewMapForm from '../components/NewMapForm'
// import { api } from "../services/api";


class MapPage extends React.Component {

    render() {
        return (
          <div className="App">
            <div>
              {this.props.currentMap.mapName}
            </div>
            <CurrentMap currentMap = {this.props.currentMap} />
            <NewMapForm currentMap = {this.props.currentMap} handleChange = {this.props.handleChange} newMap = {this.props.newMap}  />
          </div>
        );
      }
}
export default MapPage;