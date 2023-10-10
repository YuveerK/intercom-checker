import React, { useState } from "react";
import CSVUploader from "./CSVUploader";

function App() {
  const [results, setResults] = useState({ found: [], notFound: [] });
  console.log(results);
  return (
    <div className="App">
      <h1>Compare CSVs with IntercomList.csv</h1>
      <CSVUploader onCompare={setResults} />
      <h2>Numbers Found in IntercomList:</h2>
      <ul>
        {results.found.map((entry, idx) => (
          <li key={idx}>
            {entry.firstName} {entry.lastName} - {entry.number}
          </li>
        ))}
      </ul>
      <h2>Numbers Not Found in IntercomList:</h2>
      <ul>
        {results.notFound.map((entry, idx) => (
          <li key={idx}>
            {entry.firstName} {entry.lastName} - {entry.number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
