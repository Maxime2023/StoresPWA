import { useEffect, useRef, useState } from "react";
import React from 'react';
import ReactMapGL from "react-map-gl";
import './Map.css'

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude:    43.615512,
    longitude:    7.054762 ,
    width: "100vw",
    height: "100vh",
    zoom: 11
  });

  let coordinates = [
    [1, 2],
    [],
  ]


  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWF4aW1lMjAyMyIsImEiOiJja3BxbWc2eTMxNm00MzFwNHYxYXN1bndqIn0.wFkYhYsrYVHh8u3KO8lYLQ"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
      </ReactMapGL>
    </div>
  );
}

export default Map;
