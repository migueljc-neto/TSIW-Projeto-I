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
        homeAirport: "OPO",
        miles: {
          available: 236,
          total: 4300,
        },
        trips: 14,
        badges: ["us", "fr", "jp", "de"],
        favorites: ["BA123", "DL456"],
        tripsName: ["Summer Vacation", "Business Trip Q2"],
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@teste.com",
        password: "bob1234",
        isAdmin: true,
        homeAirport: "LAX",
        miles: {
          available: 465,
          total: 2020,
        },
        trips: 5,
        badges: ["br", "pt", "es"],
        favorites: ["AA789"],
        tripsName: ["South America Tour"],
      },
      {
        id: 3,
        name: "Charlie",
        email: "charlie@teste.com",
        password: "charlie1234",
        isAdmin: false,
        homeAirport: "LIS",
        miles: {
          available: 200,
          total: 1300,
        },
        trips: 3,
        badges: ["it", "ca", "mx", "nl"],
        favorites: ["UA321", "AC654"],
        tripsName: ["European Adventure", "Mexico Weekend"],
      },
      {
        id: 4,
        name: "teste",
        email: "boba@teste.com",
        password: "123",
        isAdmin: false,
        homeAirport: "SFO",
        miles: {
          available: 10,
          total: 1240,
        },
        trips: 4,
        badges: ["au", "ch", "se"],
        favorites: ["QF987"],
        tripsName: ["Australia Visit", "Switzerland Ski Trip"],
      },
    ];
    console.log("Injecting Data");
    localStorage.setItem("users", JSON.stringify(users));
  }
}
