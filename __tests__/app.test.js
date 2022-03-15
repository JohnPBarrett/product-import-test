const app = require("../app.js");

describe("readCSVFile function", () => {
  it("When receiving a blank CSV it returns an empty array", async () => {
    const blankFilePath = `${__dirname}/../blank.csv`;

    const result = await app.readCSVFile(blankFilePath);

    expect(result).toEqual([]);
  });
  it("When receiving a valid CSV file it returns an array of objects", async () => {
    const basicFilePath = `${__dirname}/../basic-data.csv`;

    const result = await app.readCSVFile(basicFilePath);

    expect(result.length > 0).toBe(true);

    expect(result[0]).toEqual({ SKU: "1", Colour: "C1", Size: "S1" });
    expect(result[1]).toEqual({ SKU: "2", Colour: "C2", Size: "S1" });
    expect(result[2]).toEqual({ SKU: "3", Colour: "C1", Size: "S2" });
  });
});
