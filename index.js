require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = 5000;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas");

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("Server running");
});