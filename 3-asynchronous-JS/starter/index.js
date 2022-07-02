const fs = require("fs");
const superagent = require("superagent");
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      fs.writeFile("dog-img-2.txt", res.body.message, (err) => {
        if (err) return console.log(err.message);

        console.log("image saved");
      }).catch((err) => {
        console.log(res.body.message);
      });
    });
});
