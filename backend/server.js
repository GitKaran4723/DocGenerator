const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Replace with your MySQL password
  database: "teachingdiary",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

// Utility function to promisify MySQL queries
const queryAsync = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Get all holidays
const getAllHolidays = async (req, res) => {
  try {
    const rows = await queryAsync("SELECT * FROM holidays");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching holidays:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new holiday
const createHoliday = async (req, res) => {
  const { date, label } = req.body;
  if (!date || !label) {
    return res.status(400).json({ message: "Date and label are required" });
  }

  try {
    await queryAsync("INSERT INTO holidays (date, label) VALUES (?, ?)", [
      date,
      label,
    ]);
    res.status(201).json({ message: "Holiday created successfully" });
  } catch (error) {
    console.error("Error creating holiday:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a holiday
const updateHoliday = async (req, res) => {
  const { date, label } = req.body;
  if (!date || !label) {
    return res.status(400).json({ message: "Date and label are required" });
  }

  try {
    await queryAsync(
      "UPDATE holidays SET date = ?, label = ? WHERE id = ?",
      [date, label, req.params.id]
    );
    res.json({ message: "Holiday updated successfully" });
  } catch (error) {
    console.error("Error updating holiday:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a holiday
const deleteHoliday = async (req, res) => {
  try {
    await queryAsync("DELETE FROM holidays WHERE id = ?", [req.params.id]);
    res.json({ message: "Holiday deleted successfully" });
  } catch (error) {
    console.error("Error deleting holiday:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Define holiday-related routes
app.get("/holidays", getAllHolidays);
app.post("/holidays", createHoliday);
app.put("/holidays/:id", updateHoliday);
app.delete("/holidays/:id", deleteHoliday);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
