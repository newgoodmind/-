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
  
  // Minimal logging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
  });

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // API Routes - defined specifically and early
  app.all("/api/portfolio", (req, res) => {
    console.log(`[ROUTE HIT] ${req.method} /api/portfolio from ${req.ip}`);
    
    // Handle GET
    if (req.method === "GET") {
      const dataPath = path.resolve(process.cwd(), "data", "portfolio.json");
      try {
        if (!fs.existsSync(dataPath)) {
          console.error("DATA FILE NOT FOUND AT:", dataPath);
          return res.status(404).json({ error: "Portfolio data file is missing on the server storage." });
        }
        const raw = fs.readFileSync(dataPath, "utf-8");
        const json = JSON.parse(raw);
        return res.json(json);
      } catch (err) {
        console.error("CRITICAL ERROR IN GET /api/portfolio:", err);
        return res.status(500).json({ error: "Server failed to process portfolio data." });
      }
    }

    // Handle POST (Save)
    if (req.method === "POST") {
      const { password, data } = req.body;
      if (password !== "9511") {
        return res.status(401).json({ error: "Unauthorized access attempt." });
      }
      try {
        const dataPath = path.resolve(process.cwd(), "data", "portfolio.json");
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        console.log("Portfolio data updated successfully.");
        return res.json({ message: "Successfully updated." });
      } catch (err) {
        console.error("CRITICAL ERROR IN POST /api/portfolio:", err);
        return res.status(500).json({ error: "Failed to save changes to disk." });
      }
    }

    return res.status(405).json({ error: "Method not allowed" });
  });

  app.get("/api/health", (req, res) => res.json({ status: "alive", time: new Date().toISOString() }));
  app.get("/api/ping", (req, res) => res.send("pong"));

  app.post("/api/auth", (req, res) => {
    const { password } = req.body;
    if (password === "9511") {
      return res.json({ success: true });
    }
    return res.status(401).json({ success: false });
  });

  // Explicit 404 for other API routes to prevent falling through to SPA
  app.use("/api/*", (req, res) => {
    console.log(`[API 404] ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: `API route '${req.originalUrl}' not found on this server.` });
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
