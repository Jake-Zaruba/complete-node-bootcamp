const fs = require(`fs`);
const http = require(`http`);
const path = require("path");
const url = require(`url`);

////////////////////////////////
/////FILES/////

/////BLOCKING - SYNCHRONOUS/////
// const textIn = fs.readFileSync(`./txt/input.txt`, `utf-8`);
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync(`./txt/output.txt`, textOut);
// console.log(`File written!`);

/////NON-BLOCKING - ASYNCHRONOUS/////
// fs.readFile(`./txt/start.txt`, `utf-8`, (err, data1) => {
//   if (err) return console.log(`ERROR!`);
//   fs.readFile(`./txt/${data1}.txt`, `utf-8`, (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, `utf-8`, (err, data3) => {
//       console.log(data3);

//       fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, (err) => {
//         console.log(`File has been written!`);
//       });
//     });
//   });
// });
// console.log(`Read this first`);
///////////////////////////////
/////SERVER/////

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, `utf-8`);
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;

  if (pathName === `/` || pathName === `/overview`) {
    res.end(`This is the overview page`);
  } else if (pathName === `/product`) {
    res.end(`This is the product`);
  } else if (pathName === `/api`) {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end(`<h1>Page not found</h1>`);
  }
});

server.listen(3000, `127.0.0.1`, () => {
  console.log(`Listening to request on port 3000`);
});
