import React, { useMemo, useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, OverlayView } from "@react-google-maps/api";

export default function Home() {
  const apiKey = process.env.API_KEY
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function getLocation(setCenter) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCenter({ lat, lng });
      },
      (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
          default:
            alert("An error occurred while getting user location.");
        }
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function Map() {
  const [center, setCenter] = useState(null);
  const overlayPosition = useMemo(() => ({ lat: 39.9524, lng: -75.5981 }), []);

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  useEffect(() => {
    getLocation(setCenter);
  }, []);

  if (!center) return <div>Loading...</div>;

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={{ width: "100%", height: "600px" }}
      zoom={18}
      center={center}
    >
      <Marker position={center} />
      <OverlayView
        position={overlayPosition}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <img
          src="green.png"
          alt="Overlay Image"
          style={{ width: "100px", height: "100px" }} // Adjust the size as needed
        />
      </OverlayView>
    </GoogleMap>
  );
}
