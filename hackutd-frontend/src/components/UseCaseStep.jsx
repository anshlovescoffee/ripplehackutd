import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UseCaseStep = ({ setDailyUseCase }) => {
  const navigate = useNavigate();
  const [dailyUseCase, setDailyUseCaseState] = useState(() => {
    return sessionStorage.getItem('dailyUseCase') || '';
  });

  useEffect(() => {
    sessionStorage.setItem('dailyUseCase', dailyUseCase);
  }, [dailyUseCase]);

  const handleUseCaseChange = (event) => {
    setDailyUseCaseState(event.target.value);
    setDailyUseCase(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/plans');
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
};

export default UseCaseStep;