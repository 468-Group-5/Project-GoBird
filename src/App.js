
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
          <p>-------------------------------</p>
          <button>Learn More</button>
        </section>
        <section className="content">
          <h3>Our Services</h3>
          <p>GoBird is a cutting-edge mobile application designed to simplify and streamline the parking process around West Chester University. Our app provides real-time information on available and taken parking spaces, ensuring that you can spend less time searching for a spot and more time focusing on what matters to you.</p>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 My Website</p>
      </footer>
    </div>
  );
}

export default App;
