import React, { Component } from 'react';
import '../App.css';

class TileSelector extends React.Component {
    // handleSubmit(event) {
    //   alert('Your favorite flavor is: ' + this.state.value);
    //   event.preventDefault();
    // }
  
    render() {
      return (
        <form >
          <label>
            Choose the tiles for your map:
            <select name="tile_url" value={this.props.currentMap.tile_url} onChange={this.props.handleChange}>
              <option value="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png">OpenTopoMap</option>
              <option value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}">ESRI World Imagery</option>
              <option value="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png">Stamen Terrain</option>
              <option value="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg">Stamen Watercolor</option>
            </select>
          </label>
        </form>
      );
    }
  }
  export default TileSelector;