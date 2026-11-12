import express from "express";
import path from "path";

const app = express();

// Frontend file gula serve korbe
app.use(express.static("."));

// Main page
app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

// Jodi onno kono page chay, tao index.html dibe
app.get("*", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server cholse port " + PORT));
