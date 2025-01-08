require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Ensure the app binds to all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
