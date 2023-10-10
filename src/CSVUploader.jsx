import React, { useRef } from "react";
import Papa from "papaparse";

function CSVUploader({ onCompare }) {
  const fileInput = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          compareCSVs(result.data);
        },
      });
    }
  };

  const compareCSVs = (data) => {
    // Fetch IntercomList.csv
    fetch(require("./IntercomList.csv"))
      .then((response) => response.text())
      .then((intercomData) => {
        // <-- Renamed parameter here
        const intercomList = Papa.parse(intercomData).data;
        performComparison(intercomList, data); // <-- Correctly using the outer 'data' here
      });
  };

  const performComparison = (intercomList, uploadedList) => {
    const intercomData = intercomList.map((row) => ({
      number: row[2],
      firstName: row[0],
      lastName: row[1],
    }));
    const uploadedData = uploadedList.map((row) => ({
      number: row[2],
      firstName: row[0],
      lastName: row[1],
    }));

    const found = uploadedData.filter((data) =>
      intercomData.some((intercomEntry) => intercomEntry.number === data.number)
    );

    const notFound = uploadedData.filter(
      (data) =>
        !intercomData.some(
          (intercomEntry) => intercomEntry.number === data.number
        )
    );

    onCompare({ found, notFound });
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInput}
        onChange={handleFileUpload}
        accept=".csv"
      />
    </div>
  );
}

export default CSVUploader;
