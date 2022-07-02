const fs = require("fs");
const { resolve } = require("path");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("File not found");
      resolve(data);
    });
  });
};
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file");
      resolve("Success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    console.log(res.body.message);
    console.log(all);
    await writeFilePro("dog-img.txt", res.body.message);
    console.log("yeah");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: READY";
};

(async () => {
  try {
    console.log("will get dog pic");
    const x = await getDogPic();
    console.log(x);
    console.log("done getting dog pic");
  } catch (err) {
    console.log("error");
  }
})();

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     return writeFilePro("dog-img.txt", res.body.message);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
