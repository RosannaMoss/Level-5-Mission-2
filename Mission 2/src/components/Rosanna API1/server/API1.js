import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(express.json());
// parse JSON request body
app.use(cors());

// Helper function to calculate car value
export function calculateCarValue(model, year) {
  // ensure year is a valid number
  if (isNaN(year) || year <= 0 || typeof year !== "number") {
    return { error: "Invalid year provided" };
  }

  // Ensure year is not greater than 2024
  if (year > 2025) {
    return { error: "Invalid year provided" };
  }

  // Ensure model is a valid string
  if (typeof model !== "string" || model.trim() === "") {
    return { error: "Invalid model provided" };
  }

  // calculate the value of each letter
  const alphabetPositionSum = model
    .toUpperCase()
    .split("")
    .filter((char) => char >= "A" && char <= "Z") // Only letters
    .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);

  // calculate car value
  const carValue = alphabetPositionSum * 100 + year;
  // as stated for API 1

  return { car_value: `$${carValue}` };
}

// API endpoint
app.post("/calculateCarValue", (req, res) => {
  const { model, year } = req.body;

  // if no input:
  if (!model || !year) {
    return res
      .status(400)
      .json({ error: "Invalid input, model and year are required" });
  }

  // calculate car value
  const result = calculateCarValue(model, year);

  // return the result
  if (result.error) {
    return res.status(400).json(result);
  }
  return res.status(200).json(result);
});

// start the server
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
