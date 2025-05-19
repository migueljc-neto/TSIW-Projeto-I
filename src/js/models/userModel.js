let users;

// Load users from localstorage
export function init() {
  users = localStorage.users ? JSON.parse(localStorage.users) : [];
}

// Add User
export function add(name, email, password, passwordConfirm) {
  if (password !== passwordConfirm) {
    throw Error("As Passwords não coincidem!");
  }

  if (users.some((user) => user.email === email)) {
    throw Error(`Já existe um utilizador com o email "${email}"!`);
  }

  const id = Date.now();
  users.push(new User(id, name, email, password, false));
  localStorage.setItem("users", JSON.stringify(users));
}

// User Login
export function login(email, password, keepSigned) {
  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new Error("Não existe nenhum utilizador com o email introduzido!");
  }

  if (user.password !== password) {
    throw new Error("Password Incorreta!");
  }

  if (keepSigned) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
  } else {
    sessionStorage.setItem("loggedUser", JSON.stringify(user));
  }
  return true;
}

// User Logout
export function logout() {
  sessionStorage.removeItem("loggedUser") ||
    localStorage.removeItem("loggedUser");
}

// Checks if user is logged in
export function isLogged() {
  return (
    !!sessionStorage.getItem("loggedUser") ||
    !!localStorage.getItem("loggedUser")
  );
}

export function getUserLogged() {
  let user = sessionStorage.getItem("loggedUser");
  if (!user) {
    user = localStorage.getItem("loggedUser");
  }
  return user ? JSON.parse(user) : null;
}

/**
 * User class
 */
class User {
  id = null;
  name = "";
  email = "";
  password = "";
  isAdmin = false;

  constructor(id, name, email, password, isAdmin) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}
