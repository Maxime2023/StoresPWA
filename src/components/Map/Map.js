import { useEffect, useRef, useState } from "react";
import React from 'react';
import ReactMapGL from "react-map-gl";
import './Map.scss'

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
        mapboxApiAccessToken='pk.eyJ1IjoiYnBhY2h1Y2EiLCJhIjoiY2lxbGNwaXdmMDAweGZxbmg5OGx2YWo5aSJ9.zda7KLJF3TH84UU6OhW16w'
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
