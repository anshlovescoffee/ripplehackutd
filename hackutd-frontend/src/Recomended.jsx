import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import PlansPage from './PlansPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/plans" element={<PlansPage />} />
      </Routes>
    </Router>
  );
};

export default App;
