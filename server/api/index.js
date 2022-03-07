const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ status: true, message: "API is working.." });
});

module.exports = router;
