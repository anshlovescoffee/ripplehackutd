import React, { useRef, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './PlansPage.css';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const plans = [
  { id: 1,
    name: 'Fiber 500',
    speed: 500, 
    price: 29.99, 
    description: "Upload speeds 25x faster than cable Amazon Eero 6+ Router Included" 
  },

  { id: 2, name: 'Fiber 1 Gig', speed: 1000, price: 49.99 },
  { id: 3, name: 'Fiber 2 Gig', speed: 2000, price: 74.99 },
  { id: 4, name: 'Fiber 5 Gig', speed: 5000, price: 99.99 },
  { id: 5, name: 'Fiber 7 Gig', speed: 7000, price: 299.99 },
];

const PlansPage = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Initialize recommendedPlanId state
  const [recommendedPlanId, setRecommendedPlanId] = useState(() => {
    const storedValue = parseInt(sessionStorage.getItem('baseNumber'), 10);
    return storedValue || 1; // Fallback to 1 if no valid stored value
  });

  // Update the recommendedPlanId whenever the component mounts or sessionStorage changes
  useEffect(() => {
    const updateRecommendedPlanId = () => {
      const storedValue = parseInt(sessionStorage.getItem('baseNumber'), 10);
      if (storedValue && storedValue !== recommendedPlanId) {
        setRecommendedPlanId(storedValue);
      }
    };

    // Listen for changes in sessionStorage
    window.addEventListener('storage', updateRecommendedPlanId);

    // Initial check
    updateRecommendedPlanId();

    // Clean up the event listener on unmount
    return () => window.removeEventListener('storage', updateRecommendedPlanId);
  }, [recommendedPlanId]);

  const handleSelectPlan = (planId) => {
    console.log(`Selected Plan ID: ${planId}`);
    navigate('/page3');
  };

  // Bar graph data for speeds
  const speedData = {
    labels: plans.map((plan) => plan.name),
    datasets: [
      {
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
        data: plans.map((plan) => plan.price),
        backgroundColor: plans.map((plan) =>
          plan.id === recommendedPlanId ? '#daa617' : '#b02929'
        ),
      },
    ],
  };

  // Bar chart options to customize the legend
  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: (chart) => {
            return [
              {
                text: 'Recommended Plan',
                fillStyle: '#daa617',
                fontColor: '#ffffff',
                hidden: false,
                lineCap: 'butt',
                lineDash: [],
                lineDashOffset: 0,
                lineJoin: 'miter',
                strokeStyle: '#daa617',
                pointStyle: 'rect',
                rotation: 0,
              },
            ];
          },
        },
      },
    },
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
              <p>{plan.description1}</p>
              <p>{plan.description2}</p>
              <p>{plan.description3}</p>
              <button className="select-button" onClick={() => handleSelectPlan(plan.id)}>
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
      

      {/* Bar Graphs */}
      <div className="graphs-container">
        <div className="graph">
          <h2>Plan Speeds</h2>
          <Bar data={speedData} options={chartOptions} />
        </div>
        <div className="graph">
          <h2>Plan Prices</h2>
          <Bar data={priceData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
