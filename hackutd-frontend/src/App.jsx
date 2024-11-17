import React, { useState, useEffect } from 'react';
import './App.css';
import { LoadScript } from '@react-google-maps/api';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LocationSearchInput from './components/LocationSearchInput.jsx';
import PlansPage from './PlansPage';
import frontierImage from './assets/frontier.png';
import Page3 from './page3';

const libraries = ['places'];

function measureInternetSpeed() {
  // Function to measure download speed
  function measureDownloadSpeed() {
    return new Promise((resolve) => {
      const startTime = new Date().getTime();
      const downloadSize = 1024 * 1024 / 1.6; // 1 MB
      const image = new Image();

      // Using a valid image URL for speed testing
      image.src = `https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg?${startTime}`;

      image.onload = () => {
        const endTime = new Date().getTime();
        const duration = (endTime - startTime) / 1000; // Convert milliseconds to seconds
        const speedBps = (downloadSize / duration) * 8; // Bits per second
        const speedMbps = speedBps / (1024 * 1024); // Convert to Mbps
        resolve(speedMbps);
      };

      image.onerror = () => {
        resolve(null); // Resolve null on error
      };
    });
  }

  // Calculate and store download speed and base number
  measureDownloadSpeed().then((downloadSpeed) => {
    if (downloadSpeed) {
      sessionStorage.setItem('downloadSpeedMbps', downloadSpeed.toFixed(2));
      let baseNumber = 1;

      if (downloadSpeed >= 100 && downloadSpeed < 500) {
        baseNumber = 2;
      } else if (downloadSpeed >= 500 && downloadSpeed < 1000) {
        baseNumber = 3;
      } else if (downloadSpeed >= 1000 && downloadSpeed < 2000) {
        baseNumber = 4;
      } else if (downloadSpeed >= 2000) {
        baseNumber = 5;
      }

      sessionStorage.setItem('baseNumber', baseNumber);
    } else {
      console.error('Failed to measure internet speed.');
    }
  });
}

function FormComponent() {
  const [location, setLocation] = useState(() => {
    const savedLocation = sessionStorage.getItem('location');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });
  const [city, setCity] = useState(() => sessionStorage.getItem('city') || '');
  const [state, setState] = useState(() => sessionStorage.getItem('state') || '');
  const [peopleInHousehold, setPeopleInHousehold] = useState(() => sessionStorage.getItem('peopleInHousehold') || '');
  const [dailyUseCase, setDailyUseCase] = useState(() => sessionStorage.getItem('dailyUseCase') || '');
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    measureInternetSpeed(); // Measure and store speed on component mount
  }, []);

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

  const handleUseCaseSubmit = () => {
    if (dailyUseCase) {
      navigate('/plans');
    } else {
      alert('Please select your daily use case.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddressSubmit();
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="App">
        <img src={frontierImage} alt="Frontier" className="logo" />
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
                { num: 1, label: '1' },
                { num: 2, label: '2-3' },
                { num: 3, label: '4+' },
                { num: 4, label: '8+' },
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
