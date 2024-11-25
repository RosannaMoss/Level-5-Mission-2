import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

// Middleware to parse JSON request body
app.use(express.json());
app.use(cors());
// Helper function to calculate car value
export function calculateCarValue(model, year) {
  // Ensure year is a valid number
  if (isNaN(year) || year <= 0 || typeof year !== "number") {
    return { error: "Invalid year provided" };
  }

  // Ensure year is not greater than 2024
  if (year > 2024) {
    return { error: "Invalid year provided" };
  }

  // Ensure model is a valid string
  if (typeof model !== "string" || model.trim() === "") {
    return { error: "Invalid model provided" };
  }

  // Calculate the sum of alphabet positions
  const alphabetPositionSum = model
    .toUpperCase()
    .split("")
    .filter((char) => char >= "A" && char <= "Z") // Only letters
    .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);

  // Calculate car value
  const carValue = alphabetPositionSum * 100 + year;

  return { car_value: `$${carValue}` };
}

// API endpoint to calculate car value
app.post("/api/calculateCarValue", (req, res) => {
  const { model, year } = req.body;

  // Validate inputs
  if (!model || !year) {
    return res
      .status(400)
      .json({ error: "Invalid input, model and year are required" });
  }

  // Calculate car value
  const result = calculateCarValue(model, year);

  // Return the result
  if (result.error) {
    return res.status(400).json(result);
  }
  return res.status(200).json(result);
});

// Start the server
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
