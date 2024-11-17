import React, { useState, useEffect } from 'react';
import './App.css';
import { LoadScript } from '@react-google-maps/api';
import LocationSearchInput from './components/LocationSearchInput.jsx';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PlansPage from './PlansPage';
import frontierImage from './assets/frontier.png'; // Import the image

const libraries = ['places'];

function FormComponent() {
  const [location, setLocation] = useState(() => {
    const savedLocation = sessionStorage.getItem('location');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });
  const [city, setCity] = useState(() => sessionStorage.getItem('city') || '');
  const [state, setState] = useState(() => sessionStorage.getItem('state') || '');
  const [peopleInHousehold, setPeopleInHousehold] = useState(() => sessionStorage.getItem('peopleInHousehold') || '');
  const [dailyUseCase, setDailyUseCase] = useState(() => sessionStorage.getItem('dailyUseCase') || '');
  const [step, setStep] = useState(1); // 1 for address entry, 2 for the rest of the form

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('location', JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    sessionStorage.setItem('city', city);
  }, [city]);

  useEffect(() => {
    sessionStorage.setItem('state', state);
  }, [state]);

  useEffect(() => {
    sessionStorage.setItem('peopleInHousehold', peopleInHousehold);
  }, [peopleInHousehold]);

  useEffect(() => {
    sessionStorage.setItem('dailyUseCase', dailyUseCase);
  }, [dailyUseCase]);

  const handlePlaceSelected = (place) => {
    setLocation(place);
    const addressComponents = place.address_components;
    const cityComponent = addressComponents.find((component) => component.types.includes('locality'));
    const stateComponent = addressComponents.find((component) =>
      component.types.includes('administrative_area_level_1')
    );
    const city = cityComponent ? cityComponent.long_name : '';
    const state = stateComponent ? stateComponent.short_name : '';
    console.log('Selected place:', city, state);
    setCity(city);
    setState(state);
    console.log('Selected place:', place);
  };

  const handleAddressSubmit = () => {
    if (location) {
      setStep(2);
    } else {
      alert('Please select an address.');
    }
  };

  const handlePeopleChange = (event) => {
    const value = event.target.value;
    if (value >= 0 && value <= 20) {
      setPeopleInHousehold(value);
    }
  };

  const handleUseCaseChange = (event) => {
    setDailyUseCase(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/plans'); // Navigate to the PlansPage after form submission
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddressSubmit();
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="App">
        <img src={frontierImage} alt="Frontier" className="logo" /> {/* Use the image */}
        {step === 1 ? (
          <div className="address-step">
            <h1 className="address-prompt">Find the plan that's right for you</h1>
            <h2>Let's look at plans available at your home</h2>
            <div className="input-container" onKeyPress={handleKeyPress}>
              <LocationSearchInput onPlaceSelected={handlePlaceSelected} />
              <button className="arrow-submit-button" onClick={handleAddressSubmit}>
                →
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                People in Household:
                <input
                  type="number"
                  value={peopleInHousehold}
                  onChange={handlePeopleChange}
                  placeholder="Enter number of people"
                  min="0"
                  max="20"
                  className="input-box"
                />
              </label>
            </div>
            <div>
              <label>
                Daily Use Case:
                <select value={dailyUseCase} onChange={handleUseCaseChange} className="select-box">
                  <option value="">Select a use case</option>
                  <option value="Work">Work</option>
                  <option value="School">School</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Exercise">Exercise</option>
                  <option value="Leisure">Leisure</option>
                </select>
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </LoadScript>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/plans" element={<PlansPage />} />
      </Routes>
    </Router>
  );
}

export default App;