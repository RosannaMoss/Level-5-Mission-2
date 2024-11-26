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
    <div className={styles.API1Container}>
      <h1 className={styles.cardTitle}>Car Value Calculator</h1>

      <form className={styles.API1Form} onSubmit={handleSubmit}>
        <label className={styles.API1Label}>
          Model:
          <br></br>
          <input
            className={styles.API1Input}
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>
        <label className={styles.API1Label}>
          Year:
          <br></br>
          <input
            className={styles.API1Input}
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <button className={styles.API1Button} type="submit">
          Calculate
        </button>
      </form>
      {result && <p className={styles.result}>Suggested Car Value: {result}</p>}
      {error && <p className={styles.API1error}>{error}</p>}
    </div>
  );
};

export default frontendAPI1;
