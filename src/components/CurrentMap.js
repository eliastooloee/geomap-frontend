import React, { Component } from "react";
import {
  Map as LeafletMap,
  TileLayer,
  Circle,
  Rectangle,
  Marker,
  CircleMarker,
  Polyline,
  Polygon,
  Element
} from 'react-leaflet'
import  EditControlFeatureGroup from './FeatureGroup';
// import GeoJsonCluster from 'react-leaflet-geojson-cluster';
import L from 'leaflet';
import "../App.css";


const controlSettings = {
  draw: {
    // rectangle: false,
    // marker: false,
    // circle: false,
    // circlemarker: false,
    polygon: {
      allowIntersection: false,
      drawError: {
        color: '#E1E100',
        message: '<strong>Wups</strong> shapes cannot intersect'
      }
    }
    // polyline: false
  },
  edit: {
    edit: {
      // NB: edit has a nested edit!
      selectedPathOptions: {
        maintainColor: true,
        fillOpacity: 0.5
        // fillColor: nullm
      }
    },
    poly: {
      allowIntersection: false,
      drawError: {
        color: 'fuchsia',
        message: '<strong>Wups</strong> shapes cannot intersect'
      }
    }
  },
  position: 'topright'
}

class CurrentMap extends Component {

  constructor (props) {
    super(props)

    const elementsById = new Map()

    // for(let i = 0, l = this.props.currentMap.mapFeatures.length; i < l; i++)

    for(let i = 0, l = this.props.currentMap.mapFeatures.length; i < l; i++) {
      let geotype = 'polygon'
      this.props.currentMap.mapFeatures[i].geometry.type===undefined? geotype = this.props.currentMap.mapFeatures[i].geometry.type.toLowerCase() : geotype = 'polygon'
      console.log('in current map constructor', this.props.currentMap.mapFeatures[i].geometry.type.toString());
      elementsById.set(i, {
        type: `${geotype}`,
        positions: this.props.currentMap.mapFeatures[i].geometry.coordinates[0]
      })
    }

    // for(let i = 0, l = this.props.currentMap.mapFeatures.length; i < l; i++) {
    //   elementsById.set(i, {
    //     type: this.props.currentMap.mapFeatures[i].geometry.type,
    //     positions: this.props.currentMap.mapFeatures[i].geometry.coordinates
    //   })
    // }
    // elementsById.set(1, {
    //   type: 'polygon',
    //   positions: [[51.51, -0.1], [51.5, -0.06], [51.52, -0.03]]
    // })
    // elementsById.set(2, {
    //   type: 'polyline',
    //   positions: [[51.5, -0.04], [51.49, -0.02], [51.51, 0], [51.52, -0.02]]
    // })
    // elementsById.set(3, {
    //   type: 'circlemarker',
    //   center: [51.5, -0.08],
    //   radius: 10
    // })
    // elementsById.set(4, { type: 'marker', position: [51.5, -0.07] })
    // elementsById.set(5, { type: 'circle', center: [51.5, -0.05], radius: 600 })
    // elementsById.set(6, {
    //   type: 'rectangle',
    //   bounds: [[51.49, -0.1], [51.48, -0.06]]
    // })
    this.state = { elementsById }
  }


  // componentDidMount() {
  //  
  // }


  _getHighestId = () => {
    // Include 0 to make sure we always have a valid id
    return Math.max(0, ...this.state.elementsById.keys())
  }

  _handleCreated = evt => {
    const { layerType, layer } = evt
    console.log(layer);
    console.log(layerType);
    let shape = layer.toGeoJSON();
    let shape_to_db = JSON.stringify(shape);
    console.log(shape);
    console.log(shape_to_db);
    if (layerType === 'polyline') {
      alert('I DO NOT ADD POLYLINE')
      return
    }


    const newMap = new Map(this.state.elementsById.entries())
    const newId = this._getHighestId() + 1
    const props = {
      polygon: l => ({ positions: l.getLatLngs()[0] }),
      circlemarker: l => ({ center: l.getLatLng(), radius: l.getRadius() }),
      marker: l => ({ position: l.getLatLng() }),
      circle: l => ({ center: l.getLatLng(), radius: l.getRadius() }),
      rectangle: l => ({ bounds: l.getBounds() })
    }[layerType](layer)

    newMap.set(newId, { type: layerType, ...props })

    this.setState({ elementsById: newMap })

    this.newFeature(shape);

  let testFeature = this.props.currentMap.mapFeatures[0];

  // let geoson = L.geoJSON(testFeature)
    
  }

