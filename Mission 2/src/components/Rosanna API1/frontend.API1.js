// App.js
import React, { useState } from "react";
import axios from "axios";

const frontendAPI1 = () => {
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/calculateCarValue",
        {
          model,
          year: parseInt(year, 10), // Ensure year is a number
        }
      );
      setResult(response.data.car_value);
    } catch (err) {
      setError(err.response?.data?.error || "There was an error");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "2em" }}>
      <h1>Car Value Calculator</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1em" }}>
        <div>
          <label>
            Model:
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={{
                marginLeft: "1em",
                marginBottom: "1em",
                padding: "0.5em",
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Year:
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{
                marginLeft: "1em",
                marginBottom: "1em",
                padding: "0.5em",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "0.5em 1em",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Calculate
        </button>
      </form>
      {result && (
        <p>
          Suggested Car Value: <strong>{result}</strong>
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default frontendAPI1;
