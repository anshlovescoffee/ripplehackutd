import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationSearchInput from './LocationSearchInput.jsx';

const AddressStep = ({ setLocation, setCity, setState }) => {
  const navigate = useNavigate();
  const [location, setLocationState] = useState(() => {
    const savedLocation = sessionStorage.getItem('location');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });

  useEffect(() => {
    sessionStorage.setItem('location', JSON.stringify(location));
  }, [location]);

  const handlePlaceSelected = (place) => {
    setLocationState(place);
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
      navigate('/people');
    } else {
      alert('Please select an address.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddressSubmit();
    }
  };

  return (
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
  );
};

export default AddressStep;