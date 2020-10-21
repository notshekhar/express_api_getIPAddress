const express = require("express");
const cors = require("cors");
const nedb = require("nedb");
require("dotenv").config();

const db = new nedb({ filename: "ips.db" });
db.loadDatabase();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  let ipAddress;
  let forwardedIpsStr = req.header("x-forwarded-for");
  if (forwardedIpsStr) {
    let forwardedIps = forwardedIpsStr.split(",");
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress;
  }
  db.insert({
    origin: req.get("origin") || req.headers.origin || "Can't get",
    ip: ipAddress,
    datetime: Date.now()
  });
  res.json({ ip: ipAddress });
});
app.get("/ips/:pass", (req, res) => {
  let { pass } = req.params;
  let envPass = process.env.PASS;

  if (pass == envPass) {
    db.find({}, (err, docs) => {
      res.json({ get: true, data: docs });
    });
  } else {
    res.json({ get: false, message: "Wrong Password" });
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
