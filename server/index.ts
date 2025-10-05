import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { bioStarStartup } from "./services/biostar-startup";
import { doorHealthHandler, doorOpenHandler } from "./biostar";

const app = express();
app.get("/api/biostar/debug", (req, res) => {
  res.json({
    BIOSTAR_SERVER_URL: process.env.BIOSTAR_SERVER_URL,
    BIOSTAR_USERNAME: process.env.BIOSTAR_USERNAME,
    BIOSTAR_LOGIN_ID: process.env.BIOSTAR_LOGIN_ID,
    BIOSTAR_PASSWORD: process.env.BIOSTAR_PASSWORD ? "***set***" : "(missing)",
    DOOR_ID: process.env.DOOR_ID || process.env.BIOSTAR_DOOR_ID || null,
  });
});


// ===== Raw body middleware for WhatsApp webhook signature verification =====
app.use('/api/webhooks/whatsapp', express.raw({ type: 'application/json' }));

// ===== JSON middleware for all other routes =====
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ===== BioStar routes (אחרי ה-middlewares, לפני שאר הראוטים) =====
app.get("/api/door/health", doorHealthHandler);
app.get("/api/door/open",   doorOpenHandler);

// מכאן ממשיכים שאר הדברים (registerRoutes/serveStatic/setupVite/app.listen וכו')


app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Initialize BioStar connection
  try {
    console.log('Starting BioStar initialization...');
    await bioStarStartup.initialize();
  } catch (error) {
    console.error('BioStar initialization failed, continuing without facial recognition:', error);
  }

  registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  const port = parseInt(process.env.PORT || '5000', 10);
  const server = app.listen(port, "127.0.0.1", () => {
    log(`serving on port ${port} (localhost only - secure mode)`);
    console.log('[Security] Server bound to localhost (127.0.0.1) only - door control endpoints protected');
  });
  
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
})();