  _handleExisting = evt => {
    const { layerType, layer } = evt
    console.log(layer);
    console.log(layerType);
    let shape = layer.toGeoJSON();
    let shape_to_db = JSON.stringify(shape);
    console.log(shape);
    console.log(shape_to_db);
    if (layerType === 'polyline') {
      alert('I DO NOT ADD POLYLINE')
      return
    }


    const newMap = new Map(this.state.elementsById.entries())
    const newId = this._getHighestId() + 1
    const props = {
      polygon: l => ({ positions: l.getLatLngs()[0] }),
      circlemarker: l => ({ center: l.getLatLng(), radius: l.getRadius() }),
      marker: l => ({ position: l.getLatLng() }),
      circle: l => ({ center: l.getLatLng(), radius: l.getRadius() }),
      rectangle: l => ({ bounds: l.getBounds() })
    }[layerType](layer)

    newMap.set(newId, { type: layerType, ...props })

    this.setState({ elementsById: newMap })

    this.newFeature(shape);

  let testFeature = this.props.currentMap.mapFeatures[0];

  // let geoson = L.geoJSON(testFeature)
    
  }


  newFeature = (shape) => {
    fetch("http://localhost:3000/api/v1/features", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        feature: {
        "map_id": parseFloat(this.props.currentMap.id),
        "feature_data": JSON.stringify(shape)
        }
      })
    })
  }
  // persistFeature(shape) {
  //   return fetch(API_URL, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify(shape)
  //   }).then(res => res.json());
  // }

  _handleEdited = (elem, layer, evt) => {
    const id = Number.parseInt(elem.key)
    const item = this.state.elementsById.get(id)
    if (!item) {
      console.log('No matching item, perhaps a race? skip')
      return
    }

    const layerType = item.type
    const newMap = new Map(this.state.elementsById.entries())
    const newId = this._getHighestId() + 1
    const newProps = {
      polygon: l => ({ positions: l.getLatLngs() }),
      polyline: l => ({ positions: l.getLatLngs() }),
      circlemarker: l => ({ center: l.getLatLng(), radius: l.getRadius() }),
      marker: l => ({ position: l.getLatLng() }),
      circle: l => ({ center: l.getLatLng(), radius: l.getRadius() }),
      rectangle: l => null // copy existing item
    }[layerType](layer)

    if (item.type === 'rectangle') {
      alert('I DO NOT EDIT RECTANGLES!')
      // To ensure the underlying leaflet draw state remains in sync, change the id of this element
      newMap.set(newId, newMap.get(id))
    } else {
      newMap.set(newId, { type: layerType, ...newProps })
    }

    newMap.delete(id)
    this.setState({ elementsById: newMap })
  }

  _handleDeleted = (elem, layer, evt) => {
    const id = Number.parseInt(elem.key)
    const item = this.state.elementsById.get(id)
    if (!item) {
      console.log('No matching item, perhaps a race? skip')
      return
    }

    const newMap = new Map(this.state.elementsById.entries())

    if (item.type.indexOf('marker') !== -1) {
      alert('I DO NOT DELETE MARKERS!')
      // To ensure the underlying leaflet draw state remains in sync, change the id of this element
      const newId = this._getHighestId() + 1
      newMap.set(newId, newMap.get(id))
    }

    newMap.delete(id)
    this.setState({ elementsById: newMap })
  }

  _handleActivityStarted = e => {
    console.log('started', e)
    const { flagStartedEditing } = this.props
    if (flagStartedEditing) {
      flagStartedEditing()
    }
  }
  _handleActivityStopped = e => {
    console.log('stopped', e)
    const { flagStoppedEditing } = this.props
    if (flagStoppedEditing) {
      flagStoppedEditing()
    }
  }


//   onEdited={e => {
//     e.layers.eachLayer(a => {
//         this.props.updatePlot({
//             id: id,
//             feature: a.toGeoJSON()
//         });
//     });
// }}


    
  render () {
    return (
      <LeafletMap center={[this.props.currentMap.latitude, this.props.currentMap.longitude]} zoom={this.props.currentMap.zoom}>
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* <GeoJsonCluster data={this.props.currentMap.mapFeatures} /> */}
       <EditControlFeatureGroup
          controlProps={controlSettings}
          onCreated={this._handleCreated}
          onEdited={this._handleEdited}
          onDeleted={this._handleDeleted}
          onActivityStarted={this._handleActivityStarted}
          onActivityStopped={this._handleActivityStopped}
        >
          {[...this.state.elementsById.keys()].map(id => {
            const { type, ...props } = this.state.elementsById.get(id)
            const Element = {
              polygon: Polygon,
              polyline: Polyline,
              circlemarker: CircleMarker,
              marker: Marker,
              circle: Circle,
              rectangle: Rectangle
            }[type]
            return <Element key={id} {...props} />
          })}
        </EditControlFeatureGroup>
      </LeafletMap>
    );
  }
}
export default CurrentMap;