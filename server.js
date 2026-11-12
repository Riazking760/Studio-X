import express from "express";
import multer from "multer";
import cors from "cors";
import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.static("."));

const upload = multer({ dest: "uploads/" });

app.post("/remove-bg", upload.single("image"), async (req, res) => {
  try {
    console.log("Chobi asche...");
    const inputPath = req.file.path;
    const blob = await removeBackground(inputPath);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.unlinkSync(inputPath);
    res.set("Content-Type", "image/png");
    res.send(buffer);
    console.log("Hoye gese!");
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI fail" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server cholse port " + PORT));
