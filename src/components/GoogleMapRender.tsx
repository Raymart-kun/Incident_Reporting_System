import React from "react";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "700px",
};

function GoogleMapRender() {
  const [location, setLocation] = useState({
    lng: 12.8797,
    lat: 121.774,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAo94577VUS3xGDmHUm-ogK8ey1pjyn7kI",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position: any) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ lng: longitude, lat: latitude });
      // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: location.lat, lng: location.lng }}
      zoom={15}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        clickableIcons: false,
      }}
      onClick={(e) => {
        if (e.latLng) {
          const selectedLocation = e.latLng.toJSON();
          setLocation({ lng: selectedLocation.lng, lat: selectedLocation.lat });
          console.log(
            "selectedLocation:",
            selectedLocation.lng,
            selectedLocation.lat
          );
        }
        // setSelectedLocation;
      }}
    >
      <Marker position={{ lat: location.lat, lng: location.lng }} />
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMapRender;
