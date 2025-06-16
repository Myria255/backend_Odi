const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'wechat',
  password: 'debo',
  port: 5432,
});


app.get("/membres", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM membres");
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur GET :", err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/membres", async (req, res) => { 
  const { nom, email } = req.body;

  console.log("Données reçues :", req.body); 

  if (!nom || !email) {
    return res.status(400).json({ error: "Nom et email requis" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO membres (nom, email) VALUES ($1, $2) RETURNING *",
      [nom, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erreur POST :", err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY timestamp ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/messages', async (req, res) => {
  const { sender, content } = req.body;
  if (!sender || !content) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  try {
    await pool.query(
      'INSERT INTO messages (sender, content) VALUES ($1, $2)',
      [sender, content]
    );
    res.status(201).json({ message: 'Message envoyé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("✅ API en écoute sur http://localhost:3000");
});
