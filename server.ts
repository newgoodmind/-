import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data", "portfolio.json");

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/portfolio", (req, res) => {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        console.error(`Portfolio file not found at: ${DATA_FILE}`);
        return res.status(404).json({ error: "Portfolio data file not found on server" });
      }
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      try {
        const parsed = JSON.parse(data);
        res.json(parsed);
      } catch (parseError) {
        console.error("Failed to parse portfolio.json:", parseError);
        res.status(500).json({ error: "Portfolio data is corrupted (invalid JSON)" });
      }
    } catch (error) {
      console.error("Server error reading portfolio:", error);
      res.status(500).json({ error: "Failed to read portfolio data from disk" });
    }
  });

  app.post("/api/portfolio", (req, res) => {
    const { password, data } = req.body;
    if (password !== "9511") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      res.json({ message: "Portfolio updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save portfolio data" });
    }
  });

  app.post("/api/auth", (req, res) => {
    const { password } = req.body;
    if (password === "9511") {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  console.log("Data file path:", DATA_FILE);
  console.log("File exists:", fs.existsSync(DATA_FILE));

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
