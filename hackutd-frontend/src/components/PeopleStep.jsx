import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PeopleStep = ({ setPeopleInHousehold }) => {
  const navigate = useNavigate();
  const [peopleInHousehold, setPeopleInHouseholdState] = useState(() => {
    return sessionStorage.getItem('peopleInHousehold') || '';
  });

  useEffect(() => {
    sessionStorage.setItem('peopleInHousehold', peopleInHousehold);
  }, [peopleInHousehold]);

  const handlePeopleChange = (event) => {
    const value = event.target.value;
    if (value >= 0 && value <= 20) {
      setPeopleInHouseholdState(value);
      setPeopleInHousehold(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/usecase');
  };

  return (
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default PeopleStep;