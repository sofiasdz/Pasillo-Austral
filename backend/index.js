import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import topicsRoutes from "./routes/topics.routes.js";
import materialsRoutes from "./routes/materials.routes.js";
import path from 'path';
import commentsRoutes from './routes/comments.routes.js';
import { fileURLToPath } from 'url';
import searchRouter from "./routes/search.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (assets and uploads)
app.use('/assets', express.static('assets'));
app.use("/uploads", express.static("uploads"));

// API routes - MUST be before static frontend serving
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/topics", topicsRoutes);
app.use("/materials", materialsRoutes);
app.use("/comments", commentsRoutes);
app.use("/search", searchRouter);

app.get('/api', (req, res) => {
  res.send("API funcionando 🚀");
});

// Serve frontend build in production (must be last)
if (process.env.NODE_ENV === 'production') {
  // Only serve static files, don't serve index.html automatically
  app.use(express.static(path.join(__dirname, '../frontend/dist'), {
    index: false // Don't serve index.html automatically
  }));
  
  // Catch-all handler for SPA routing - only for non-API routes
  app.get('*', (req, res, next) => {
    // Skip if it's an API route or static file route
    if (req.path.startsWith('/api') || 
        req.path.startsWith('/auth') || 
        req.path.startsWith('/posts') || 
        req.path.startsWith('/topics') || 
        req.path.startsWith('/materials') || 
        req.path.startsWith('/comments') || 
        req.path.startsWith('/search') ||
        req.path.startsWith('/assets') ||
        req.path.startsWith('/uploads')) {
      return next(); // Let 404 handler deal with it if route doesn't exist
    }
    // For all other routes, serve the React app
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});