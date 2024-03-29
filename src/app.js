const express = require("express");
const app = express();
const subscriberModel = require("./models/subscribers");
const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("./swagger.json");
const path = require("path");
// const url = require("url");

// Your code goes here
// configuration for static file path
// const __filename = url.fileURLToPath(url.URL);
// const __dirname = path.dirname(__filename);
app.use("/", express.static(path.join(__dirname, "../public")));
app.get("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

// ****************** Getting All users List
app.get("/subscribers", async (req, res, next) => {
  try {
    const subscribersArray = await subscriberModel.find({});
    if (subscribersArray.length !== 0) {
      res.status(200).json(subscribersArray);
      res.end();
    } else {
      res.status(200).json({ message: "No User Found" });
    }
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
});
// *************************************************

//******************** Getting All users Name and Subscribed channels
app.get("/subscribers/names", async (req, res, next) => {
  try {
    const subscribersArray = await subscriberModel.find(
      {},
      // this can also be done
      // "name subscribedChannel -_id"
      { _id: 0, name: 1, subscribedChannel: 1 }
      // _id is especially needed to be exculed if not requred to display
    );
    if (subscribersArray.length !== 0) {
      res.status(200).json(subscribersArray);
      res.end();
    } else {
      res.status(200).json({ message: "No User Found" });
    }
  } catch (err) {
    next(err);
  }
});
// **************************************************

// ******************* Getting Specific User by its id
app.get("/subscribers/:id", async (req, res, next) => {
  const subcriberId = req.params.id;
  try {
    const subscriberedUser = await subscriberModel.findById(subcriberId);
    res.status(200).json(subscriberedUser);
  } catch (err) {
    err.message = "Id does not Match check once and then retry";
    err.statusCode = 404;
    next(err);
  }
});
// ****************************************************

// ************************* Route Not Found Handling
app.all("*", (req, res, next) => {
  const err = new Error();
  err.statusCode = 404;
  err.message = "Route Not Found";
  next(err);
});

// ************************* Global Error Handling
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({
      status: err.statusCode || 500,
      message: err.message || "Internal Server Error",
    });
});

module.exports = app;
