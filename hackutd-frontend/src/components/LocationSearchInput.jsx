// LocationSearchInput.jsx
import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const LocationSearchInput = ({ onPlaceSelected }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      onPlaceSelected(place);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        placeholder="Search for a location"
        className="input-box"
      />
    </Autocomplete>
  );
};

export default LocationSearchInput;