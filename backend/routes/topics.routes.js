import express from "express";
import fs from "fs";

const router = express.Router();

const TOPICS_FILE = "./topics.json";

// Leer topics
const getTopics = () => {
  try {
    const data = fs.readFileSync(TOPICS_FILE, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error leyendo topics.json:", error);
    return [];
  }
};

// Guardar topics
const saveTopics = (topics) => {
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2));
};

// GET ALL TOPICS
router.get("/", (req, res) => {
  const topics = getTopics();
  res.json(topics);
});

// GET TOPIC BY ID
router.get("/:id", (req, res) => {
  const topics = getTopics();
  const { id } = req.params;

  const topic = topics.find(t => t.id === parseInt(id));

  if (!topic) {
    return res.status(404).json({ message: "Topic no encontrado" });
  }

  res.json(topic);
});

// POST NEW TOPIC (opcional para futuro)
router.post("/", (req, res) => {
  const { title, description, membersCount, image } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title y description son requeridos" });
  }

  const topics = getTopics();
  const newTopic = {
    id: topics.length ? topics[topics.length - 1].id + 1 : 1,
    title,
    description,
    membersCount: membersCount || 0,
    image: image || null
  };

  topics.push(newTopic);
  saveTopics(topics);

  res.json({ message: "Topic creado", topic: newTopic });
});

export default router;
