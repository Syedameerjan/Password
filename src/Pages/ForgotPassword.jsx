import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import axios from "axios";
import { BASE_URL } from "../Constants/constants";
import { toastError, toastSuccess } from "../Constants/plugins";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError(''); // Clear error if validation passes
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) {
      return; // Stop if validation fails
    }

    try {
      const res = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
      if (res.data.message === "Reset link sent") {
        setSuccess('A reset link has been sent to your email.');
        setEmail(''); // Clear the email input
      } else {
        toastError(res.data.message);
      }
    } catch (error) {
      toastError('An error occurred. Please try again later.');
      console.error(error);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100 login-pg'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-4 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Forgot Password</h2>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' size="lg" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

              <button className='logbutton' onClick={handleResetPassword}>
                Send Reset Link
              </button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ForgotPassword;
