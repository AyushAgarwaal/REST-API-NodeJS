const express = require("express");
const CustomError = require("./middleware/customError");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
// const clusterMongo = require('./dB/connection');
const localMongo = require("./dB/localconnection");

// dotenv module with config method
require("dotenv").config();
// make app to start express server
const app = express();

//port
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use("/", routes);
app.use("/", productRoutes);
app.use('/', paginateRoutes)

app.all('*', async (req, res, next) => {
  next(new CustomError("Invalid endpoint", 404));
});

app.use(errorHandler);


app.listen(port, async () => {
  await localMongo().then(() => { console.log("Local Database connected"); });
  console.log("server running on port", port);
});

module.exports = app; 