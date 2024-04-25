import RegisterForm from "@/components/forms/registerform";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
    <div className="h-svh w-full flex justify-center items-center">
      <Card className="w-svw sm:w-[400px]">
        <CardHeader className="font-bold text-primary text-3xl">
          SIGN UP
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default FileReport;
