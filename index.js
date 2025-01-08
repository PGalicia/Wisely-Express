require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas");

const PORT = process.env.PORT || 8080;

console.log('process.env.ATLAS_URI', process.env.ATLAS_URI);

// mongoose
//   .connect(process.env.ATLAS_URI)
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch((err) => console.error("Could not connect to MongoDB...", err));

// app.use(cors({
//   origin: process.env.CORS_ORIGIN
// }));

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: true,
//   })
// );

// Ensure the app binds to all network interfaces
// app.listen(PORT, '127.0.0.1', () => {
//   console.log(`Server running on port ${PORT}`);
// });

const http = require('node:http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Elastic Beanstalk!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
