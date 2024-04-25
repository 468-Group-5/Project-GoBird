import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Map from './api.js'; // Assuming your map component is imported here
import axios from 'axios';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Go Bird</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/location">Choose Your Spot</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="main">
          <Routes>
            {/* Define routes for different pages */}
            <Route path="/" element={<Home />} />  {/* Replace Home with your home component */}
            <Route path="/about" element={<About />} />  {/* Replace About with your about component */}
            <Route path="/contact" element={<Contact />} />  {/* Replace Contact with your contact component */}
            <Route path="/location" element={<Location />} /> {/* New route for Location */}
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2024 Go Bird</p>
        </footer>
        </div>
    </Router>
  );
}

export default App;

function Home() {
  return (
    <section className="hero">
      <h2>Welcome!</h2>
      <p>GoBird is a cutting-edge mobile application designed to simplify and streamline the parking process around 
         West Chester University. Our app provides real-time information on available and taken parking spaces, ensuring that 
         you can spend less time searching for a spot and more time focusing on what matters to you.</p>
      <p>As users enter a parking area, they will be logged in our system – as they leave, they will be logged out. Using data crowdsourced from each user we can offer near real-time updates to each user on where they can or cannot park while also displaying this information on the Google Maps interface the users are familiar with. </p>
      <h3>Choose your spot now!</h3>
        <div className="location-button-container">
        <Link to="/location" className="location-button">Choose your parking spot</Link>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="content">
      <h2>About Us</h2>
      <p>Our team’s goal is to simplify parking on the West Chester University campus for students, faculty, and visitors by developing a web application that directs you to available parking spaces. GoBird is an attendance tracker for cars parked in West Chester University spaces; it will deliver real-time parking availability updates to the user in an easy-to-use interface. The user will have a clear image of what areas have availability, what areas do not, while using familiar mapping to get there.</p> 
      <p>As users enter a parking area, they will be logged in our system – as they leave, they will be logged out. Using data crowdsourced from each user we can offer near real-time updates to each user on where they can or cannot park while also displaying this information on the Google Maps interface the users are familiar with. </p>
    </section>
  );
}

function Contact() {
  return (
    <section className="content">
      <h2>Contact Us</h2>
      <p>Justin Linwood - justin.linwood@verizon.net</p>
      <p>Lieu Phung - lieunphung@gmail.com</p>
      <p>Chaughn Robin - chaughnr@outlook</p>
      <p>Cole Snyder - 20snyderc@gmail.com</p>
    </section>
  );
}
/*
//this is the version of Location that does not involve the back end.
function Location() {
  const [parkingSpace, setParkingSpace] = useState('');
  const [timeEntered, setTimeEntered] = useState('');
  const [timeLeaving, setTimeLeaving] = useState('');

  const handleParkingSpaceChange = (event) => {
    setParkingSpace(event.target.value);
  };

  const handleTimeEnteredChange = () => {
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTimeEntered(formattedTime);
  };

  const handleTimeLeavingChange = (event) => {
    setTimeLeaving(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Implement logic to submit data (e.g., send to server using API)
    console.log('Parking Space:', parkingSpace);
    console.log('Time Entered:', timeEntered);
    console.log('Time Leaving (estimated):', timeLeaving);
    // Clear form after submission (optional)
    setParkingSpace('');
    setTimeLeaving('');
  };

  useEffect(() => {
    handleTimeEnteredChange(); // Set initial time entered on component mount
  }, []);

  return (
    <section className="map-container">
      <h2>Your Location</h2>
      <Map />
      <form onSubmit={handleSubmit}>
        <label htmlFor="parkingSpace">Parking Space Number:</label>
        <input
          type="text"
          id="parkingSpace"
          value={parkingSpace}
          onChange={handleParkingSpaceChange}
        />
        <label htmlFor="timeEntered">Time Entered:</label>
        <input
          type="text" // Change to text for displaying formatted time
          id="timeEntered"
          value={timeEntered}
          disabled // Disable editing since it's auto-populated
        />
        <label htmlFor="timeLeaving">Time Leaving (estimated):</label>
        <input
          type="text" // Change to text for displaying formatted time
          id="timeLeaving"
          value={timeLeaving}
          onChange={handleTimeLeavingChange}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
*/
//This is the location with the backend work.
function Location() {
  const [parkingSpace, setParkingSpace] = useState('');
  const [timeEntered, setTimeEntered] = useState('');
  const [timeLeaving, setTimeLeaving] = useState('');
  const [parkingData, setParkingData] = useState([]); // State to store fetched parking data

  const handleParkingSpaceChange = (event) => {
    setParkingSpace(event.target.value);
  };

  const handleTimeEnteredChange = () => {
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTimeEntered(formattedTime);
  };

  const handleTimeLeavingChange = (event) => {
    setTimeLeaving(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://10.42.4.25:80/receiveData', { //Backend URL, have to change when IP changes
        parkingSpace,
        timeEntered,
        timeLeaving,
      });
      console.log('Server response:', response.data);
      // Clear form after successful submission -- SO IF ITS NOT A SUCCESS IT DOES NOT CLEAR
      setParkingSpace('');
      setTimeLeaving('');
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle submission error (optional)
    }
  };

  useEffect(() => {
    handleTimeEnteredChange(); // Set initial time entered on component mount
    const fetchData = async () => {
      const response = await axios.get('http://10.42.4.25:80/customers'); //Backend URL, have to change when IP changes
      setParkingData(response.data);
    };

    fetchData();
  }, []); // Fetch data on component mount

  return (
    <section className="map-container">
      <h2>Your Location</h2>
      <Map /> {/* Assuming your Map component is rendered here */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="parkingSpace">Parking Space Number:</label>
        <input
          type="text"
          id="parkingSpace"
          value={parkingSpace}
          onChange={handleParkingSpaceChange}
        />
        <label htmlFor="timeEntered">Time Entered:</label>
        <input
          type="text" // Change to text for displaying formatted time
          id="timeEntered"
          value={timeEntered}
          disabled // Disable editing since it's auto-populated
        />
        <label htmlFor="timeLeaving">Time Leaving (estimated):</label>
        <input
          type="text" // Change to text for displaying formatted time (optional)
          id="timeLeaving"
          value={timeLeaving}
          onChange={handleTimeLeavingChange}
        />
        <button type="submit">Submit</button>
      </form>

      {/* Parking Space Table */}
      {parkingData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Parking Space</th>
              <th>Estimated Leaving Time</th>
            </tr>
          </thead>
          <tbody>
            {parkingData.map((item) => (
              <tr key={item.id}> {/* Add a unique key for each row */}
                <td>{item.parkingSpace}</td>
                <td>{item.timeLeaving}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
