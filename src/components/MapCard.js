import React from "react";

const MapCard = props => {
    const { map, selectMap } = props;

    return(
        <div className="map-card">
            <h1> {map.name} </h1>
            <p> {map.lat}</p>
            <p> {map.long}</p>
            <p> {map.zoom}</p>
        </div>
    )
}
export default MapCard;