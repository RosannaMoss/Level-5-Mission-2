import React, { useState } from "react";
import axios from "axios";
import styles from "./frontend.API1.module.css"; // Import the CSS file

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
    <div className={styles.container}>
      <h1>Car Value Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Model:
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>
        <label>
          Year:
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <button type="submit">Calculate</button>
      </form>
      {result && <p className={styles.result}>Suggested Car Value: {result}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default frontendAPI1;
