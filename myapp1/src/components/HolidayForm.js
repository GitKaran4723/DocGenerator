import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import navigate function

const HolidayForm = () => {
  const [date, setDate] = useState("");
  const [label, setLabel] = useState("");
  const navigate = useNavigate(); // Import useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3001/holidays", { date, label });
      // Optionally, update state or show a success message
      navigate("/holidays"); // Use navigate to navigate to the HolidayList page
    } catch (error) {
      console.error("Error adding holiday:", error);
    }
  };

  return (
    <div>
      <h2>Add Holiday</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button type="submit">Add Holiday</button>
      </form>
    </div>
  );
};

export default HolidayForm;
