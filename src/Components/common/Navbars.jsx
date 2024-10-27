import React, { useState } from "react";
import '../common/CSS/login.css';
import {
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./Consatans/constants";
import { useSelector } from 'react-redux';

function MainNav() {
  const { userDetails } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [saveData, setSaveData] = useState({
    email: '',
    password: '',
    purpose: '',
  });
  const [error, setError] = useState(''); // State for error message

  // Validation function
  const validateForm = () => {
    const { email, password, purpose } = saveData;
    if (!email || !password || !purpose) {
      setError("All fields are required!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(''); // Clear error if validation passes
    return true;
  };

  const handleSaveNew = async () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    try {
      const res = await axios.post(`${BASE_URL}/admin/save`, saveData);
      if (res.status === 200 && res.data.message === 'Data saved successfully') {
        alert('Data saved successfully');
        navigate('/home');
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      alert('Error occurred while saving data');
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100 login-pg'>
        <MDBCol col='12'>
          <MDBCard className='bg-white mx-auto m-5' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-4 w-100 d-flex flex-column'>
              <button className='nameboard bg-success'>
                Hi {userDetails.fname} {userDetails.lname}
              </button>
              <br />
              <h2 className="fw-bold mb-2 text-center">Enter Details</h2>

              {/* Display error message */}
              {error && <div className="alert alert-danger">{error}</div>}

              <MDBInput wrapperClass='mb-4 w-100' label='Email address or login Id' id='formControlLg' size="lg" type='email'
                value={saveData.email} onChange={(e) => { setSaveData({ ...saveData, email: e.target.value }) }} />
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' size="lg" type='password'
                value={saveData.password} onChange={(e) => { setSaveData({ ...saveData, password: e.target.value }) }} />
              <MDBInput wrapperClass='mb-4 w-100' label='Purpose / site name' id='formControlLg' size="lg" type='text'
                value={saveData.purpose} onChange={(e) => { setSaveData({ ...saveData, purpose: e.target.value }) }} />

              <button className='savebutton' onClick={handleSaveNew}>
                Save
              </button>
              <br />
              <button className='backbutton' onClick={handleGoBack}>
                Go Back
              </button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default MainNav;
