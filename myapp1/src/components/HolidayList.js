import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Import useNavigate hook

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get("http://localhost:3001/holidays");
        const formattedHolidays = response.data.map((holiday) => ({
          ...holiday,
          date: formatDateString(holiday.date),
        }));
        setHolidays(formattedHolidays);
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setError("Failed to fetch holidays. Please try again later.");
      }
    };

    fetchHolidays();
  }, []);

  const handleAddHoliday = () => {
    navigate("/add-holiday"); // Use navigate to go to the Add Holiday form
  };

  const handleDeleteHoliday = async (holidayId) => {
    try {
      await axios.delete(`http://localhost:3001/holidays/${holidayId}`);
      setHolidays(holidays.filter((holiday) => holiday.id !== holidayId));
    } catch (error) {
      console.error("Error deleting holiday:", error);
      setError("Failed to delete holiday. Please try again later.");
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div>
      <h2>Holidays</h2>
      {error && <p>{error}</p>}
      <button onClick={handleAddHoliday}>Add Holiday</button>
      <table>
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Date</th>
            <th>Event</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday, index) => (
            <tr key={holiday.id}>
              <td>{index + 1}</td>
              <td>{holiday.date}</td>
              <td>{holiday.label}</td>
              <td>
                <button onClick={() => handleDeleteHoliday(holiday.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HolidayList;
