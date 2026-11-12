import express from "express";
import multer from "multer";
import cors from "cors";
import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.static("."));

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const upload = multer({ dest: "uploads/" });

app.post("/remove-bg", upload.single("image"), async (req, res) => {
  try {
    console.log("Chobi asche server e...");
    if (!req.file) {
      return res.status(400).json({ error: "Chobi pai nai" });
    }
    const inputPath = req.file.path;
    const fileBuffer = fs.readFileSync(inputPath);
    const imageBlob = new Blob([fileBuffer], { type: req.file.mimetype });

    const blob = await removeBackground(imageBlob, {
      publicPath: 'https://staticimgly.com/@imgly/background-removal-data/'
    });

    const buffer = Buffer.from(await blob.arrayBuffer());
    try { fs.unlinkSync(inputPath); } catch(e) {}
    res.set("Content-Type", "image/png");
    res.send(buffer);
    console.log("Hoye gese! Server theke pathano holo.");
  } catch (e) {
    console.error("AI Fail Detail:", e.message);
    res.status(500).json({ error: "AI fail: " + e.message });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server cholse port " + PORT));
