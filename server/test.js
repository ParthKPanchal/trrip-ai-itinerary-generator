const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.pokrsyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("CONNECTED");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });