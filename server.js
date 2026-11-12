import express from "express";
import path from "path";

const app = express();

app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server cholse port " + PORT));
