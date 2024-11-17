import React, { useState, useEffect } from 'react';
import './App.css';
import { LoadScript } from '@react-google-maps/api';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LocationSearchInput from './components/LocationSearchInput.jsx';
import PlansPage from './PlansPage';
import frontierImage from './assets/frontier.png'; // Import the image
import Page3 from './page3'; // Adjust the path if necessary
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
  const [step, setStep] = useState(1); // 1 for address entry, 2 for people entry, 3 for use case entry

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
    setCity(city);
    setState(state);
  };

  const handleAddressSubmit = () => {
    if (location) {
      setStep(2);
    } else {
      alert('Please select an address.');
    }
  };

  const handlePeopleSubmit = () => {
    if (peopleInHousehold) {
      setStep(3);
    } else {
      alert('Please enter the number of people in the household.');
    }
  };

  const handleUseCaseChange = (event) => {
    setDailyUseCase(event.target.value);
  };

  const handleUseCaseSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      address: location ? location.formatted_address : '',
      peopleInHousehold: parseInt(peopleInHousehold, 10),
      dailyUseCase,
    };

    console.log('Sending data to API:', requestData);
    fetch('/api/urmom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API response:', data);
        navigate('/plans');
      })
      .catch((error) => {
        console.error('Error calling the API:', error);
      });
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
        {step === 1 && (
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
        )}
{step === 2 && (
  <div className="people-step">
<h1 className="address-prompt">How many people live with you?</h1>
<div className="tiles-container">
  {[
    { num: 1, label: 'Just Me' },
    { num: 2, label: 'Me and Another Person' },
    { num: 3, label: 'Three People' },
    { num: 4, label: 'Four or More People' }
  ].map(({ num, label }) => (
    <div
      key={num}
      className={`tile ${peopleInHousehold === num.toString() ? 'selected' : ''}`}
      onClick={() => setPeopleInHousehold(num.toString())}
    >
      <h3>{label}</h3>
    </div>
  ))}
</div>
    <button className="submit-button" onClick={handlePeopleSubmit}>
      Next
    </button>
  </div>
)}
{step === 3 && (
  <div className="use-case-step">
    <h1 className="address-prompt">Select your daily use case</h1>
    <div className="tiles-container">
      {['Work', 'School', 'Gaming', 'Leisure'].map((useCase) => (
        <div
          key={useCase}
          className={`tile ${dailyUseCase === useCase ? 'selected' : ''}`}
          onClick={() => setDailyUseCase(useCase)}
        >
          <h3>{useCase}</h3>
        </div>
      ))}
    </div>
    <button className="submit-button" onClick={handleUseCaseSubmit}>
      Submit
    </button>
  </div>
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
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    </Router>
  );
}

export default App;
