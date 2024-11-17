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
    description1: "Upload speeds 25x faster than cable",
    description2: "Amazon Eero 6+ Router Included",
    description3: "Supports in a few and a few devices at the same time",

  },

  { id: 2, 
    name: 
    'Fiber 1 Gig', 
    speed: 1000, 
    price: 49.99,
    description1: "Upload speeds 25x faster than cable",
    description2: "Amazon Eero Pro 6 Router Included",
    description3: "For Smarthomes with dozens of devices",
  },
  { id: 3, 
    name: 'Fiber 2 Gig', 
    speed: 2000, 
    price: 74.99,
    description1: "Upload speeds 50x faster than cable",
    description2: "Amazon Eero Pro 6E Router Included",
    description3: "Ultra fast speeds for large smart phones",
    
  },
  { id: 4, 
    name: 'Fiber 5 Gig', 
    speed: 5000, 
    price: 99.99,
    description1: "Upload speeds 125x faster than cable",
    description2: "Amazon Eero Max 7 Router Included",
    description3: "Fastest WiFi technology, available with WiFi 7",
  },
  { id: 5, 
    name: 'Fiber 7 Gig', 
    speed: 7000, 
    price: 299.99, 
    description1: "Upload speeds 200x faster than cable",
    description2: "2Amazon Eero Max 7 devices Included",
    description3: "Fastest WiFi technology, available with WiFi 7",
  },
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
              <h3>{plan.price}</h3>
              <p>{plan.description1}</p>
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
