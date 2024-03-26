
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>My Website</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <section className="hero">
          <h2>Welcome!</h2>
          <p>GoBird is a cutting-edge mobile application designed to simplify and streamline the parking process around West Chester University. Our app provides real-time information on available and taken parking spaces, ensuring that you can spend less time searching for a spot and more time focusing on what matters to you.</p>
          <button>Learn More</button>
        </section>
        <section className="content">
          <h3>Our Services</h3>
          <p>Our team’s goal is to simplify parking on the West Chester University campus for students, faculty, and visitors by developing a web application that directs you to available parking spaces. GoBird is an attendance tracker for cars parked in West Chester University spaces; it will deliver real-time parking availability updates to the user in an easy-to-use interface. The user will have a clear image of what areas have availability, what areas do not, while using familiar mapping to get there.</p> 

          <p>As users enter a parking area, they will be logged in our system – as they leave, they will be logged out. Using data crowdsourced from each user we can offer near real-time updates to each user on where they can or cannot park while also displaying this information on the Google Maps interface the users are familiar with. </p>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 My Website</p>
      </footer>
    </div>
  );
}

export default App;
