import React from 'react';
import './PlansPage.css'; 

const plans = [
  { id: 1, name: 'Fiber 500', description: 'Description for Plan 1' },
  { id: 2, name: 'Fiber 1 Gig', description: 'Description for Plan 2' },
  { id: 3, name: 'Fiber 2 Gig', description: 'Description for Plan 3' },
  { id: 4, name: 'Fiber 5 Gig', description: 'Description for Plan 4' },
  { id: 5, name: 'Fiber 7 Gig', description: 'Description for Plan 5' },
];

const PlansPage = () => {
  const recommendedPlanId = 3; 

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
            <button className="select-button">Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
