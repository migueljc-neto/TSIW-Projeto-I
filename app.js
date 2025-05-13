const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("src"));

// Para aceitar JSON vindo do cliente (fetch POST, etc)
app.use(express.json());

// Rota de teste para registo
app.post("/api/register", (req, res) => {
  console.log("Dados recebidos:", req.body);
  res.json({ message: "Registo recebido!" });
});

app.get("/api/users", (req, res) => {
  const filePath = path.join(__dirname, "src/json/users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Failed to load users" });
    }

    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
