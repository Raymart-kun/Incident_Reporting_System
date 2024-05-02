import React from "react";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "700px",
};

interface GoogleMapRenderProps {
  getMapData: (value: any) => void;
}

function GoogleMapRender({ getMapData }: GoogleMapRenderProps) {
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
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
      console.log("current location");
    }

    if (isLoaded) {
      setGeocoder(new window.google.maps.Geocoder());
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  }, []);

  function handleMapClick(e: google.maps.MapMouseEvent) {
    if (e.latLng) {
      const selectedLocation = e.latLng.toJSON();
      setLocation({ lng: selectedLocation.lng, lat: selectedLocation.lat });
      console.log(
        "selectedLocation:",
        selectedLocation.lng,
        selectedLocation.lat
      );
      let lat = selectedLocation.lat;
      let lng = selectedLocation.lng;
      if (geocoder) {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK") {
            if (results) {
              const firstResult = results[0];
              console.log(firstResult);
              const province = firstResult.address_components.find(
                (component) =>
                  component.types.includes("administrative_area_level_1")
              );
              const sublocality = firstResult.address_components.find(
                (component) => component.types.includes("sublocality")
              );
              const city = firstResult.address_components.find((component) =>
                component.types.includes("locality")
              );
              const mapdata = {
                city: city?.long_name,
                province: province?.long_name,
                sublocality: sublocality?.long_name,
              };
              getMapData(mapdata);
            } else {
              console.log("No results found");
            }
          } else {
            console.log("Geocoder failed due to: " + status);
          }
        });
      }
    }
  }

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
        handleMapClick(e);
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
