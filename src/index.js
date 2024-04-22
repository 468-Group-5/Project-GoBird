import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import map components
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default function Home() {
  const apiKey = process.env.API_KEY
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "apiKey",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

// Functionality for the map (can be placed in App.js)
function Map() {
  const center = useMemo(() => ({ lat: 39.9524, lng: -75.5981 }), []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY", // Replace with your actual API key ***** THIS IS THE LAST PART.
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap zoom={18} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
