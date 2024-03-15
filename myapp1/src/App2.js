// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HolidayList from "./components/HolidayList";
import HolidayForm from "./components/HolidayForm";
import EditHolidaysButton from "./components/EditHolidaysButton";
import Form from "./App";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/holidays" element={<HolidayList />} />
          <Route exact path="/add-holiday" element={<HolidayForm />} />
          <Route exact path="/holidays/:id" element={<EditHolidaysButton />} />
        </Routes>
        <Routes>
          <Route exact path="/" element={<Form />} />
        </Routes>
        {/* Add more routes for other pages */}
      </div>
    </Router>
  );
};

export default App;
