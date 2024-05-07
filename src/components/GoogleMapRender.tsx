import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface GoogleMapRenderProps {
  getMapData: (value: any) => void;
}

const GoogleMapRender: React.FC<GoogleMapRenderProps> = ({ getMapData }) => {
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [location, setLocation] = useState({ lng: 12.8797, lat: 121.774 });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAo94577VUS3xGDmHUm-ogK8ey1pjyn7kI",
  });

  useEffect(() => {
    const fetchGeocoder = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }

      function success(position: any) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ lng: longitude, lat: latitude });
      }

      if (isLoaded) {
        setGeocoder(new window.google.maps.Geocoder());
      }

      function error() {
        console.log("Unable to retrieve your location");
      }
    };

    fetchGeocoder();
  }, [isLoaded]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!geocoder || !e.latLng) return;

    const selectedLocation = e.latLng.toJSON();
    setLocation(selectedLocation);
    console.log(
      "selectedLocation:",
      selectedLocation.lng,
      selectedLocation.lat
    );

    const { lat, lng } = selectedLocation;
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK") {
        if (results) {
          const firstResult = results[0];
          console.log(firstResult);
          const province = firstResult.address_components.find(
            (component) =>
              component.types.includes("administrative_area_level_2") ||
              component.types.includes("administrative_area_level_1")
          );
          const sublocality = firstResult.address_components.find((component) =>
            component.types.includes("sublocality")
          );
          const city = firstResult.address_components.find((component) =>
            component.types.includes("locality")
          );
          const mapdata = {
            city: city?.long_name,
            province: province?.long_name,
            sublocality: sublocality?.short_name,
            lat: lat,
            long: lng,
          };
          getMapData(mapdata);
        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  };

  return isLoaded && geocoder ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={15}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        clickableIcons: false,
      }}
      onClick={handleMapClick}
    >
      <Marker position={location} />
    </GoogleMap>
  ) : null;
};

export default GoogleMapRender;
