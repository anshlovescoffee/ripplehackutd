import React, { useRef, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './PlansPage.css';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const plans = [
  { id: 1, name: 'Fiber 500', speed: 500, price: 29.99, description: "Upload speeds 25x faster than cable\n Amazon Eero 6+ Router Included" },
  { id: 2, name: 'Fiber 1 Gig', speed: 1000, price: 49.99 },
  { id: 3, name: 'Fiber 2 Gig', speed: 2000, price: 74.99 },
  { id: 4, name: 'Fiber 5 Gig', speed: 5000, price: 99.99 },
  { id: 5, name: 'Fiber 7 Gig', speed: 7000, price: 299.99 },
];

const PlansPage = () => {
  const scrollContainerRef = useRef(null);
  const [recommendedPlanId, setRecommendedPlanId] = useState(2); // Set a fallback plan ID, e.g., 1

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
        setRecommendedPlanId(2); // Fallback to plan ID 1 if the API call fails
      });
  }, []);

  // Bar graph data for speeds
  const speedData = {
    labels: plans.map((plan) => plan.name),
    datasets: [
      {
        label: 'Recommended Plan',
        data: plans.map((plan) => plan.speed),
        backgroundColor: plans.map((plan) =>
          plan.id === recommendedPlanId ? '#daa617' : '#b02929'
        ),
      },
    ],
  };

  // Bar graph data for prices
  const priceData = {
    labels: plans.map((plan) => plan.name),
    datasets: [
      {
        label: 'Recommended Plan',
        data: plans.map((plan) => plan.price),
        backgroundColor: plans.map((plan) =>
          plan.id === recommendedPlanId ? '#daa617' : '#b02929'
        ),
      },
    ],
  };

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

      {/* Bar Graphs */}
      <div className="graphs-container">
        <div className="graph">
          <h2>Plan Speeds</h2>
          <Bar data={speedData} />
        </div>
        <div className="graph">
          <h2>Plan Prices</h2>
          <Bar data={priceData} />
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
