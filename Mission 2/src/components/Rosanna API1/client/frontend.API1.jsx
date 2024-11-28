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
        "http://localhost:3001/calculateCarValue",
        {
          model,
          year: parseInt(year, 10), // Ensure year is a number
          /* EXPLANATION
          The 10 in the parseInt(year, 10) is specifying the radix, which is the base of the number system to be used for parsing 
          the year string into an integer.

Here’s how it works:

parseInt(string, radix) is a JavaScript function that converts a string to an integer.
The radix argument tells parseInt which number base to use for the conversion.
A radix of 10 means base-10, which is the standard decimal numbering system (the one we commonly use).
Without the radix, the behavior of parseInt can be unpredictable. For example:
If the string starts with 0x, it will be parsed as a hexadecimal (base-16) number.
Strings starting with 0 (in some older JavaScript environments) might be parsed as octal (base-8).
In your code, parseInt(year, 10) ensures that the year is interpreted as a decimal integer, avoiding any unexpected behavior. For example:

parseInt("2024", 10); // Returns 2024
parseInt("2024", 8);  // Returns 1044 (interprets "2024" as base-8)
This makes the code more robust, especially when dealing with user input or unpredictable data formats.

          */
        }
      );
      setResult(response.data.car_value);
      // car_value referencing the API value
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
