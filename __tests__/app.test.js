const { readCSVFile, writeJSONFile } = require("../app.js");
const fs = require("fs");
const { expect } = require("@jest/globals");

const productsJSONPath = `${__dirname}/../products.json`;

const readProductsJSON = () => {
  const productData = fs.readFileSync(productsJSONPath, "utf-8");
  return JSON.parse(productData);
};

afterEach(() => {
  if (fs.existsSync(productsJSONPath)) {
    // To clear out product.json file so each test is independant from another
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
  it("function writes a blank jsonFile when receiving an empty array", async () => {
    const array = [];
    const pathToJSON = `${__dirname}/../products.json`;

    await writeJSONFile(array);
    const productData = readProductsJSON();

    expect(fs.existsSync(pathToJSON)).toBe(true);
    expect(productData).toEqual([]);
  });
  it("function writes a jsonFile when receiving an array with objects", async () => {
    const array = [
      { SKU: "1", Colour: "C1", Size: "S1" },
      { SKU: "2", Colour: "C2", Size: "S1" }
    ];
    const pathToJSON = `${__dirname}/../products.json`;

    await writeJSONFile(array);
    const productData = readProductsJSON();

    expect(fs.existsSync(pathToJSON)).toBe(true);
    expect(productData[0]).toEqual({ SKU: "1", Colour: "C1", Size: "S1" });
    expect(productData[1]).toEqual({ SKU: "2", Colour: "C2", Size: "S1" });
  });
});
