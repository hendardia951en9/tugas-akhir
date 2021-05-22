import React, { useRef, useState, useCallback, useContext } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateStyle } from "../../../utils/generateStyle";
import Geocoder from "react-map-gl-geocoder";

//css
import "./mapcomponent.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { PageBuilderContext } from "../../Pages/Pricing";

const MapComponent = ({ props }) => {
  const MAPBOX_API =
    "pk.eyJ1IjoiaGVuZHkwNiIsImEiOiJja293dTFsdjAwODg4MndyMXFmYWEzdzY1In0.jYPrMAP3Gvp14GEpt5eAbA";
  const [viewport, setViewport] = useState({
    latitude: props.location.latitude,
    longitude: props.location.longitude,
    zoom: props.zoom,
  });
  const [marker, setMarker] = useState({
    latitude: props.location.latitude,
    longitude: props.location.longitude,
    zoom: props.zoom,
  });
  const mapRef = useRef();

  const pageBuilderContext = useContext(PageBuilderContext);

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 500 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <ReactMapGL
      {...viewport}
      className="map-component"
      mapboxApiAccessToken={MAPBOX_API}
      onViewportChange={setViewport}
      ref={mapRef}
      style={generateStyle(props.style)}
      width="100%"
    >
      <div
        style={{ width: "100%", height: "100%" }}
        className="map-component-click-container"
        onClick={props.onClick}
      ></div>
      <Marker
        className="map-component-marker"
        draggable={true}
        latitude={marker.latitude}
        longitude={marker.longitude}
        offsetLeft={-6}
        offsetTop={-16}
        onDragEnd={(e) => {
          setMarker({ longitude: e.lngLat[0], latitude: e.lngLat[1] });
        }}
      >
        <FontAwesomeIcon icon={faMapMarkerAlt} />
      </Marker>
      <Geocoder
        mapboxApiAccessToken={MAPBOX_API}
        mapRef={mapRef}
        marker={true}
        onResult={(e) => {
          setMarker({
            longitude: e.result.center[0],
            latitude: e.result.center[1],
          });
          pageBuilderContext.changeMapState(
            e.result.center[1],
            e.result.center[0]
          );
        }}
        onViewportChange={handleGeocoderViewportChange}
        position="top-left"
      />
    </ReactMapGL>
  );
};

export default MapComponent;
