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

// Serve static files
app.use('/assets', express.static('assets'));
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/topics", topicsRoutes);
app.use("/materials", materialsRoutes);
app.use("/comments", commentsRoutes);
app.use("/search", searchRouter);

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.get('/api', (req, res) => {
  res.send("API funcionando 🚀");
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});
