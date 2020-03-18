import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "../App.css";

export default class CurrentMap extends Component {


    
  render () {
    return (
      <Map center={[this.props.currentMap.lat, this.props.currentMap.long]} zoom={this.props.currentMap.zoom}>
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}