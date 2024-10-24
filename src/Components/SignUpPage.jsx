import React, {  useState } from "react";
import { MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow,MDBContainer } from 'mdb-react-ui-kit'
import axios from "axios";
import { BASE_URL } from "../Constants/constants";



function SignUpPage({setBoxName}) {
  const handleLogin=()=>{
    setBoxName('login')
  }
  const [signUpData,setSignUpData]=useState({
    fName:'',
    lName:'',
    email:'',
    password:'',
    cfmPass:'',

  })
  // const [formData,setFormData] = useState({
  //   fName:'',
  //     lName:'',
  //     email:'',
  //     password:'',
  //     cfmPass:'',
  // })

  // const [errors,setErrors] = useState({})

  // const handleChange=(e)=>{
  //   const {name,value}=e.target;
  //   setFormData({
  //     ...formData, [name] : value
  //   })
  // }
  
  
  // const handleSubmit =(e)=>{
  //   e.preventDefault()
  //   const validationErrors = {}
  // if(!formData.fName.trim()){
  //   validationErrors.fName = "first name is required"
  // }
  // if (!formData.lName.trim()) {
  //   validationErrors.lName = "last name is required"
  // }
  // if (!formData.email.trim()) {
  //   validationErrors.email = "email is required"
  // }else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formData.email)) {
  //   validationErrors.email = "email is not valid"
  // }
  // if (!formData.password.trim()) {
  //   validationErrors.password = "password is required"
  // }else if (formData.password.length< 8) {
  //   validationErrors.password = "password must be contain 8 charecters"
  // }
  // if (formData.cfmPass !== formData.password) {
  //   validationErrors.cfmPass = "password not matched"
  // }
  // setErrors(validationErrors)
  // if (Object.keys(validationErrors).length ===0) {
  //   alert("user datials submetted successfully")
  // }
  
  
  // for useEffect reading
  // useEffect(()=>{
  //   console.log(signUpData);},[signUpData])

  // router for user registeration
const handleRegister=()=>{
try {
  axios.post(`${BASE_URL}/auth/signup`,signUpData).then((res)=>{ 
    if(res.data.message==='signup successful'){
      setBoxName('login')
      alert('signup successfull')
      
    }
    if(res.data.message==="email already exist"){
      alert('email alredyexist')
    }
  })
} catch (error) {
  
}

 
}
    return(
      <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100 login-pg '>
      <MDBCol col='12'>

        <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
          <MDBCardBody className='p-4 w-100 d-flex flex-column' >
            {/* <form onSubmit={handleSubmit}> */}

            <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
          <MDBCol col='6'>
            <MDBInput wrapperClass='mb-2' label='First name' id='form1' type='text' value={signUpData.fName} onChange={ (e)=>{setSignUpData({...signUpData,fName:e.target.value})}} />
            
          </MDBCol>

          <MDBCol col='6'>
            <MDBInput wrapperClass='mb-2' label='Last name' id='form2' type='text' value={signUpData.lName} onChange={(e)=>{setSignUpData({...signUpData,lName:e.target.value})}}  />
            {/* {errors.lName && <span>{errors.lName}</span>} */}
          </MDBCol>
        

        <MDBInput wrapperClass='mb-2' label='Email' id='form3'  type='email' value={signUpData.email} onChange={(e)=>{setSignUpData({...signUpData,email:e.target.value})}}  />
        {/* {errors.email && <span>{errors.email}</span>} */}
        <MDBInput wrapperClass='mb-2' label='Password' id='form4' type='password' value={signUpData.password} onChange={(e)=>{setSignUpData({...signUpData,password:e.target.value})}} />
        {/* {errors.password && <span>{errors.password}</span>} */}
        <MDBInput wrapperClass='mb-2' label='confirm Password' id='form4' type='password' value={signUpData.cfmPass} onChange={(e)=>{setSignUpData({...signUpData,cfmPass:e.target.value})}} />
        {/* {errors.cfmPass && <span>{errors.cfmPass}</span>} */}
       

        <button className='w-100 mb-4 rounded-1 p-1 btn btn-primary' size='md' onClick={handleRegister} >sign up</button>

        <div className="text-center cursor-pointer font-italic" ><i onClick={handleLogin} >go to Login</i> 
        </div>
        {/* </form> */}
        </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>

    )
}



export default SignUpPage;