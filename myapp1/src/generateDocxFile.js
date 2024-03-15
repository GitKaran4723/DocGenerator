import React from "react";
import "./image/logo.png"; // Import the logo image;
import "./stylesDoc.css";


class WordDocumentGenerator extends React.Component {
  generateDocument = (FormData) => {
    const {
      semester,
      section,
      credits,
      batch,
      subjectCode,
      subjectName,
      facultyName,
      initials,
      startDate,
      endDate,
      classes,
      numberOfSessions,
      isTutorial,
      tutorial,
    } = FormData;

    // Generate dates for the specified days of the week within the date range
    const term = `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;

    const holidays = [
      "2023-03-02", // format: YYYY-MM-DD
    ];

    const htmlContent = `
      <html>
        <head>
          <title>Calendar</title>
          <style>
            body {
              font-family: "Times New Roman", Times, serif;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              padding: 8px;
              text-align: center;
              font-size: 20px; /* Set font size for regular text */
            }
            th {
              background-color: #f2f2f2;
              font-size: 20px; /* Set font size for headings */
              font-weight: bold; /* Make headings bold */
            }
            .college-info {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
            }
            .college-info img.logo {
              margin-right: 15px;
            }
            .college-info h3 {
              margin: 0;
            }
            .details {
              display: flex;
              direction: column;
              font-size: 20px; 
            }
            .details p {
              margin: 0;
              font-size: 20px; 
            }
            .details p.bold {
              font-weight: bold;
              font-size: 20px; 
            }
            .no-border {
              border: none;
            }
            .header_table {
              border-collapse: collapse;
              font-weight: bold;
              font-size: 20px; 
            }
            .header_table td {
              border: none;
              text-align: left;
              padding: 5px;
              font-size: 20px;  /* Set font size for regular text */
            }
          </style>
        </head>
        <body>
          <div class="college-info">
            <img class="logo" src="C:/Users/KARAN JADHAV/Desktop/reactapp/myapp1/src/image/logo.png" alt="College Logo" />
            <h2 style="font-family: 'Times New Roman', Times, serif; text-align: center;">Teaching Diary</h2>
          </div>
          <table class="header_table" style="border: none;">
            <tr class="no-border">
              <td>Department: MCA</td>
              <td>Semester: ${semester}</td>
              <td>Section: ${section}</td>
              <td>Batch: ${batch}</td>
              <td>Term: ${term}</td>
            </tr>
            <tr class="no-border">
              <td colspan="3">Course Code & Name: ${subjectCode} & ${subjectName}</td>
              <td colspan="2">Credits: ${credits}</td>
            </tr>
            <tr class="no-border">
              <td colspan="3">Name(s) of the faculty: ${facultyName}</td>
              <td colspan="2">Total no. of sessions required: ${numberOfSessions}</td>
            </tr>
          </table>

          <h3 style="font-family: 'Times New Roman', Times, serif;">Classes</h3>

          <table>
            <thead>
              <tr>
                <th colspan="3">Proposed plan of coverage of syllabus</th>
                <th rowspan="2">If not taken, Reasons</th>
                <th colspan="2">Actual coverage of syllabus</th>
                <th rowspan="2">Remarks</th>
                <th rowspan="2">Initials of faculty</th>
              </tr>
              <tr>
                <th>Lesson No.</th>
                <th>Date</th>
                <th>Time</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              ${this.generateCalendarRows(
                startDate,
                endDate,
                classes,
                holidays
              )}
            </tbody>
          </table>
          ${
            isTutorial === "yes"
              ? `
              <h3 style="font-family: 'Times New Roman', Times, serif;">Tutorial</h3>
            <table>
              <thead>
              <tr>
              <th colspan="3">Proposed plan of coverage of syllabus</th>
              <th rowspan="2">If not taken, Reasons</th>
              <th colspan="2">Actual coverage of syllabus</th>
              <th rowspan="2">Remarks</th>
              <th rowspan="2">Initials of faculty</th>
            </tr>
            <tr>
              <th>Lesson No.</th>
              <th>Date</th>
              <th>Time</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
              </thead>
              <tbody>
                ${this.generateCalendarRows(
                  startDate,
                  endDate,
                  tutorial,
                  holidays
                )}
              </tbody>
            </table>
          `
              : ""
          }
          <div class="signature-lines">
          <div class="signature-lines">
          <table style="width: 100%;">
            <tr>
              <td style="width: 50%; height: 50px; font-weight: bold; vertical-align: middle; text-align: left;">
                Signature of the Faculty<br>Date:
              </td>
              <td style="width: 50%; height: 50px; font-weight: bold; vertical-align: middle; text-align: left;">
                Signature of the HOD<br>Date:
              </td>
            </tr>
          </table>
        </div>
          </div>

          <h3 style="font-family: 'Times New Roman', Times, serif; text-align: center;">Final Remarks</h3>
          <table style="width: 100%;">
  
  <tr>
    <!-- Signature of the Faculty -->
    <td style="height: 10em; vertical-align: bottom;">
      Signature of the Faculty <br>
      Date: _______________
    </td>
    <!-- Signature of the HOD -->
    <td style="height: 10em; vertical-align: bottom;">
      Signature of the HOD <br>
      Date: _______________
    </td>
  </tr>
</table>


        </body>
      </html>
    `;

    // Create a blob with HTML content
    const blob = new Blob([htmlContent], { type: "application/msword" });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      subjectName +
      "_" +
      semester +
      "_" +
      section +
      "_" +
      batch +
      "_" +
      term +
      "_" +
      initials +
      ".doc";

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Function to generate calendar rows based on the provided dates
  generateCalendarRows = (startDate, endDate, schedule, holidays) => {
    let htmlRows = "";
    const currentDate = new Date(startDate);
    let lessonNumber = 1; // Initialize lesson number

    while (currentDate <= endDate) {
      // Convert currentDate to string format YYYY-MM-DD for comparison
      const currentDateStr = this.formatDate(currentDate);

      // Check if the current date is not a holiday
      if (
        !holidays.some(
          (holiday) => this.formatDate(new Date(holiday)) === currentDateStr
        )
      ) {
        // eslint-disable-next-line no-loop-func
        schedule.forEach((entry) => {
          const dayOfWeek = currentDate.toLocaleDateString("en-US", {
            weekday: "long",
          });

          if (dayOfWeek.toLowerCase() === entry.split(" - ")[0].toLowerCase()) {
            const time = entry.split(" - ")[1];
            const formattedDate = currentDate.toLocaleDateString("en-GB");
            htmlRows += `<tr><td>${lessonNumber}</td><td>${formattedDate}</td><td>${time}</td><td></td><td></td><td></td></tr>`;
            lessonNumber++; // Increment lesson number for next row
          }
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return htmlRows;
  };

  // Function to format date as DD-mon-YYYY
  formatDate = (date) => {
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    console.log("Formatted Date:", formattedDate);
    return formattedDate;
  };
}

export default WordDocumentGenerator;
