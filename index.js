const express = require("express");
require("dotenv").config();

const router = require("./server")

const app = express();

app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/client", "build", "index.html"));
  });
}

const PORT = 7000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
