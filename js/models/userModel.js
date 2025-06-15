// Variável para armazenar os utilizadores em memória
let users;

// Carrega os utilizadores do localStorage
export function init() {
  users = localStorage.users ? JSON.parse(localStorage.users) : [];
}

// Devolve todos os utilizadores
export function getAllUsers() {
  return users;
}

// Devolve um utilizador pelo seu ID
export function getUserById(id) {
  const numId = typeof id === "string" ? Number(id) : id;
  return users.find((user) => user.id === numId) || null;
}

// Verifica se o utilizador tem direito ao scratch (raspadinha semanal)
export function userHasScratch(userCheck) {
  if (!userCheck) {
    return false;
  }
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  // Só pode raspar se já passou uma semana desde o último scratch
  return oneWeekAgo.toISOString().split("T")[0] >= userCheck.lastScratch; // formato YYYY-MM-DD
}

// Atualiza um utilizador pelo ID
export function updateUser(id, { name, email, password, isAdmin }) {
  const numId = typeof id === "string" ? Number(id) : id;
  const user = users.find((user) => user.id === numId);

  if (!user) {
    throw Error("Utilizador não encontrado!");
  }

  // Verifica se já existe outro utilizador com o mesmo email
  if (users.some((user) => user.email === email && user.id !== numId)) {
    throw Error(`Já existe um utilizador com o email "${email}"!`);
  }

  user.name = name;
  user.email = email;
  user.isAdmin = isAdmin === true;

  // Se for fornecida nova password, faz hash e atualiza
  if (password !== "") {
    return hashPassword(password, "compass").then((hashedPassword) => {
      user.password = hashedPassword;
      localStorage.setItem("users", JSON.stringify(users));
      return user; // Devolve o utilizador atualizado
    });
  } else {
    localStorage.setItem("users", JSON.stringify(users));
    return Promise.resolve(user);
  }
}

// Atualiza o utilizador autenticado (logged in)
export function updateLoggedUser(id) {
  const user = users.find((u) => String(u.id) === String(id));
  if (!user) throw Error("Utilizador não encontrado!");

  localStorage.setItem("loggedUser", JSON.stringify(user));
  sessionStorage.setItem("loggedUser", JSON.stringify(user));
}

// Atualiza um utilizador por objeto
export function updateUserByObject(userToUpdate) {
  const userIndex = users.findIndex((user) => user.id === userToUpdate.id);

  if (userIndex === -1) {
    throw Error("Utilizador não encontrado!");
  }

  // Atualiza o utilizador no array
  users[userIndex] = { ...users[userIndex], ...userToUpdate };

  // Guarda no localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Atualiza também o utilizador logado se for o mesmo
  updateLoggedUser(userToUpdate.id);

  return users[userIndex];
}

// Atualiza as milhas do utilizador após o scratch
export function updateScratch(userCheck, milesWon) {
  const user = users.find((u) => String(u.id) === String(userCheck.id));
  const today = new Date();
  today.setDate(today.getDate());
  user.lastScratch = today.toISOString().split("T")[0];

  user.miles["available"] += milesWon;
  user.miles["total"] += milesWon;

  if (localStorage.getItem("loggedUser")) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
  } else {
    sessionStorage.setItem("loggedUser", JSON.stringify(user));
  }
  localStorage.setItem("users", JSON.stringify(users));
}

// Adiciona um novo utilizador
export function add(name, email, password, passwordConfirm) {
  if (password !== passwordConfirm) {
    throw Error("As Passwords não coincidem!");
  }

  if (users.some((user) => user.email === email)) {
    throw Error(`Já existe um utilizador com o email "${email}"!`);
  }

  return hashPassword(password).then((hashedPassword) => {
    const id = Date.now();
    users.push(new User(id, name, email, hashedPassword));
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  });
}

// Função para fazer hash da password (segurança)
function hashPassword(password, salt = "compass") {
  const te = new TextEncoder();
  return window.crypto.subtle
    .digest("SHA-256", te.encode(password + salt))
    .then((hashBuffer) => {
      const hashArray = new Uint8Array(hashBuffer);
      return btoa(String.fromCharCode(...hashArray));
    });
}

// Login do utilizador
export function login(email, password, keepSigned) {
  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new Error("Não existe nenhum utilizador com o email introduzido!");
  }

  return hashPassword(password).then((hashedPassword) => {
    if (user.password !== hashedPassword) {
      throw new Error("Password Incorreta!");
    }

    if (keepSigned) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } else {
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
    }
    return true;
  });
}

// Logout do utilizador
export function logout() {
  sessionStorage.removeItem("loggedUser") ||
    localStorage.removeItem("loggedUser");
}

// Guarda a query do utilizador (preferências de pesquisa)
export function setUserQuery(date, origin, typeOfTourism, passengers) {
  const userQuery = {
    date: date || "",
    origin: origin || "",
    typeOfTourism: typeOfTourism || "",
    passengers: passengers || 1,
  };
  sessionStorage.setItem("userQuery", JSON.stringify(userQuery));
}

// Verifica se existe um utilizador autenticado
export function isLogged() {
  return (
    !!sessionStorage.getItem("loggedUser") ||
    !!localStorage.getItem("loggedUser")
  );
}

// Verifica se o utilizador é administrador
export function isAdmin(user) {
  return user.isAdmin;
}

// Devolve o utilizador autenticado
export function getUserLogged() {
  let user = sessionStorage.getItem("loggedUser");
  if (!user) {
    user = localStorage.getItem("loggedUser");
  }
  return user ? JSON.parse(user) : null;
}

// Apaga um utilizador pelo ID
export function deleteUser(id) {
  const numId = typeof id === "string" ? Number(id) : id;

  const index = users.findIndex((user) => user.id === numId);

  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
}

// Remove um pack das viagens do utilizador
export function deletePack(id) {
  const packId = typeof id === "string" ? Number(id) : id;

  users.forEach((user) => {
    for (let i = user.trips.length - 1; i >= 0; i--) {
      if (user.trips[i].id === packId) {
        user.trips.splice(i, 1);
      }
    }
  });
  localStorage.setItem("users", JSON.stringify(users));
}

/**
 * Classe User que representa um utilizador
 */
class User {
  id = null;
  name = "";
  email = "";
  password = "";
  isAdmin = false;
  homeAirport = "";
  miles = { available: 0, total: 0 };
  trips = 0;
  badges = [];
  favorites = [];
  trips = [];
  lastScratch = "";
  tourismTypes = [];

  constructor(
    id,
    name,
    email,
    password,
    isAdmin,
    homeAirport,
    miles = { available: 0, total: 0 },
    badges = [],
    favorites = [],
    trips = [],
    lastScratch,
    tourismTypes = []
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.homeAirport = homeAirport;
    this.miles = miles;
    this.badges = badges;
    this.favorites = favorites;
    this.trips = trips;
    this.lastScratch = lastScratch;
    this.tourismTypes = tourismTypes;
  }
}
