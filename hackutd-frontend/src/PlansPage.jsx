import React, { useRef, useState, useEffect } from 'react';
import './PlansPage.css';

const plans = [
  { id: 1, name: 'Fiber 500', description: 'Description for Plan 1' },
  { id: 2, name: 'Fiber 1 Gig', description: 'Description for Plan 2' },
  { id: 3, name: 'Fiber 2 Gig', description: 'Description for Plan 3' },
  { id: 4, name: 'Fiber 5 Gig', description: 'Description for Plan 4' },
  { id: 5, name: 'Fiber 7 Gig', description: 'Description for Plan 5' },
];

const PlansPage = () => {
  const scrollContainerRef = useRef(null);
  const [recommendedPlanId, setRecommendedPlanId] = useState(1); // Set a fallback plan ID, e.g., 1

  useEffect(() => {
    // Example API call to get the recommended plan ID
    fetch('/api/recommended-plan')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.recommendedPlanId) {
          setRecommendedPlanId(data.recommendedPlanId); // Set the ID from the API
        }
      })
      .catch(() => {
        // Fallback value in case of error
        console.error('Failed to fetch recommended plan. Using fallback value.');
        setRecommendedPlanId(1); // Fallback to plan ID 1 if the API call fails
      });
  }, []);

  return (
    <div className="plans-container">
      <h1>Don’t wait for better internet.</h1>
      <div className="plans-wrapper" ref={scrollContainerRef}>
        <div className="plans-list">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan ${plan.id === recommendedPlanId ? 'recommended' : ''}`}
            >
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <button className="select-button">Select Plan</button>
            </div>
          ))}
        </div>
      </div>
      <div className="fade-overlay fade-left"></div>
      <div className="fade-overlay fade-right"></div>
    </div>
  );
};

export default PlansPage;
