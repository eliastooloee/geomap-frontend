import React, { Component } from 'react';
import '../App.css';

class NewMapForm extends Component {
  
    render() {
      return (
        <form onSubmit={this.props.NewMap}>
          <label>
            Name:
            <input 
                type="text" 
                name="mapName" 
                value={this.props.currentMap.mapName}
                onChange={event => this.props.handleChange(event)}  
            />
          </label>
          <label>
            Latitude:
            <input 
                type="text"
                name = "lat"
                value={this.props.currentMap.lat}
                onChange={event => this.props.handleChange(event)}
            />
          </label>
          <label>
            Longitude:
            <input 
                type="text" 
                name="long" 
                value={this.props.currentMap.long}
                onChange={event => this.props.handleChange(event)}    
            />
          </label>
          <label>
            Zoom:
            <input 
                type="text" 
                name="zoom" 
                value={this.props.currentMap.zoom}
                onChange={event => this.props.handleChange(event)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  export default NewMapForm;