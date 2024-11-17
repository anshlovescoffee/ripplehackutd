import React from 'react';
import './PlansPage.css'; // Optional CSS file for styling

const plans = [
  { id: 1, name: 'Plan 1', description: 'Description for Plan 1' },
  { id: 2, name: 'Plan 2', description: 'Description for Plan 2' },
  { id: 3, name: 'Plan 3', description: 'Description for Plan 3' },
  { id: 4, name: 'Plan 4', description: 'Description for Plan 4' },
  { id: 5, name: 'Plan 5', description: 'Description for Plan 5' },
];

const PlansPage = () => {
  // You will later set the recommendedPlanId based on your AI model
  const recommendedPlanId = 3; // For demonstration purposes

  return (
    <div className="plans-container">
      <h1>Recommended Plans</h1>
      <div className="plans-list">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`plan ${plan.id === recommendedPlanId ? 'highlight' : ''}`}
          >
            <h2>{plan.name}</h2>
            <p>{plan.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
