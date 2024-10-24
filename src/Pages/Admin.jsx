// CourtList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Components/common/Consatans/constants";
import GoBackButton from "../Components/common/GoBackButton";

const CourtList = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch court data from the backend
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/save`); // Adjust URL as needed
        setCourts(response.data);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Court List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email / User ID</th>
            <th>Password</th>
            <th>Purpose</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {courts.map((court) => (
            <tr key={court._id}>
              <td>{court.email}</td>
              <td>{court.password}</td>
              <td>{court.purpose}</td>
              <td>{court.timeStamp}</td>
            </tr>
          ))}
        </tbody>

      </table>
      <GoBackButton />
    </div>
  );
};

export default CourtList;
