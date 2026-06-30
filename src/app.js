const express = require("express");

const app = express();
//it will just handle get calls of user 
app.get('/hello',(req, res) => {
  res.send("Hello hello from the server! rohan (get)");
});
app.post('/hello',(req, res) => {
  res.send("Hello hello from the server! rohan (post)");
});
app.delete('/user',(req, res) => {
  res.send("deleted successfully");
});

//it will handle all calls of user
app.use('/hello/4',(req, res) => {
  res.send("Hello from the server! rohan nana");
});



app.listen(1000, () => {
  console.log("rohan is watching");
});
  

// it will check routing from top to bottom 
