import React, { useState } from "react";
import '../Pages/css/login.css'
import {
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox
}
  from 'mdb-react-ui-kit';
import axios from "axios";
import { BASE_URL } from "../Constants/constants";
import { useNavigate } from "react-router-dom";
import {toastError,toastSuccess} from "../Constants/plugins"
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../Toolkit/userSlice";



function LoginBox({ setBoxName }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {userDetails}=useSelector((state)=>state.user)
  const dispatch=useDispatch()


  const handleSignUp = () => {
    setBoxName('signup')
  }

  const handleLogin = () => {
    try {

      if (email && password) {
        axios.post(`${BASE_URL}/auth/login`, { email, password }).then((res) => {
          if (res.data.message === "login successfull" && res.data.token) {
            localStorage.setItem('token', res.data.token)
            const parsedToken=parseJwt(res.data.token)
            localStorage.setItem('user',JSON.stringify(parsedToken))
            console.log(parsedToken);
            dispatch(setUserDetails(parsedToken))
            toastSuccess('login successfull')
            navigate('/home')
          }
          if(res.data.message === "invalid credentials");
           {
            toastError('invalid credentials')
          }

        })
      } else {

        alert('credentials not filled')
      }
    }
    catch (error) {

    }
  }

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
// const updateUserRole=()=>{
// dispatch(setUserRole(345))

// }

  return (


    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100 login-pg '>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-4 w-100 d-flex flex-column' >

              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              {/* <p className="text-black-50 mb-3">Please enter your login and password!</p> */}

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' size="lg" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' size="lg" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

              {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' /> */}
              <a href="!#">Forgot password?</a>
              <br />



              <button className='logbutton' onClick={handleLogin}>
                Login
              </button>

              {/* <div className="text-center">
                  <p> dont have an account <i onClick={handleSignUp} >Register Here</i> 
        </p>
        </div>  */}

              <div className="text-center cursor-pointer font-italic rb" >dont have an account  <i onClick={handleSignUp} >    Register Here</i>
              </div>
              {/* <hr className="my-4" /> */}



            </MDBCardBody>
            
          </MDBCard>
              
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}


export default LoginBox;