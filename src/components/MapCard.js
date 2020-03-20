import React from "react";

const MapCard = props => {
    const { map, selectMap } = props;

    return(
        <div className="map-card" onClick={() => selectMap(map)}>
            <h1> {map.name} </h1>
            <h1> {map.latitude}</h1>
            <h1> {map.longitude}</h1>
            <p> {map.zoom}</p>
        </div>
    )
}
export default MapCard;