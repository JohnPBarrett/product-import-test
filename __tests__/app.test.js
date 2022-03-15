const {
  readCSVFile,
  writeJSONFile,
  importCSVIntoJSON,
  validateRow
} = require("../app.js");
const fs = require("fs");

const blankFilePath = `${__dirname}/../blank.csv`;
const basicFilePath = `${__dirname}/../basic-data.csv`;
const productsJSONPath = `${__dirname}/../products.json`;

const readProductsJSON = () => {
  const productData = fs.readFileSync(productsJSONPath, "utf-8");
  return JSON.parse(productData);
};

afterEach(() => {
  jest.clearAllMocks();

  if (fs.existsSync(productsJSONPath)) {
    // To clear out product.json file so each test is independent from another
    fs.unlinkSync(productsJSONPath);
  }
});

describe("readCSVFile function", () => {
  it("When receiving a blank CSV it returns an empty array", async () => {
    const result = await readCSVFile(blankFilePath);

    expect(result).toEqual([]);
  });
  it("When receiving a valid CSV file it returns an array of objects", async () => {
    const testTotals = { totalCreated: 0 };
    const result = await readCSVFile(basicFilePath, testTotals);

    expect(result.length > 0).toBe(true);

    expect(result[0]).toEqual({ SKU: "1", Colour: "C1", Size: "S1" });
    expect(result[1]).toEqual({ SKU: "2", Colour: "C2", Size: "S1" });
    expect(result[2]).toEqual({ SKU: "3", Colour: "C1", Size: "S2" });
  });
});

describe("writeJSONFile function", () => {
  it("function writes a blank JSONFile when receiving an empty array", async () => {
    const array = [];
    const pathToJSON = `${__dirname}/../products.json`;

    await writeJSONFile(array);

    expect(fs.existsSync(pathToJSON)).toBe(true);

    const productData = readProductsJSON();

    expect(productData).toEqual([]);
  });
  it("function writes a JSONFile when receiving an array with objects", async () => {
    const array = [
      { SKU: "1", Colour: "C1", Size: "S1" },
      { SKU: "2", Colour: "C2", Size: "S1" }
    ];

    await writeJSONFile(array);

    expect(fs.existsSync(productsJSONPath)).toBe(true);

    const productData = readProductsJSON();

    expect(productData[0]).toEqual({ SKU: "1", Colour: "C1", Size: "S1" });
    expect(productData[1]).toEqual({ SKU: "2", Colour: "C2", Size: "S1" });
  });
});

describe("importCSVIntoJSON", () => {
  it("function writes a blank products.json file when receiving a blank CSV", async () => {
    await importCSVIntoJSON(blankFilePath);
    expect(fs.existsSync(productsJSONPath)).toBe(true);

    const productData = readProductsJSON();

    expect(productData).toEqual([]);
  });
  it("function writes a products.json file when receiving a valid CSV", async () => {
    await importCSVIntoJSON(basicFilePath);
    expect(fs.existsSync(productsJSONPath)).toBe(true);

    const productData = readProductsJSON();

    expect(productData[0]).toEqual({ SKU: "1", Colour: "C1", Size: "S1" });
    expect(productData[1]).toEqual({ SKU: "2", Colour: "C2", Size: "S1" });
  });
});

describe("validateRow", () => {
  it("when receiving a valid product it returns true", () => {
    const product = { SKU: "1", Colour: "C1", Size: "S1" };

    const result = validateRow(product);

    expect(result).toBe(true);
  });
  it("when receiving a product missing a SKU it returns false and console logs the appropriate message", () => {
    const product = { SKU: "", Colour: "C1", Size: "S1" };
    const consoleLogSpy = jest.spyOn(console, "log");

    const result = validateRow(product);

    expect(result).toBe(false);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "product has been skipped as it is missing a SKU"
    );
  });
  it("when receiving a product missing a Colour it returns false and console logs the appropriate message", () => {
    const product = { SKU: "1", Colour: "", Size: "S1" };
    const consoleLogSpy = jest.spyOn(console, "log");

    const result = validateRow(product);

    expect(result).toBe(false);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "product has been skipped as it is missing a Colour"
    );
  });
  it("when receiving a product missing a Size it returns false and console logs the appropriate message", () => {
    const product = { SKU: "1", Colour: "Colour", Size: "" };
    const consoleLogSpy = jest.spyOn(console, "log");

    const result = validateRow(product);

    expect(result).toBe(false);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "product has been skipped as it is missing a Size"
    );
  });
});

describe("console log for created products", () => {
  it("console logs 0 when imported csvFile is blank", async () => {
    const consoleLogSpy = jest.spyOn(console, "log");

    await importCSVIntoJSON(blankFilePath);
    expect(consoleLogSpy).toHaveBeenCalledWith("Number of products created: 0");
  });
  it("console logs correctly when importing a csv file with valid data", async () => {
    const consoleLogSpy = jest.spyOn(console, "log");

    await importCSVIntoJSON(basicFilePath);
    expect(consoleLogSpy).toHaveBeenCalledWith("Number of products created: 3");
  });
});
