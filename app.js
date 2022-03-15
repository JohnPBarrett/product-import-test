const fs = require("fs");
const parser = require("csv-parser");

const readCSVFile = (filePath, totals) => {
  const products = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .on("error", (err) => reject(err))
      .pipe(parser())
      .on("data", (product) => {
        totals.totalCreated += 1;
        products.push(product);
      })
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

const importCSVIntoJSON = async (csvFilePath) => {
  const totals = {
    totalCreated: 0
  };

  const products = await readCSVFile(csvFilePath, totals);
  await writeJSONFile(products);
  console.log(`Number of products created: ${totals.totalCreated}`);
  return;
};

module.exports = {
  readCSVFile,
  writeJSONFile,
  importCSVIntoJSON
};
