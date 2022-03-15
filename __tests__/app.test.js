const { readCSVFile, writeJSONFile, importCSVIntoJSON } = require("../app.js");
const fs = require("fs");

const productsJSONPath = `${__dirname}/../products.json`;

const readProductsJSON = () => {
  const productData = fs.readFileSync(productsJSONPath, "utf-8");
  return JSON.parse(productData);
};

afterEach(() => {
  if (fs.existsSync(productsJSONPath)) {
    // To clear out product.json file so each test is independent from another
    fs.unlinkSync(productsJSONPath);
  }
});

describe("readCSVFile function", () => {
  it("When receiving a blank CSV it returns an empty array", async () => {
    const blankFilePath = `${__dirname}/../blank.csv`;

    const result = await readCSVFile(blankFilePath);

    expect(result).toEqual([]);
  });
  it("When receiving a valid CSV file it returns an array of objects", async () => {
    const basicFilePath = `${__dirname}/../basic-data.csv`;

    const result = await readCSVFile(basicFilePath);

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
    const pathToJSON = `${__dirname}/../products.json`;

    await writeJSONFile(array);

    expect(fs.existsSync(pathToJSON)).toBe(true);

    const productData = readProductsJSON();

    expect(productData[0]).toEqual({ SKU: "1", Colour: "C1", Size: "S1" });
    expect(productData[1]).toEqual({ SKU: "2", Colour: "C2", Size: "S1" });
  });
});

describe("importCSVIntoJSON", () => {
  it("function writes a blank products.json file when receiving a blank CSV", async () => {
    const blankFilePath = `${__dirname}/../blank.csv`;

    await importCSVIntoJSON(blankFilePath);
    expect(fs.existsSync(productsJSONPath)).toBe(true);

    const productData = readProductsJSON();

    expect(productData).toEqual([]);
  });
  it("function writes a products.json file when receiving a valid CSV", async () => {
    const basicFilePath = `${__dirname}/../basic-data.csv`;

    await importCSVIntoJSON(basicFilePath);
    expect(fs.existsSync(productsJSONPath)).toBe(true);

    const productData = readProductsJSON();

    expect(productData[0]).toEqual({ SKU: "1", Colour: "C1", Size: "S1" });
    expect(productData[1]).toEqual({ SKU: "2", Colour: "C2", Size: "S1" });
  });
});
