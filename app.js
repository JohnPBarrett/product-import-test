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

module.exports = {
  readCSVFile
};
