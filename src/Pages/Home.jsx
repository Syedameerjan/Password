import React, { useEffect, useState } from "react";
// import MainNav from "../Components/common/Navbars";
import Dashboard from "../Components/common/Dashboard";
import AxiosInstance from "../Config/AxiosInstance";
import Cards from "../Components/Cards";






function Home() {
  const [courtData,setCourtData]=useState([])
  useEffect(()=>{
    getAllCourtsData()
  },[])
  const getAllCourtsData=()=>{
    AxiosInstance.get('/users/getAllCourtsData').then((response)=>{
       
      setCourtData(response.data)
    })
    .catch(err=>{

    })
  }
  return (
 <>
 <Dashboard/>
 {/* <MainNav/> */}
 {/* <div className="container">
 <div className="row p-4 gap-3">
  {courtData.map((court)=> {
    return <Cards data={court} />;
  } )}
  
  
 </div>
 </div> */}
 
 
 </>
  )
}

export default Home;