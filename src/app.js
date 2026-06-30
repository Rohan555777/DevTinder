const express = require("express");

const app = express();
//it will just handle get calls of user
app.get('/user/:userIdb', (req, res) => {
  console.log(req.params)
  res.send("Hello hello from the server! rohan (get)");
});

app.listen(1000, () => {
  console.log("rohan is watching");
});

/*

it will check routing from top to bottom


 /.ab?c/ :  this ? Because the letter b is optional, this single route will match two different URLs:

 /.ab+c/  : The + means the b can repeat. Matches /abc, /abbc, /abbbc.

The * is a wildcard. Matches /abcd, /abRANDOMcd, /ab123cd.

"/ab(cd)?e", ...) thsi is old way to use this in '' now you use regex

The () groups characters. The cd block is optional. Matches /abe and /abcde.

*/
