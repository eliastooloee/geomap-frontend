import React, { Component } from 'react';
import MapCard from '../components/MapCard'

const MyMaps = props => {

     function renderMaps() {
        return props.myMaps.length > 0 ? props.myMaps.map(map => {
          return (
            <div key={map.id} >
              <MapCard map={map} key={map.id} selectMap={props.selectMap} />
            </div>
          )
        }): null
      }
    
    
      return (
        <div>
            Your Maps
            {renderMaps()}
        </div>
      );
};

export default MyMaps;