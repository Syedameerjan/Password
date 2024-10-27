import React, { useState } from "react";
import '../Pages/css/login.css';
import {
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput
} from 'mdb-react-ui-kit';
import axios from "axios";
import { BASE_URL } from "../Constants/constants";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../Constants/plugins";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../Toolkit/userSlice";

function LoginBox({ setBoxName }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    setBoxName('signup');
  };

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required!');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError(''); // Clear error if validation passes
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      if (res.data.message === "login successful" && res.data.token) {
        localStorage.setItem('token', res.data.token);
        const parsedToken = parseJwt(res.data.token);
        localStorage.setItem('user', JSON.stringify(parsedToken));
        dispatch(setUserDetails(parsedToken));
        toastSuccess('Login successful');
        navigate('/home');
      } else if (res.data.message === "invalid credentials") {
        toastError('Invalid credentials');
      }
    } catch (error) {
      toastError('An error occurred while logging in. Please try again.');
      console.error(error);
    }
  };

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100 login-pg '>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-4 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>

              {/* Display error message */}
              {error && <div className="alert alert-danger">{error}</div>}

              <MDBInput 
                wrapperClass='mb-4 w-100' 
                label='Email address' 
                id='formControlLg' 
                size="lg" 
                type='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <MDBInput 
                wrapperClass='mb-4 w-100' 
                label='Password' 
                id='formControlLg' 
                size="lg" 
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />

              <a href="!#">Forgot password?</a>
              <br />
              <button className='logbutton' onClick={handleLogin}>
                Login
              </button>

              <div className="text-center cursor-pointer font-italic rb">
                Don't have an account? <i onClick={handleSignUp}>Register Here</i>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginBox;
