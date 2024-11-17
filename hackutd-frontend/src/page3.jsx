import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './page3.css';

const Page3 = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [addOns, setAddOns] = useState({
    additionalExtender: false,
    wholeHomeWifi: false,
    unbreakableWifi: false,
    wifiSecurity: false,
    wifiSecurityPlus: false,
    totalShield: false,
    myPremiumTechPro: false,
    identityProtection: false,
    youtubeTV: false,
  });

  const addOnDetails = [
    {
      name: "ADDITIONAL EXTENDER",
      description: "Additional extender for above products.",
      price: "$5/mo",
    },
    {
      name: "WHOLE-HOME WI-FI",
      description: "Get the latest generation router with up to two additional extenders provided to Fiber 2 Gig speeds and below and 1 extender for 5 and 7 Gig to get a consistently strong Wi-Fi signal throughout the home.",
      price: "$10.00/mo",
    },
    {
      name: "UNBREAKABLE WI-FI",
      description: "Unbreakable Wi-Fi is an add-on service for Frontier Fiber Internet customers providing a backup internet during unexpected Frontier fiber network outages.",
      price: "$25.00/mo",
    },
    {
      name: "BATTERY BACK-UP FOR UNBREAKABLE WI-FI",
      description: "Optional Battery Backup Unit (power pack) offers up to 4 hours of power during outages.",
      price: "$130.00 one-time",
    },
    {
      name: "WI-FI SECURITY",
      description: "Advanced security managed via the app. Protects devices connected on the home network from malicious sites, scams, and phishing.",
      price: "$5.00/mo",
    },
    {
      name: "WI-FI SECURITY PLUS",
      description: "Includes Wi-Fi Security, Multi-Device Security, VPN* & Password Manager.",
      price: "$10.00/mo",
    },
    {
      name: "TOTAL SHIELD",
      description: "Security (anti-virus) for up to 10 devices, including mobile devices.",
      price: "$10.00/mo",
    },
    {
      name: "MY PREMIUM TECH PRO",
      description: "Premium Tech Support.",
      price: "$10.00/mo",
    },
    {
      name: "IDENTITY PROTECTION",
      description: "Includes personal information monitoring to help keep your sensitive data from becoming public.",
      price: "$10.00/mo",
    },
    {
      name: "YOUTUBE TV",
      description: "100+ live channels.",
      price: "$79.99/mo",
    },
  ];

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setAddOns((prevAddOns) => ({
      ...prevAddOns,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleMouseMove = (event) => {
      const { clientX } = event;
      const { left, right } = scrollContainer.getBoundingClientRect();
      const scrollAmount = 10; // Amount to scroll

      // Increase the trigger area for scrolling
      const triggerArea = 50; // Increased trigger area

      // Scroll right if mouse is at the right edge of the container
      if (clientX > right - triggerArea) {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
      // Scroll left if mouse is at the left edge of the container
      else if (clientX < left + triggerArea) {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    };

    scrollContainer.addEventListener('mousemove', handleMouseMove);
    return () => {
      scrollContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Check if any add-ons are selected
  const isAnyAddOnSelected = Object.values(addOns).some((value) => value);

  return (
    <div className="page3-container">
      <h1>Select Your Add-Ons</h1>
      <div className="add-ons-wrapper" ref={scrollContainerRef}>
        <div className="plans-list">
          {addOnDetails.map((addOn, index) => (
            <div className={`plan ${addOns[addOn.name.replace(/\s+/g, '').toLowerCase()] ? 'selected' : ''}`} key={index}>
              <input
                type="checkbox"
                className="checkbox-input"
                name={addOn.name.replace(/\s+/g, '').toLowerCase()}
                id={addOn.name}
                checked={addOns[addOn.name.replace(/\s+/g, '').toLowerCase()]}
                onChange={handleCheckboxChange}
              />
              <label className="plan-header" htmlFor={addOn.name}>
                {addOn.name}
              </label>
              <div className="plan-description">{addOn.description}</div>
              <div className="plan-price">{addOn.price}</div>
            </div>
          ))}
        </div>
      </div>
      <button 
        className={`select-button ${isAnyAddOnSelected ? 'selected' : ''}`} 
        onClick={() => navigate('/next-page')}
      >
        Continue
      </button>
    </div>
  );
};

export default Page3;