import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import cors from "cors";

const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/portfolio", (req, res) => {
    try {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read portfolio data" });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
