const express = require("express");

const app = express();
app.use('/hello',(req, res) => {
  res.send("Hello hello from the server! rohan");
});
app.use('/test',(req, res) => {
  res.send("Hello from the server! rohan");
});
app.listen(1000, () => {
  console.log("rohan is watching");
});
  