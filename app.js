const fs = require("fs");
const parser = require("csv-parser");

const readCSVFile = (filePath, totals) => {
  const products = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .on("error", (err) => reject(err))
      .pipe(parser())
      .on("data", (product) => {
        if (validateRow(product)) {
          totals.totalCreated += 1;
          products.push(product);
        } else {
          totals.totalSkipped += 1;
        }
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
    totalCreated: 0,
    totalSkipped: 0
  };

  const products = await readCSVFile(csvFilePath, totals);
  await writeJSONFile(products);
  console.log(`Number of products created: ${totals.totalCreated}`);
  console.log(`Number of rows skipped: ${totals.totalSkipped}`);
  return;
};

const validateRow = (product) => {
  if (product.SKU === "") {
    console.log("product has been skipped as it is missing a SKU");
    return false;
  }
  if (product.Colour === "") {
    console.log("product has been skipped as it is missing a Colour");
    return false;
  }
  if (product.Size === "") {
    console.log("product has been skipped as it is missing a Size");
    return false;
  }
  return true;
};

module.exports = {
  readCSVFile,
  writeJSONFile,
  importCSVIntoJSON,
  validateRow
};
