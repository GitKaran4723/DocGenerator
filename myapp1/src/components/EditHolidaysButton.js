import React, { useState, useEffect } from "react";
import axios from "axios";

const EditHolidayForm = ({ holidayId }) => {
  const [holiday, setHoliday] = useState({ date: "", label: "" });

  useEffect(() => {
    const fetchHoliday = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/holidays/${holidayId}`);
        setHoliday(response.data);
      } catch (error) {
        console.error("Error fetching holiday:", error);
      }
    };

    fetchHoliday();
  }, [holidayId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHoliday({ ...holiday, [name]: value });
  };

  const handleUpdateHoliday = async () => {
    try {
      await axios.put(`http://localhost:3001/holidays/${holidayId}`, holiday);
      alert("Holiday updated successfully");
    } catch (error) {
      console.error("Error updating holiday:", error);
      alert("Failed to update holiday. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Edit Holiday</h2>
      <form>
        <div>
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={holiday.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Label:</label>
          <input
            type="text"
            name="label"
            value={holiday.label}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleUpdateHoliday}>Update Holiday</button>
      </form>
    </div>
  );
};

export default EditHolidayForm;
