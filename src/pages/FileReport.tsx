import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect } from "react";

const FileReport = () => {
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }

  function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <div className="flex flex-col max_width">
      <div>
        <GoogleMap />
      </div>
    </div>
  );
};

export default FileReport;
