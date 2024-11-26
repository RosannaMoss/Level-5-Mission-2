const { calculateCarValue } = require("./API1");

describe("Car Value API Unit Tests", () => {
  // Test case 1: Sunny day scenario
  it("should calculate the correct value for valid inputs ('Toyota', 2017)", () => {
    const result = calculateCarValue("Toyota", 2017);
    expect(result).toEqual({ car_value: "$11617" });
  });

  // Test case 2: Wrong data type for year
  it("should return an error for non-numeric year ('Eggs', 'thirty five')", () => {
    const result = calculateCarValue("Eggs", "thirty five");
    expect(result).toEqual({ error: "Invalid year provided" });
  });

  // Test case 3: Numbers-only model
  it("should calculate the value for the year given ('384', 2019)", () => {
    const result = calculateCarValue("384", 2019);
    expect(result).toEqual({ car_value: "$2019" }); // No alphabet letters, car value is just the year
  });

  // Test case 4: Negative year
  it("should return an error for a negative year ('Volkswagen', -300)", () => {
    const result = calculateCarValue("Volkswagen", -300);
    expect(result).toEqual({ error: "Invalid year provided" });
  });

  // Test case 5: Invalid year (too large)
  it("should return an error for a year larger than 2025 ('Honda', 4000)", () => {
    const result = calculateCarValue("Honda", 4000);
    expect(result).toEqual({ error: "Invalid year provided" });
  });

  // Test case 6: Ignore symbols in model
  it("should ignore symbols and calculate correct value ('Mazda!', 2014)", () => {
    const result = calculateCarValue("Mazda!", 2014);
    expect(result).toEqual({ car_value: "$6514" });
  });
});
