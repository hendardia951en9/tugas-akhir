import React, { useCallback, useContext, useRef, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateStyle } from "../../../utils/generateStyle";
import Geocoder from "react-map-gl-geocoder";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./mapcomponent.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MapComponent = ({ componentKey, isEdit, itemTypes, props }) => {
  const MAPBOX_API = `${process.env.REACT_APP_MAPBOX_API}`;
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
      width={props.style.width.value + props.style.width.unit}
      height={props.style.height.value + props.style.height.unit}
    >
      <div
        style={{ width: "100%", height: "100%" }}
        className="map-component-click-container"
        onClick={
          isEdit
            ? (e) => {
                if (e.target === e.currentTarget) {
                  pageBuilderContext.handleClickPageBuilderComponent(
                    itemTypes,
                    componentKey
                  );
                }
              }
            : undefined
        }
      ></div>
      <Marker
        className="map-component-marker"
        draggable={true}
        latitude={marker.latitude}
        longitude={marker.longitude}
        offsetLeft={-6}
        offsetTop={-16}
        onDragEnd={
          isEdit
            ? (e) => {
                setMarker({ longitude: e.lngLat[0], latitude: e.lngLat[1] });
                pageBuilderContext.changeMapState(e.lngLat[1], e.lngLat[0]);
              }
            : undefined
        }
      >
        <FontAwesomeIcon icon={faMapMarkerAlt} />
      </Marker>
      {isEdit ? (
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
      ) : (
        ""
      )}
    </ReactMapGL>
  );
};

export default MapComponent;
