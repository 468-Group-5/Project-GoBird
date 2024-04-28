import React, { useMemo, useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, OverlayView, Polyline } from "@react-google-maps/api";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDZ8FjkVMCNUp5N_78P69MFv-5Jnv7tbKk",
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
  const tempCenter = {lat: 39.95376750670629, lng: -75.59819191979922 }
  const [universityAveCoordinates, setUniversityAveCoordinates] = useState({lat: 39.95376750670629, lng: -75.59819191979922});
  const [churchStCoordinates, setChurchStCoordinates] = useState({lat: 39.95376750670629, lng: -75.59819191979922});

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  useEffect(() => {
    getLocation(setCenter);
  }, []);

  useEffect(() => {
    // Define the boundary rectangle
    const coordinates = [
      { lat: 39.95374540925277, lng: -75.59815293815461 },
      { lat: 39.95276811189676, lng: -75.60006050998334 }
      // Add more coordinates as needed to cover the street
    ];
    setUniversityAveCoordinates(coordinates);
  },[]);

  useEffect(() => {
    // Define the boundary rectangle
    const coordinates2 = [
      { lat: 39.954085003791526, lng: -75.6012709618475 },
      { lat: 39.95087056422614, lng: -75.59849117369313 }
      // Add more coordinates as needed to cover the street
    ];
    setChurchStCoordinates(coordinates2);
  },[]);


  if (!center) return <div>Loading...</div>;

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={{ width: "100%", height: "600px" }}
      zoom={18}
      center={center}
    >
      <Marker position={center}/>

      <Polyline
        path={universityAveCoordinates}
        options={{
          strokeColor: "#FF0000", // Red color for the polyline
          strokeOpacity: 1,
          strokeWeight: 5, // Adjust the thickness of the polyline
        }}
      />
      <Polyline
        path={churchStCoordinates}
        options={{
          strokeColor: "#00FF00", // Red color for the polyline
          strokeOpacity: 1,
          strokeWeight: 5, // Adjust the thickness of the polyline
        }}
      />
    </GoogleMap>
  );
}
