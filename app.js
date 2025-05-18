const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("src"));

// Para aceitar JSON vindo do cliente
app.use(express.json());

const userPath = path.join(__dirname, "src/json/users.json");

// Rota POST para registar novo user
app.post("/api/register", (req, res) => {
  const newUser = req.body;
  updateUsers(newUser);
  res.json({ message: "Utilizador registado com sucesso!" });
});

function getUsers() {
  const data = fs.readFileSync(userPath);
  return JSON.parse(data);
}

function updateUsers(newUser) {
  const users = getUsers();
  users.push(newUser);
  fs.writeFileSync(userPath, JSON.stringify(users, null, 2));
}

app.get("/api/users", (req, res) => {
  res.json(getUsers());
});

app.listen(port, () => {
  console.log(`Compass on http://localhost:${port}`);
});
