/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState } from "react";
import WordDocumentGenerator from "./generateDocxFile.js";
import "./image/logo.png";

export default function Check() {
  const [selectedSemester, setSelectedSemester] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleSemesterChange = (event) => {
    const semesterValue = event.target.value;
    setSelectedSemester(semesterValue);

    // Example: Static subjects based on semester
    if (semesterValue === "1") {
      setSubjects(["DAA", "C", "D"]);
    } else if (semesterValue === "2") {
      setSubjects(["Math", "Physics", "Chemistry"]);
    } else {
      setSubjects([]);
    }
  };

  const [showTutDiv, setShowTutDiv] = useState(false);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setShowTutDiv(selectedValue === "yes");
  };

  const handleSubjectChange = (event) => {
    const subjectValue = event.target.value;
    setSelectedSubject(subjectValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Collect form data
    const formData = {
      semester: selectedSemester,
      section: document.form1.section.value,
      credits: document.form1.credits.value,
      batch: document.form1.batch.value, // Retrieve batch value from the form
      subjectCode: document.form1.subjectCode.value, // Retrieve subject code value from the form
      subjectName: selectedSubject,
      facultyName: document.form1.nm.value,
      initials: document.form1.in.value,
      startDate: new Date(document.form1.startDate.value), // Convert input value to Date object
      endDate: new Date(document.form1.endDate.value), // Convert input value to Date object
      numberOfSessions: 3,
      isTutorial: document.form1.tutreq.value,
    };

    

    // If tutorial is required, collect tutorial data
    if (formData.isTutorial === "yes") {
      formData.tutorialCredits = document.form1.tcredits.value;

      const tutTimeCheckboxes = document.querySelectorAll(
        'input[name="tuttime[]"]:checked'
      );
      const tutTimeValues = Array.from(tutTimeCheckboxes).map(
        (checkbox) => checkbox.defaultValue
      );
      formData.tutorial = tutTimeValues;
    }

    // Collect timetable data
    const timetableCheckboxes = document.querySelectorAll(
      'input[name="timetable[]"]:checked'
    );
    const timetableValues = Array.from(timetableCheckboxes).map(
      (checkbox) => checkbox.defaultValue
    );
    formData.classes = timetableValues;

    // Console log the form data
    console.log(formData);

    // Generate document
    const instance = new WordDocumentGenerator();
    instance.generateDocument(formData);
  };

  return (
    <>
      <link rel="stylesheet" href="images/BluePigment.css" type="text/css" />
      <title>MSRIT Teaching Diary</title>

      <div id="header">
        <div id="header-content">
          <img
            src="C:\Users\megha\Downloads\logo.png"
            alt="msrit"
            width={200}
            height={100}
          />
          <h2>
            <div className="msrit">M S RAMAIAH INSTITUTE OF TECHNOLOGY</div>
            <br />
          </h2>
        </div>
      </div>
      <br />
      <marquee behavior="alternate" scrollamount={4}>
        <div className="dept">
          Department of Masters of Computer Application
        </div>
      </marquee>
      {/* content-wrap starts here */}
      <div className="mybox">
        <div align="right">
          {" "}
          <a className="clear" href="facultyevents.html">
            HOME |
          </a>
          <a className="clear" href="/holidays">
            View Holidays |
          </a>
          <a className="clear" href="login1.html">
            LOGOUT
          </a>
        </div>
        <form
          name="form1"
          method="get"
          action=""
          id="form1"
          onSubmit={handleSubmit}
        >
          <h3 align="center">
            <div
              style={{
                fontFamily: "Cooperlate Gothic Light",
                letterSpacing: 8,
                color: "#090a0a",
              }}
            >
              GENERATE TEACHING DIARY
            </div>
          </h3>
          &nbsp; Semester{" "}
          <select
            className="f"
            name="semester"
            required
            onChange={handleSemesterChange}
            value={selectedSemester}
          >
            <option value="0"> </option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          &nbsp; Subjects{" "}
          <select
            name="subject"
            id="subject"
            required
            onChange={handleSubjectChange}
            value={selectedSubject}
          >
            <option value="0"> </option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          &nbsp; Section{" "}
          <select name="section" required="required">
            <option value={0}> </option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
          </select>
          &nbsp; Credits{" "}
          <select name="credits" id="credits" required="required">
            <option />
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          &nbsp; Tutorial{" "}
          <select
            name="tutreq"
            id="tutreq"
            required="required"
            onChange={handleSelectChange}
          >
            <option />
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          &nbsp;
          <br />
          <br />
          Name Of the Faculty{" "}
          <input type="textbox" name="nm" required="required" size={8} />
          &nbsp;&nbsp;&nbsp;&nbsp;Initials{" "}
          <input type="textbox" name="in" required="required" size={5} />
          <br />
          <br />
          Batch:{" "}
          <input
            type="text"
            name="batch"
            required="required"
            defaultValue="2023-2025"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;Subject Code:{" "}
          <input
            type="text"
            name="subjectCode"
            required="required"
            defaultValue="MCA101"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;Start Date:{" "}
          <input
            type="date"
            name="startDate"
            required="required"
            defaultValue="2024-03-01"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;End Date:{" "}
          <input
            type="date"
            name="endDate"
            required="required"
            defaultValue="2024-04-30"
          />
          <br />
          <br />
          <br />
          <br />
          <table cellSpacing={10} cellPadding={8}>
            <tbody>
              <tr align="center">
                <td> </td>
                <td>9:00 AM - 9:55 AM</td>
                <td>9:55 AM - 10:50 AM</td>
                <td>11:05 AM - 12:00 PM</td>
                <td>12:55 PM - 1:45 PM</td>
                <td>1:45 PM - 2:40 PM</td>
                <td>2:40 PM - 3:35 PM</td>
                <td>3:35 PM - 4:30 PM</td>
              </tr>
              <tr align="center">
                <td>Monday</td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box1"
                    value="Monday - 9:00 AM to 10:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box2"
                    value="Monday - 10:00 AM to 11:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box3"
                    value="Monday - 11:05 AM to 12:00 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box4"
                    value="Monday - 12:55 PM to 1:45 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box5"
                    value="Monday - 1:45 PM to 2:40 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box6"
                    value="Monday - 2:40 PM to 3:35 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box7"
                    value="Monday - 3:35 PM to 4:30 PM"
                  />
                </td>
              </tr>

              <tr align="center">
                <td>Tuesday</td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box1"
                    value="Tuesday - 9:00 AM to 10:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box2"
                    value="Tuesday - 10:00 AM to 11:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box3"
                    value="Tuesday - 11:05 AM to 12:00 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box4"
                    value="Tuesday - 12:55 PM to 1:45 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box5"
                    value="Tuesday - 1:45 PM to 2:40 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box6"
                    value="Tuesday - 2:40 PM to 3:35 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box7"
                    value="Tuesday - 3:35 PM to 4:30 PM"
                  />
                </td>
              </tr>
              <tr align="center">
                <td>Wednesday</td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box1"
                    value="Wednesday - 9:00 AM to 10:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box2"
                    value="Wednesday - 10:00 AM to 11:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box3"
                    value="Wednesday - 11:05 AM to 12:00 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box4"
                    value="Wednesday - 12:55 PM to 1:45 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box5"
                    value="Wednesday - 1:45 PM to 2:40 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box6"
                    value="Wednesday - 2:40 PM to 3:35 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box7"
                    value="Wednesday - 3:35 PM to 4:30 PM"
                  />
                </td>
              </tr>
              <tr align="center">
                <td>Thursday</td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box1"
                    value="Thursday - 9:00 AM to 10:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box2"
                    value="Thursday - 10:00 AM to 11:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box3"
                    value="Thursday - 11:05 AM to 12:00 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box4"
                    value="Thursday - 12:55 PM to 1:45 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box5"
                    value="Thursday - 1:45 PM to 2:40 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box6"
                    value="Thursday - 2:40 PM to 3:35 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box7"
                    value="Thursday - 3:35 PM to 4:30 PM"
                  />
                </td>
              </tr>
              <tr align="center">
                <td>Friday</td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box1"
                    value="Friday - 9:00 AM to 10:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box2"
                    value="Friday - 10:00 AM to 11:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box3"
                    value="Friday - 11:05 AM to 12:00 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box4"
                    value="Friday - 12:55 PM to 1:45 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box5"
                    value="Friday - 1:45 PM to 2:40 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box6"
                    value="Friday - 2:40 PM to 3:35 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box7"
                    value="Friday - 3:35 PM to 4:30 PM"
                  />
                </td>
              </tr>
              <tr align="center">
                <td>Saturday</td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box1"
                    value="Saturday - 9:00 AM to 10:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box2"
                    value="Saturday - 10:00 AM to 11:00 AM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box3"
                    value="Saturday - 11:05 AM to 12:00 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box4"
                    value="Saturday - 12:55 PM to 1:45 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box5"
                    value="Saturday - 1:45 PM to 2:40 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box6"
                    value="Saturday - 2:40 PM to 3:35 PM"
                  />
                </td>
                <td>
                  <input
                    className="regular-checkbox"
                    name="timetable[]"
                    type="checkbox"
                    id="box7"
                    value="Saturday - 3:35 PM to 4:30 PM"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          &nbsp;
          {showTutDiv && (
            <div className="tutDiv">
              <div id="t" className="hiddenTD" style={{ textAlign: "center" }}>
                <h1>Tutorial</h1>
              </div>
              <center className="hiddenTD" id="tcrd">
                {" "}
                Credits for tutorial{" "}
                <select name="tcredits" id="tcredits">
                  <option />
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
                <center>
                  <table
                    className="hiddenTD"
                    cellSpacing={10}
                    cellPadding={8}
                    id="tuttable"
                  >
                    <tbody>
                      <tr align="center">
                        <td> </td>
                        <td>9:00 AM - 9:55 AM</td>
                        <td>9:55 AM - 10:50 AM</td>
                        <td>11:05 AM - 12:00 PM</td>
                        <td>12:55 PM - 1:45 PM</td>
                        <td>1:45 PM - 2:40 PM</td>
                        <td>2:40 PM - 3:35 PM</td>
                        <td>3:35 PM - 4:30 PM</td>
                      </tr>
                      <tr align="center">
                        <td>Monday</td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox1"
                            value="Monday - 9:00 AM to 10:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox2"
                            value="Monday - 10:00 AM to 11:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox3"
                            value="Monday - 11:00 AM to 12:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox4"
                            value="Monday - 12:00 PM to 1:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox5"
                            value="Monday - 1:00 PM to 2:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox6"
                            value="Monday - 2:00 PM to 3:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox7"
                            value="Monday - 3:00 PM to 4:00 PM"
                          />
                        </td>
                      </tr>
                      <tr align="center">
                        <td>Tuesday</td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox1"
                            value="Tuesday - 9:00 AM to 10:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox2"
                            value="Tuesday - 10:00 AM to 11:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox3"
                            value="Tuesday - 11:00 AM to 12:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox4"
                            value="Tuesday - 12:00 PM to 1:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox5"
                            value="Tuesday - 1:00 PM to 2:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox6"
                            value="Tuesday - 2:00 PM to 3:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox7"
                            value="Tuesday - 3:00 PM to 4:00 PM"
                          />
                        </td>
                      </tr>

                      <tr align="center">
                        <td>Wednesday</td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox1"
                            value="Wednesday - 9:00 AM to 10:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox2"
                            value="Wednesday - 10:00 AM to 11:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox3"
                            value="Wednesday - 11:00 AM to 12:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox4"
                            value="Wednesday - 12:00 PM to 1:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox5"
                            value="Wednesday - 1:00 PM to 2:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox6"
                            value="Wednesday - 2:00 PM to 3:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox7"
                            value="Wednesday - 3:00 PM to 4:00 PM"
                          />
                        </td>
                      </tr>

                      <tr align="center">
                        <td>Thursday</td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox1"
                            value="Thursday - 9:00 AM to 10:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox2"
                            value="Thursday - 10:00 AM to 11:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox3"
                            value="Thursday - 11:00 AM to 12:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox4"
                            value="Thursday - 12:00 PM to 1:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox5"
                            value="Thursday - 1:00 PM to 2:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox6"
                            value="Thursday - 2:00 PM to 3:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox7"
                            value="Thursday - 3:00 PM to 4:00 PM"
                          />
                        </td>
                      </tr>

                      <tr align="center">
                        <td>Friday</td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox1"
                            value="Friday - 9:00 AM to 10:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox2"
                            value="Friday - 10:00 AM to 11:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox3"
                            value="Friday - 11:00 AM to 12:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox4"
                            value="Friday - 12:00 PM to 1:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox5"
                            value="Friday - 1:00 PM to 2:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox6"
                            value="Friday - 2:00 PM to 3:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox7"
                            value="Friday - 3:00 PM to 4:00 PM"
                          />
                        </td>
                      </tr>

                      <tr align="center">
                        <td>Saturday</td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox1"
                            value="Saturday - 9:00 AM to 10:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox2"
                            value="Saturday - 10:00 AM to 11:00 AM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox3"
                            value="Saturday - 11:00 AM to 12:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox4"
                            value="Saturday - 12:00 PM to 1:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox5"
                            value="Saturday - 1:00 PM to 2:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox6"
                            value="Saturday - 2:00 PM to 3:00 PM"
                          />
                        </td>
                        <td>
                          <input
                            className="regular-checkbox"
                            name="tuttime[]"
                            type="checkbox"
                            id="tbox7"
                            value="Saturday - 3:00 PM to 4:00 PM"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </center>
              </center>
            </div>
          )}
          <center>
            <div
              style={{ textAlign: "center", padding: "30px" }}
              id="b1"
              className="visibleTD"
            >
              <input
                className="button"
                type="submit"
                name="b1"
                id="b1"
                value=" Generate"
                onClick={handleSubmit}
              />
            </div>
          </center>
        </form>
      </div>
    </>
  );
}
