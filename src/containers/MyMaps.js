import React, { Component } from 'react';
import MapCard from '../components/MapCard'

const MyMaps = props => {

     function renderMaps() {
        return props.myMaps.length > 0 ? props.myMaps.map(map => {
          return (
            <div key={map.id} item xs={2}>
              <MapCard map={map} key={map.id} handleClick={props.selectMap} />
            </div>
          )
        }): null
      }
    
    
      return (
        <div>
            {renderMaps()}
        </div>
      );
};

export default MyMaps;