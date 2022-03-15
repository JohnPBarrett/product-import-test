const fs = require("fs");
const parser = require("csv-parser");

const readCSVFile = (filePath) => {
  const products = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .on("error", (err) => reject(err))
      .pipe(parser())
      .on("data", (product) => products.push(product))
      .on("end", () => {
        resolve(products);
      });
  });
};

const writeJSONFile = (products) => {
  const path = "./products.json";
  const stream = fs.createWriteStream(path);

  return new Promise((resolve, reject) => {
    stream.write(JSON.stringify(products));
    stream.on("error", (err) => reject(err));
    stream.end();
    stream.on("finish", () => resolve());
  });
};

module.exports = {
  readCSVFile,
  writeJSONFile
};
