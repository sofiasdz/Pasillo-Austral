import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import topicsRoutes from "./routes/topics.routes.js";
import materialsRoutes from "./routes/materials.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

app.use(cors());
app.use(express.json());



// Fix para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir carpeta public
app.use('/assets', express.static('assets'));

app.use("/uploads", express.static("uploads"));



app.get('/', (req, res) => {
  res.send('Backend corriendo!');
});

// rutas de autenticación
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/topics", topicsRoutes);
app.use("/materials", materialsRoutes);
app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
  });


app.listen(3001, () => {
  console.log("Backend corriendo en http://localhost:3001");
});
