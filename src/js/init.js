initdata();

function initdata() {
  // USERS
  if (!localStorage.users) {
    const users = [
      {
        id: 1,
        name: "Alice",
        email: "alice@teste.com",
        password: "alice1234",
        isAdmin: false,
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@teste.com",
        password: "bob1234",
        isAdmin: true,
      },
      {
        id: 3,
        name: "Charlie",
        email: "charlie@teste.com",
        password: "charlie1234",
        isAdmin: false,
      },
      {
        id: 4,
        name: "teste",
        email: "boba@teste.com",
        password: "123",
        isAdmin: false,
      },
    ];
    console.log("inject");
    localStorage.setItem("users", JSON.stringify(users));
  }
}
