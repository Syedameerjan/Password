import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const GoBackButton = () => {
  const navigate = useNavigate(); // Create navigate function to access navigation

  return (
    <div className="container mt-5">
      <button
        className="btn btn-primary"
        onClick={() => navigate(-1)} // Navigate back when clicked
        style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }} // Center at bottom
      >
        Go Back
      </button>
    </div>
  );
};

export default GoBackButton;
