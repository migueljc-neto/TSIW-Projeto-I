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
        miles: {
          available: 236,
          total: 4300,
        },
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@teste.com",
        password: "bob1234",
        isAdmin: true,
        miles: {
          available: 465,
          total: 2020,
        },
      },
      {
        id: 3,
        name: "Charlie",
        email: "charlie@teste.com",
        password: "charlie1234",
        isAdmin: false,
        miles: {
          available: 200,
          total: 1300,
        },
      },
      {
        id: 4,
        name: "teste",
        email: "boba@teste.com",
        password: "123",
        isAdmin: false,
        miles: {
          available: 10,
          total: 1240,
        },
      },
    ];
    console.log("inject");
    localStorage.setItem("users", JSON.stringify(users));
  }
}
