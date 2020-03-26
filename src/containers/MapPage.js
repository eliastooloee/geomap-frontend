import React, { Component } from 'react';
import CurrentMap from '../components/CurrentMap'
import NewMapForm from '../components/NewMapForm'
import TileSelector from '../components/TileSelector'
// import { api } from "../services/api";


class MapPage extends React.Component {

    render() {
        return (
          <div className="App">
            <div>
              {this.props.currentMap.mapName}
            </div>
            <CurrentMap currentMap = {this.props.currentMap} />
            <TileSelector currentMap = {this.props.currentMap} handleChange = {this.props.handleChange}/>
            {/* <NewMapForm currentMap = {this.props.currentMap} handleChange = {this.props.handleChange} newMap = {this.props.newMap}/> */}
            {this.props.currentMap.id===null? <NewMapForm currentMap = {this.props.currentMap} handleChange = {this.props.handleChange} newMap = {this.props.newMap}/>: null}
          </div>
        );
      }
}
export default MapPage;