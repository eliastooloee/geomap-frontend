import React, { Component } from 'react';
import '../App.css';

class NewMapForm extends Component {

    handleSubmit = event => {
        event.preventDefault()
        this.props.newMap()
        // this.props.history.push("/mymaps")
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
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
                name = "latitude"
                value={this.props.currentMap.latitude}
                onChange={event => this.props.handleChange(event)}
            />
          </label>
          <label>
            Longitude:
            <input 
                type="text" 
                name="longitude" 
                value={this.props.currentMap.longitude}
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