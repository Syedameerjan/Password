
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogOut from "./LogOut";
// import {LogOut} from "./LogOut":

function Dashboard() {
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/addNewCourt");
  };
  const handleNavigation1 = () => {
    navigate("/admin");
  };

  const styles = {
    loginPg: {
      backgroundColor: 'rgb(130, 2, 250)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      borderRadius: '1rem',
      maxWidth: '600px',
      backgroundColor: 'white',
      padding: '2rem',
      textAlign: 'center',
    },
    nameboard: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '25px',
      fontSize: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
      width: '12rem',
      display: 'inline-block',
      cursor: 'pointer',
      margin: 'auto',
      // Add default state styles
    },
    nameboardHover: {
      backgroundColor: '#218838',
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.loginPg}>
      <div style={styles.card} className="m-5">

        <button
          style={{
            ...styles.nameboard,
            ...(isHovered ? styles.nameboardHover : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Hi {userDetails.fname} {userDetails.lname}
        </button>


        <br />


        <button
          type="button"
          className="btn btn-success m-3"
          style={{ width: '150px', height: '50px', fontSize: '18px' }}
          data-mdb-ripple-init
          onClick={handleNavigation1}
        >
          Saved docs
        </button>



        <button
          type="button"
          className="btn btn-danger m-3"
          style={{ width: '150px', height: '50px', fontSize: '18px' }}
          data-mdb-ripple-init
          onClick={handleNavigation}
        >
          New doc
        </button>

        <br />
        <LogOut />
      </div>
    </div>
  );
}

export default Dashboard;
