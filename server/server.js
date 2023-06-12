const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

mongoose
  .connect(`${process.env.MONGO_URI}/job`)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

// 32 ka na
