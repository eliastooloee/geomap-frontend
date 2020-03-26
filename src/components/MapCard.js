import React from "react";
import { Link, withRouter } from "react-router-dom";

const MapCard = props => {
    const { map, selectMap } = props;

    return(
        <div 
        className="map-card" 
        onClick={() => {selectMap(map); 
            props.history.push("/map");}}>
            <h1> {map.name} </h1>
            <p> Map Center Latitude {map.latitude}°</p>
            <p> Map Center Longitude {map.longitude}°</p>
            <p> Zoom {map.zoom}</p>
            <p> Note: Longitude is positive only, numbers will be above 180° for locations in the Western hemisphere</p>
        </div>
    )
}
export default withRouter(MapCard);