import React from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleNavigation = () => {
    navigate("/addNewCourt"); // Navigate to /mainnav route when button is clicked
  };
  const handleNavigation1 = () => {
    navigate("/admin"); // Navigate to /mainnav route when button is clicked
  };
  return (
    <>
      <div >
        <div className="d-flex justify-content-center align-items-center h-100 login-pg">
        <div col='12'>
            <div className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '100rem' }}>
                <div className='p-5 w-100 d-flex flex-column'>
        <button 
          type="button" 
          className="btn btn-success m-5" 
          data-mdb-ripple-init 
          onClick={handleNavigation1}
        >
          Saved docs
        </button>
        <button 
          type="button" 
          className="btn btn-danger m-5" 
          data-mdb-ripple-init
          onClick={handleNavigation}
        >
          New doc
        </button>
        </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

