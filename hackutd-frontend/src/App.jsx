import React, { useState, useEffect } from 'react';
import './App.css';
import { LoadScript } from '@react-google-maps/api';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PlansPage from './PlansPage';
import AddressStep from './components/AddressStep.jsx';
import PeopleStep from './components/PeopleStep.jsx';
import UseCaseStep from './components/UseCaseStep.jsx';
import frontierImage from './assets/frontier.png'; // Import the image

const libraries = ['places'];

function App() {
  const [location, setLocation] = useState(() => {
    const savedLocation = sessionStorage.getItem('location');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });
  const [city, setCity] = useState(() => sessionStorage.getItem('city') || '');
  const [state, setState] = useState(() => sessionStorage.getItem('state') || '');
  const [peopleInHousehold, setPeopleInHousehold] = useState(() => sessionStorage.getItem('peopleInHousehold') || '');
  const [dailyUseCase, setDailyUseCase] = useState(() => sessionStorage.getItem('dailyUseCase') || '');

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="App">
        <img src={frontierImage} alt="Frontier" className="logo" /> {/* Use the image */}
        <Router>
          <Routes>
            <Route path="/" element={<AddressStep setLocation={setLocation} setCity={setCity} setState={setState} />} />
            <Route path="/people" element={<PeopleStep setPeopleInHousehold={setPeopleInHousehold} />} />
            <Route path="/usecase" element={<UseCaseStep setDailyUseCase={setDailyUseCase} />} />
            <Route path="/plans" element={<PlansPage />} />
          </Routes>
        </Router>
      </div>
    </LoadScript>
  );
}

export default App;