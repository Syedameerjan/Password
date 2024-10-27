import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserDetails } from '../../Toolkit/userSlice';

function LogOut() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(clearUserDetails());
        navigate('/');
    };

    return (
        <>
            <style>
                {`
                    .logout-button {
                        background-color: #dc3545; /* Bootstrap danger color */
                        color: white;
                        border: none;
                        border-radius: 5px;
                        padding: 10px 20px;
                        cursor: pointer;
                        font-size: 16px;
                        transition: background-color 0.3s, transform 0.3s;
                    }
                    .logout-button:hover {
                        background-color: #c82333; /* Darker red on hover */
                        transform: scale(1.05);
                    }
                `}
            </style>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </>
    );
}

export default LogOut;

