import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import GoogleMapRender from "../components/GoogleMapRender";

const FileReport = () => {
  const [location, setLocation] = useState({
    lng: 12.8797,
    lat: 121.774,
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

  return (
    <div className="flex flex-col max_width">
      <p className=" text-3xl font-black">File a Report</p>

      <div className=" w-full max-w-[800px] self-center shadow-lg bg-white p-5 rounded-lg">
        <form className="py-10">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col w-1/2 items-start">
              <p className=" font-semibold text-lg">Title</p>
              <input className="inputStyle w-full" placeholder="Title" />
            </div>

            <div className="flex flex-row w-1/2 items-start gap-5">
              <div className="flex flex-col items-start">
                <p className=" font-semibold text-lg">Date</p>
                <input
                  type="date"
                  className="inputStyle w-full"
                  placeholder="Date"
                />
              </div>

              <div className="flex flex-col  items-start">
                <p className=" font-semibold text-lg">Date</p>
                <input
                  type="time"
                  className="inputStyle w-full"
                  placeholder="Date"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-1/2 items-start">
            <p className=" font-semibold text-lg">Description</p>
            <textarea
              className="inputStyle w-full h-28 "
              placeholder="Description"
            />
          </div>
        </form>

        <GoogleMapRender />
      </div>
    </div>
  );
};

export default FileReport;
