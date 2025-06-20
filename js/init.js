initdata();

function initdata() {
  // USERS
  if (!localStorage.users) {
    const users = [
      {
        id: 1,
        name: "Alice",
        email: "alice@compass.com",
        password: "Iv2mJg5C99wWDBEFHvktDKSlnqcV8x5ldNtBbkFR/gU=",
        isAdmin: false,
        miles: {
          available: 236,
          total: 4300,
        },
        trips: [1],
        badges: ["us", "fr", "jp", "de"],
        favorites: ["Porto", "Barcelona"],
        lastScratch: "2025-04-08",
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@compass.com",
        password: "doj2kmjCoFbaRTTgL17Qm6h9BvhI9krOnzlF7O9tRXc=",
        isAdmin: true,
        miles: {
          available: 465,
          total: 2020,
        },
        trips: [2],
        badges: ["br", "pt", "es"],
        favorites: ["Rio Grande do Sul", "Cidade do México", "Roménia"],
        lastScratch: "2025-06-04",
      },
      {
        id: 3,
        name: "Charlie",
        email: "charlie@compass.com",
        password: "T1seFreOPCHSRHhB/+briZwYHvkvnNuAZzzcnZCUIfM=",
        isAdmin: false,
        miles: {
          available: 200,
          total: 1300,
        },
        trips: [1, 2],
        badges: ["it", "ca", "mx", "nl"],
        favorites: ["Nova Iorque", "Las Vegas"],
        lastScratch: "2025-06-04",
      },
      {
        id: 4,
        name: "John",
        email: "john@compass.com",
        password: "JPjElV6dkZO6hqE9ccWLJqJ1UXqbTl+WjlWH7x9uS9Q=",
        isAdmin: false,
        miles: {
          available: 10,
          total: 1240,
        },
        trips: [2],
        badges: ["au", "ch", "se"],
        favorites: ["Andorra", "Madrid"],
        lastScratch: "2025-06-08",
      },
    ];
    console.log("Injecting Data");
    localStorage.setItem("users", JSON.stringify(users));
  }

  // TOURISM TYPE
  if (!localStorage.tourismTypes) {
    const tourismTypes = [
      { id: 1, name: "Aventura" },
      { id: 2, name: "Praia" },
      { id: 3, name: "Religioso" },
      { id: 4, name: "Gastronómico" },
    ];
    localStorage.setItem("tourismTypes", JSON.stringify(tourismTypes));
    console.log("Tourism types initialized");
  }

  // FLIGHTS
  if (!localStorage.flights) {
    const flights = [
      {
        id: 1,
        origin: "OPO",
        originName: "Porto",
        originLat: 41.2,
        originLong: -8.6,
        destination: "LIS",
        destinationName: "Lisboa",
        destinationLat: 38.7,
        destinationLong: -9.1,
        departureTime: "2025-07-01T08:00",
        arrivalTime: "2025-07-01T09:00",
        price: 60,
        duration: 60,
        company: "TAP",
        distance: 313,
        tourismTypes: [1, 2],
        poi: [
          {
            name: "Torre de Belém",
            latitude: 38.6916,
            long: -9.2159,
          },
          {
            name: "Mosteiro dos Jerónimos",
            latitude: 38.6979,
            long: -9.2061,
          },
        ],
        badge: "pt",
      },
      {
        id: 2,
        origin: "OPO",
        originName: "Porto",
        originLat: 41.2,
        originLong: -8.6,
        destination: "MAD",
        destinationName: "Madrid",
        destinationLat: 40.4,
        destinationLong: -3.7,
        departureTime: "2025-07-02T12:00",
        arrivalTime: "2025-07-02T14:00",
        price: 80,
        duration: 120,
        company: "Iberia",
        distance: 438,
        tourismTypes: [1, 3],
        poi: [
          {
            name: "Museo del Prado",
            latitude: 40.4138,
            long: -3.6921,
          },
          {
            name: "Parque del Retiro",
            latitude: 40.4153,
            long: -3.6844,
          },
        ],
        badge: "es",
      },
      {
        id: 3,
        origin: "LIS",
        originName: "Lisboa",
        originLat: 38.7,
        originLong: -9.1,
        destination: "BCN",
        destinationName: "Barcelona",
        destinationLat: 41.4,
        destinationLong: 2.2,
        departureTime: "2025-07-03T13:00",
        arrivalTime: "2025-07-03T15:00",
        price: 90,
        duration: 120,
        company: "Vueling",
        distance: 1006,
        tourismTypes: [2, 3],
        poi: [
          {
            name: "Sagrada Família",
            latitude: 41.4036,
            long: 2.1744,
          },
          {
            name: "Casa Batlló",
            latitude: 41.3916,
            long: 2.1649,
          },
        ],
        badge: "pt",
      },
      {
        id: 4,
        origin: "MAD",
        originName: "Madrid",
        originLat: 40.4,
        originLong: -3.7,
        destination: "PAR",
        destinationName: "Paris",
        destinationLat: 48.8,
        destinationLong: 2.3,
        departureTime: "2025-07-04T17:00",
        arrivalTime: "2025-07-04T19:00",
        price: 100,
        duration: 120,
        company: "Air France",
        distance: 1052,
        tourismTypes: [1, 4],
        poi: [
          {
            name: "Torre Eiffel",
            latitude: 48.8584,
            long: 2.2945,
          },
          {
            name: "Louvre",
            latitude: 48.8606,
            long: 2.3376,
          },
        ],
        badge: "fr",
      },
      {
        id: 5,
        origin: "BCN",
        originName: "Barcelona",
        originLat: 41.4,
        originLong: 2.2,
        destination: "ROM",
        destinationName: "Roma",
        destinationLat: 41.9,
        destinationLong: 12.5,
        departureTime: "2025-07-05T18:00",
        arrivalTime: "2025-07-05T20:00",
        price: 110,
        duration: 120,
        company: "ITA Airways",
        distance: 859,
        tourismTypes: [2, 5],
        poi: [
          {
            name: "Coliseu",
            latitude: 41.8902,
            long: 12.4922,
          },
          {
            name: "Fontana di Trevi",
            latitude: 41.9009,
            long: 12.4833,
          },
        ],
        badge: "es",
      },
      {
        id: 6,
        origin: "ROM",
        originName: "Roma",
        originLat: 41.9,
        originLong: 12.5,
        destination: "ATH",
        destinationName: "Atenas",
        destinationLat: 37.9,
        destinationLong: 23.7,
        departureTime: "2025-07-07T09:00",
        arrivalTime: "2025-07-07T12:00",
        price: 120,
        duration: 180,
        company: "Aegean",
        distance: 1050,
        tourismTypes: [2, 6],
        poi: [
          {
            name: "Acrópole",
            latitude: 37.9715,
            long: 23.7267,
          },
          {
            name: "Partenon",
            latitude: 37.9715,
            long: 23.7267,
          },
        ],
        badge: "it",
      },
      {
        id: 7,
        origin: "ATH",
        originName: "Atenas",
        originLat: 37.9,
        originLong: 23.7,
        destination: "IST",
        destinationName: "Istanbul",
        destinationLat: 41.0,
        destinationLong: 28.9,
        departureTime: "2025-07-09T14:00",
        arrivalTime: "2025-07-09T16:00",
        price: 130,
        duration: 120,
        company: "Turkish Airlines",
        distance: 563,
        tourismTypes: [6, 7],
        poi: [
          {
            name: "Hagia Sophia",
            latitude: 41.0086,
            long: 28.9802,
          },
          {
            name: "Blue Mosque",
            latitude: 41.0054,
            long: 28.9768,
          },
        ],
        badge: "tr",
      },
      {
        id: 65,
        origin: "BCN",
        originName: "Barcelona",
        originLat: 41.4,
        originLong: 2.2,
        destination: "IST",
        destinationName: "Istanbul",
        destinationLat: 41.0,
        destinationLong: 28.9,
        departureTime: "2025-07-25T14:00",
        arrivalTime: "2025-07-25T16:00",
        price: 130,
        duration: 120,
        company: "Turkish Airlines",
        distance: 563,
        tourismTypes: [6, 7],
        poi: [
          {
            name: "Grand Bazaar",
            latitude: 41.0106,
            long: 28.9681,
          },
        ],
        badge: "tr",
      },
      {
        id: 654,
        origin: "IST",
        originName: "Istanbul",
        originLat: 41.0,
        originLong: 28.9,
        destination: "ATH",
        destinationName: "Atenas",
        destinationLat: 37.9,
        destinationLong: 23.7,
        departureTime: "2025-07-29T14:00",
        arrivalTime: "2025-07-29T16:00",
        price: 130,
        duration: 120,
        company: "Turkish Airlines",
        distance: 563,
        tourismTypes: [6, 7],
        poi: [
          {
            name: "Ancient Agora",
            latitude: 37.9753,
            long: 23.7215,
          },
        ],
        badge: "tr",
      },
      {
        id: 8,
        origin: "PAR",
        originName: "Paris",
        originLat: 48.8,
        originLong: 2.3,
        destination: "LON",
        destinationName: "Londres",
        destinationLat: 51.5,
        destinationLong: -0.1,
        departureTime: "2025-07-08T10:00",
        arrivalTime: "2025-07-08T11:30",
        price: 95,
        duration: 90,
        company: "British Airways",
        distance: 344,
        tourismTypes: [4, 5],
        poi: [
          {
            name: "Big Ben",
            latitude: 51.4994,
            long: -0.1245,
          },
          {
            name: "Tower Bridge",
            latitude: 51.5055,
            long: -0.0754,
          },
        ],
        badge: "gb",
      },
      {
        id: 9,
        origin: "LON",
        originName: "Londres",
        originLat: 51.5,
        originLong: -0.1,
        destination: "OPO",
        destinationName: "Porto",
        destinationLat: 41.2,
        destinationLong: -8.6,
        departureTime: "2025-07-10T15:00",
        arrivalTime: "2025-07-10T17:00",
        price: 105,
        duration: 120,
        company: "Ryanair",
        distance: 1313,
        tourismTypes: [1, 2],
        poi: [
          {
            name: "Torre dos Clérigos",
            latitude: 41.1458,
            long: -8.6145,
          },
          {
            name: "Livraria Lello",
            latitude: 41.1469,
            long: -8.615,
          },
        ],
        badge: "pt",
      },
      {
        id: 11,
        origin: "AMS",
        originName: "Amsterdam",
        originLat: 52.4,
        originLong: 4.9,
        destination: "BER",
        destinationName: "Berlin",
        destinationLat: 52.5,
        destinationLong: 13.4,
        departureTime: "2025-07-11T10:00",
        arrivalTime: "2025-07-11T11:30",
        price: 100,
        duration: 90,
        company: "easyJet",
        distance: 359,
        poi: [
          {
            name: "Brandenburg Gate",
            latitude: 52.5163,
            long: 13.3777,
          },
          {
            name: "Checkpoint Charlie",
            latitude: 52.5075,
            long: 13.3903,
          },
        ],
        tourismTypes: [1, 5],
        badge: "nl",
      },
      {
        id: 12,
        origin: "BER",
        originName: "Berlim",
        originLat: 52.5,
        originLong: 13.4,
        destination: "PRG",
        destinationName: "Prague",
        destinationLat: 50.1,
        destinationLong: 14.4,
        departureTime: "2025-07-13T13:00",
        arrivalTime: "2025-07-13T14:15",
        price: 70,
        duration: 75,
        company: "Eurowings",
        distance: 175,
        poi: [
          {
            name: "Charles Bridge",
            latitude: 50.0865,
            long: 14.4114,
          },
          {
            name: "Prague Castle",
            latitude: 50.091,
            long: 14.4016,
          },
        ],
        tourismTypes: [1, 3],
        badge: "cz",
      },
      {
        id: 13,
        origin: "PRG",
        originName: "Praga",
        originLat: 50.1,
        originLong: 14.4,
        destination: "VIE",
        destinationName: "Vienna",
        destinationLat: 48.2,
        destinationLong: 16.4,
        departureTime: "2025-07-15T15:00",
        arrivalTime: "2025-07-15T16:10",
        price: 60,
        duration: 70,
        company: "Austrian Airlines",
        distance: 158,
        poi: [
          {
            name: "Schönbrunn Palace",
            latitude: 48.1847,
            long: 16.3122,
          },
          {
            name: "St. Stephen's Cathedral",
            latitude: 48.2084,
            long: 16.3731,
          },
        ],
        tourismTypes: [3, 4],
        badge: "it",
      },
      {
        id: 14,
        origin: "VIE",
        originName: "Vienna",
        originLat: 48.2,
        originLong: 16.4,
        destination: "ZRH",
        destinationName: "Zurich",
        destinationLat: 47.4,
        destinationLong: 8.5,
        departureTime: "2025-07-17T17:00",
        arrivalTime: "2025-07-17T18:30",
        price: 95,
        duration: 90,
        company: "Swiss",
        distance: 383,
        poi: [
          {
            name: "Lake Zurich",
            latitude: 47.3667,
            long: 8.55,
          },
          {
            name: "Grossmünster",
            latitude: 47.37,
            long: 8.5441,
          },
        ],
        tourismTypes: [4, 7],
        badge: "ch",
      },
      {
        id: 15,
        origin: "ZRH",
        originName: "Zurique",
        originLat: 47.4,
        originLong: 8.5,
        destination: "MUC",
        destinationName: "Munich",
        destinationLat: 48.1,
        destinationLong: 11.6,
        departureTime: "2025-07-19T20:00",
        arrivalTime: "2025-07-19T21:10",
        price: 85,
        duration: 70,
        company: "Lufthansa",
        distance: 196,
        poi: [
          {
            name: "Marienplatz",
            latitude: 48.1374,
            long: 11.5755,
          },
          {
            name: "Neuschwanstein Castle",
            latitude: 47.5576,
            long: 10.7498,
          },
        ],
        tourismTypes: [1, 4],
        badge: "de",
      },
      {
        id: 16,
        origin: "MUC",
        originName: "Munique",
        originLat: 48.1,
        originLong: 11.6,
        destination: "OPO",
        destinationName: "Porto",
        destinationLat: 41.2,
        destinationLong: -8.6,
        departureTime: "2025-07-21T09:00",
        arrivalTime: "2025-07-21T11:00",
        price: 120,
        duration: 120,
        company: "TAP",
        distance: 1350,
        poi: [
          {
            name: "Ribeira",
            latitude: 41.1408,
            long: -8.6156,
          },
          {
            name: "Palácio da Bolsa",
            latitude: 41.1421,
            long: -8.615,
          },
        ],
        tourismTypes: [3],
        badge: "pt",
      },
      {
        id: 17,
        origin: "OPO",
        originName: "Porto",
        originLat: 41.2,
        originLong: -8.6,
        destination: "FAO",
        destinationName: "Faro",
        destinationLat: 37.0,
        destinationLong: -7.9,
        departureTime: "2025-07-18T13:00",
        arrivalTime: "2025-07-18T14:00",
        price: 60,
        duration: 60,
        company: "TAP",
        distance: 288,
        poi: [
          {
            name: "Praia de Faro",
            latitude: 37.0194,
            long: -7.9655,
          },
          {
            name: "Ria Formosa",
            latitude: 37.0267,
            long: -7.8319,
          },
        ],
        tourismTypes: [2, 8],
        badge: "pt",
      },
      {
        id: 18,
        origin: "FAO",
        originName: "Faro",
        originLat: 37.0,
        originLong: -7.9,
        destination: "LIS",
        destinationName: "Lisboa",
        destinationLat: 38.7,
        destinationLong: -9.1,
        departureTime: "2025-07-20T15:00",
        arrivalTime: "2025-07-20T16:00",
        price: 70,
        duration: 60,
        company: "Ryanair",
        distance: 173,
        poi: [
          {
            name: "Castelo de São Jorge",
            latitude: 38.7139,
            long: -9.1334,
          },
        ],
        tourismTypes: [1, 2],
        badge: "pt",
      },
      {
        id: 19,
        origin: "LIS",
        originName: "Lisboa",
        originLat: 38.7,
        originLong: -9.1,
        destination: "DUB",
        destinationName: "Dublin",
        destinationLat: 53.3,
        destinationLong: -6.2,
        departureTime: "2025-07-22T08:00",
        arrivalTime: "2025-07-22T10:30",
        price: 140,
        duration: 150,
        company: "Aer Lingus",
        distance: 1015,
        poi: [
          {
            name: "Trinity College",
            latitude: 53.3438,
            long: -6.2546,
          },
          {
            name: "Temple Bar",
            latitude: 53.3456,
            long: -6.2649,
          },
        ],
        tourismTypes: [1, 3],
        badge: "IE",
      },
      {
        id: 20,
        origin: "DUB",
        originName: "Dublin",
        originLat: 53.3,
        originLong: -6.2,
        destination: "OPO",
        destinationName: "Porto",
        destinationLat: 41.2,
        destinationLong: -8.6,
        departureTime: "2025-07-24T12:00",
        arrivalTime: "2025-07-24T14:00",
        price: 150,
        duration: 120,
        company: "Ryanair",
        distance: 1135,
        poi: [
          {
            name: "Casa da Guitarra",
            latitude: 41.145,
            long: -8.6108,
          },
        ],
        tourismTypes: [1],
        badge: "pt",
      },
      {
        id: 21,
        origin: "OPO",
        originName: "Porto",
        originLat: 41.2,
        originLong: -8.6,
        destination: "AMS",
        destinationName: "Amsterdão",
        destinationLat: 52.4,
        destinationLong: 4.9,
        departureTime: "2025-07-25T07:00",
        arrivalTime: "2025-07-25T10:00",
        price: 100,
        duration: 180,
        company: "Transavia",
        distance: 1600,
        tourismTypes: [1, 4],
        poi: [
          {
            name: "Anne Frank House",
            latitude: 52.3752,
            long: 4.884,
          },
          {
            name: "Rijksmuseum",
            latitude: 52.36,
            long: 4.8852,
          },
        ],
        badge: "nl",
      },
      {
        id: 22,
        origin: "AMS",
        originName: "Amsterdão",
        originLat: 52.4,
        originLong: 4.9,
        destination: "OSL",
        destinationName: "Oslo",
        destinationLat: 59.9,
        destinationLong: 10.8,
        departureTime: "2025-07-27T13:00",
        arrivalTime: "2025-07-27T15:30",
        price: 130,
        duration: 150,
        company: "Norwegian",
        distance: 960,
        tourismTypes: [1, 7],
        poi: [
          {
            name: "Vigeland Park",
            latitude: 59.9267,
            long: 10.7005,
          },
          {
            name: "Opera House",
            latitude: 59.9075,
            long: 10.7537,
          },
        ],
        badge: "no",
      },
      {
        id: 23,
        origin: "OSL",
        originName: "Oslo",
        originLat: 59.9,
        originLong: 10.8,
        destination: "HEL",
        destinationName: "Helsínquia",
        destinationLat: 60.2,
        destinationLong: 24.9,
        departureTime: "2025-07-29T09:00",
        arrivalTime: "2025-07-29T12:00",
        price: 140,
        duration: 180,
        company: "Finnair",
        distance: 780,
        tourismTypes: [6, 7],
        poi: [
          {
            name: "Helsinki Cathedral",
            latitude: 60.1707,
            long: 24.9519,
          },
          {
            name: "Suomenlinna",
            latitude: 60.1459,
            long: 24.9882,
          },
        ],
        badge: "fi",
      },
      {
        id: 24,
        origin: "HEL",
        originName: "Helsínquia",
        originLat: 60.2,
        originLong: 24.9,
        destination: "OPO",
        destinationName: "Porto",
        destinationLat: 41.2,
        destinationLong: -8.6,
        departureTime: "2025-07-31T10:00",
        arrivalTime: "2025-07-31T13:30",
        price: 160,
        duration: 210,
        company: "TAP",
        distance: 2850,
        tourismTypes: [4],
        poi: [
          {
            name: "Serralves Museum",
            latitude: 41.159,
            long: -8.6596,
          },
        ],
        badge: "fi",
      },
      {
        id: 25,
        origin: "OPO",
        originName: "Porto",
        originLat: 41.2,
        originLong: -8.6,
        destination: "MIL",
        destinationName: "Milão",
        destinationLat: 45.4,
        destinationLong: 9.2,
        departureTime: "2025-08-01T08:00",
        arrivalTime: "2025-08-01T11:00",
        price: 110,
        duration: 180,
        company: "ITA Airways",
        distance: 1450,
        tourismTypes: [4, 6],
        poi: [
          {
            name: "Duomo di Milano",
            latitude: 45.4642,
            long: 9.19,
          },
          {
            name: "La Scala",
            latitude: 45.4669,
            long: 9.1898,
          },
        ],
        badge: "it",
      },
      {
        id: 26,
        origin: "MIL",
        originName: "Milão",
        originLat: 45.4,
        destinationLong: 9.2,
        destination: "VEN",
        destinationName: "Veneza",
        destinationLat: 45.5,
        destinationLong: 12.3,
        departureTime: "2025-08-03T14:00",
        arrivalTime: "2025-08-03T15:00",
        price: 80,
        duration: 60,
        company: "Alitalia",
        distance: 245,
        tourismTypes: [5, 6],
        poi: [
          {
            name: "St. Mark's Square",
            latitude: 45.4342,
            long: 12.338,
          },
          {
            name: "Doge's Palace",
            latitude: 45.434,
            long: 12.3404,
          },
        ],
        badge: "it",
      },
      {
        id: 27,
        origin: "VEN",
        originName: "Veneza",
        originLat: 45.5,
        originLong: 12.3,
        destination: "FLR",
        destinationName: "Florença",
        destinationLat: 43.8,
        destinationLong: 11.2,
        departureTime: "2025-08-05T10:00",
        arrivalTime: "2025-08-05T11:00",
        price: 70,
        duration: 60,
        company: "Vueling",
        distance: 205,
        tourismTypes: [5, 6],
        poi: [
          {
            name: "Uffizi Gallery",
            latitude: 43.7687,
            long: 11.256,
          },
          {
            name: "Ponte Vecchio",
            latitude: 43.7679,
            long: 11.253,
          },
        ],
        badge: "it",
      },
      {
        id: 28,
        origin: "FLR",
        originName: "Florença",
        originLat: 43.8,
        originLong: 11.2,
        destination: "NAP",
        destinationName: "Nápoles",
        destinationLat: 40.8,
        destinationLong: 14.3,
        departureTime: "2025-08-07T16:00",
        arrivalTime: "2025-08-07T17:00",
        price: 75,
        duration: 60,
        company: "ITA Airways",
        distance: 295,
        tourismTypes: [2, 4],
        poi: [
          {
            name: "Pompeia",
            latitude: 40.7489,
            long: 14.4897,
          },
          {
            name: "Vesúvio",
            latitude: 40.8202,
            long: 14.4289,
          },
        ],
        badge: "it",
      },
      {
        id: 29,
        origin: "NAP",
        originName: "Nápoles",
        originLat: 40.8,
        originLong: 14.3,
        destination: "PAL",
        destinationName: "Palermo",
        destinationLat: 38.1,
        destinationLong: 13.4,
        departureTime: "2025-08-09T12:00",
        arrivalTime: "2025-08-09T13:30",
        price: 85,
        duration: 90,
        company: "Alitalia",
        distance: 305,
        tourismTypes: [2, 4],
        poi: [
          {
            name: "Teatro Massimo",
            latitude: 38.1198,
            long: 13.3583,
          },
          {
            name: "Cattedrale di Palermo",
            latitude: 38.1137,
            long: 13.3564,
          },
        ],
        badge: "it",
      },
      {
        id: 30,
        origin: "PAL",
        originName: "Palermo",
        originLat: 38.1,
        originLong: 13.4,
        destination: "OPO",
        destinationName: "Porto",
        destinationLat: 41.2,
        destinationLong: -8.6,
        departureTime: "2025-08-11T15:00",
        arrivalTime: "2025-08-11T17:30",
        price: 145,
        duration: 150,
        company: "TAP",
        distance: 1380,
        tourismTypes: [1, 2],
        poi: [
          {
            name: "Ponte D. Luís I",
            latitude: 41.140944,
            long: -8.611389,
          },
          {
            name: "Torre dos Clérigos",
            latitude: 41.145556,
            long: -8.614167,
          },
          {
            name: "Livraria Lello",
            latitude: 41.146944,
            long: -8.614722,
          },
        ],
        badge: "pt",
      },
      {
        id: 31,
        origin: "OPO",
        originName: "Porto",
        originLat: 41.2,
        originLong: -8.6,
        destination: "WAR",
        destinationName: "Varsóvia",
        destinationLat: 52.2,
        destinationLong: 21.0,
        departureTime: "2025-08-02T11:00",
        arrivalTime: "2025-08-02T15:00",
        price: 130,
        duration: 240,
        company: "LOT",
        distance: 2100,
        tourismTypes: [1, 5],
        poi: [
          {
            name: "Centro Histórico de Varsóvia",
            latitude: 52.249167,
            long: 21.012222,
            category: "Património UNESCO",
          },
          {
            name: "Palácio da Cultura e Ciência",
            latitude: 52.231944,
            long: 21.006111,
          },
          {
            name: "Castelo Real",
            latitude: 52.247778,
            long: 21.014167,
          },
        ],
        badge: "pl",
      },
      {
        id: 32,
        origin: "WAR",
        originName: "Varsóvia",
        originLat: 52.2,
        originLong: 21.0,
        destination: "BUD",
        destinationName: "Budapeste",
        destinationLat: 47.5,
        destinationLong: 19.0,
        departureTime: "2025-08-04T13:00",
        arrivalTime: "2025-08-04T14:30",
        price: 90,
        duration: 90,
        company: "Wizz Air",
        distance: 395,
        tourismTypes: [3, 4],
        poi: [
          {
            name: "Parlamento Húngaro",
            latitude: 47.507222,
            long: 19.045556,
          },
          {
            name: "Termas Széchenyi",
            latitude: 47.518611,
            long: 19.081944,
          },
          {
            name: "Bastião dos Pescadores",
            latitude: 47.502222,
            long: 19.034444,
          },
        ],
        badge: "hu",
      },
      {
        id: 33,
        origin: "BUD",
        originName: "Budapeste",
        originLat: 47.5,
        originLong: 19.0,
        destination: "BUC",
        destinationName: "Bucareste",
        destinationLat: 44.4,
        destinationLong: 26.1,
        departureTime: "2025-08-06T16:00",
        arrivalTime: "2025-08-06T17:30",
        price: 80,
        duration: 90,
        company: "TAROM",
        distance: 395,
        tourismTypes: [5, 6],
        poi: [
          {
            name: "Palácio do Parlamento",
            latitude: 44.427222,
            long: 26.087222,
          },
          {
            name: "Centro Histórico",
            latitude: 44.430556,
            long: 26.102778,
          },
          {
            name: "Arco do Triunfo",
            latitude: 44.467778,
            long: 26.078056,
          },
        ],
        badge: "ro",
      },
      {
        id: 34,
        origin: "BUC",
        originName: "Bucareste",
        originLat: 44.4,
        originLong: 26.1,
        destination: "SOF",
        destinationName: "Sofia",
        destinationLat: 42.7,
        destinationLong: 23.3,
        departureTime: "2025-08-08T09:00",
        arrivalTime: "2025-08-08T10:00",
        price: 65,
        duration: 60,
        company: "Wizzair",
        distance: 180,
        tourismTypes: [3, 5],
        poi: [
          {
            name: "Catedral Alexandre Nevsky",
            latitude: 42.696111,
            long: 23.332778,
          },
          {
            name: "Igreja de Santa Sofia",
            latitude: 42.696944,
            long: 23.331389,
          },
          {
            name: "Teatro Nacional Ivan Vazov",
            latitude: 42.695556,
            long: 23.326667,
          },
        ],
        badge: "bg",
      },
      {
        id: 35,
        origin: "SOF",
        originName: "Sofia",
        originLat: 42.7,
        originLong: 23.3,
        destination: "OPO",
        destinationName: "Porto",
        destinationLat: 41.2,
        destinationLong: -8.6,
        departureTime: "2025-08-10T14:00",
        arrivalTime: "2025-08-10T17:00",
        price: 155,
        duration: 180,
        company: "TAP",
        distance: 1750,
        tourismTypes: [],
        poi: [
          {
            name: "Estação de São Bento",
            latitude: 41.145833,
            long: -8.610556,
          },
          {
            name: "Mercado do Bolhão",
            latitude: 41.148889,
            long: -8.608056,
          },
          {
            name: "Casa da Música",
            latitude: 41.159444,
            long: -8.630556,
          },
        ],
        badge: "pt",
      },
      {
        id: 36,
        origin: "OSL",
        originName: "Oslo",
        originLat: 59.9,
        originLong: 10.8,
        destination: "STO",
        destinationName: "Estocolmo",
        destinationLat: 59.3,
        destinationLong: 18.1,
        departureTime: "2025-08-03T10:00",
        arrivalTime: "2025-08-03T11:00",
        price: 90,
        duration: 60,
        company: "SAS",
        distance: 305,
        tourismTypes: [6, 7],
        poi: [
          {
            name: "Gamla Stan",
            latitude: 59.325278,
            long: 18.070833,
          },
          {
            name: "Museu Vasa",
            latitude: 59.328056,
            long: 18.091389,
          },
          {
            name: "Palácio Real",
            latitude: 59.326667,
            long: 18.071944,
          },
        ],
        badge: "se",
      },
      {
        id: 37,
        origin: "STO",
        originName: "Estocolmo",
        originLat: 59.3,
        originLong: 18.1,
        destination: "CPH",
        destinationName: "Copenhaga",
        destinationLat: 55.6,
        destinationLong: 12.6,
        departureTime: "2025-08-05T15:00",
        arrivalTime: "2025-08-05T16:30",
        price: 85,
        duration: 90,
        company: "SAS",
        distance: 330,
        tourismTypes: [4, 6],
        poi: [
          {
            name: "Nyhavn",
            latitude: 55.679722,
            long: 12.591389,
          },
          {
            name: "Tivoli Gardens",
            latitude: 55.673611,
            long: 12.568056,
          },
          {
            name: "Pequena Sereia",
            latitude: 55.692778,
            long: 12.599444,
          },
        ],
        badge: "dk",
      },
    ];

    localStorage.setItem("flights", JSON.stringify(flights));
    console.log("Flights initialized");
  }

  // TRIPS
  if (!localStorage.trips) {
    const trips = [
      {
        id: 1,
        name: "Grand Tour Europeu",
        typesOfTourism: [1, 3, 4],
        price: 1250,
        startDate: "2025-07-01",
        endDate: "2025-07-12",
        isPack: true,
        flights: [1, 3, 5, 6, 7],
        miles: 4320,
        reviews: [
          {
            userId: 6,
            name: "Ana",
            message: "Adorei a viagem! Recomendo!",
            rating: 5,
            date: "17-06-2025",
          },
          {
            userId: 7,
            name: "José",
            message: "Gostei! :(",
            rating: 4,
            date: "19-06-2025",
          },
        ],
      },
      {
        id: 2,
        name: "Europa Central Clássica",
        typesOfTourism: [1, 3, 4],
        price: 980,
        startDate: "2025-07-03",
        endDate: "2025-07-10",
        isPack: true,
        flights: [8, 9, 10, 11, 12, 13],
        miles: 5430,
        reviews: [
          {
            userId: 8,
            name: "Maria",
            message: "Adorei a viagem! Recomendo!",
            rating: 5,
            date: "13-05-2025",
          },
          {
            userId: 6,
            name: "Ana",
            message: "Não gostei muito :(",
            rating: 2,
            date: "14-06-2025",
          },
        ],
      },
      {
        id: 3,
        name: "Alpes e Baviera",
        typesOfTourism: [1, 4],
        price: 450,
        startDate: "2025-07-04",
        endDate: "2025-07-08",
        isPack: false,
        flights: [14, 15, 16],
        miles: 2310,
        reviews: [],
      },
      {
        id: 4,
        name: "Portugal Completo",
        typesOfTourism: [2, 3, 4],
        price: 280,
        startDate: "2025-07-05",
        endDate: "2025-07-08",
        isPack: true,
        flights: [17, 18],
        miles: 300,
        reviews: [
          {
            userId: 23,
            name: "Bernardo",
            message: "Adorei a viagem! Recomendo!",
            rating: 5,
            date: "02-05-2025",
          },
          {
            userId: 21,
            name: "André",
            message: "Não gostei muito :(",
            rating: 2,
            date: "04-05-2025",
          },
        ],
      },
      {
        id: 5,
        name: "Escapadinha Irlandesa",
        typesOfTourism: [1, 3],
        price: 420,
        startDate: "2025-07-06",
        endDate: "2025-07-08",
        isPack: true,
        flights: [19, 20],
        miles: 900,
        reviews: [
          {
            userId: 26,
            name: "Vasco",
            message: "Adorei a viagem! Recomendo!",
            rating: 5,
            date: "02-05-2025",
          },
          {
            userId: 7,
            name: "José",
            message: "Fantástico! 5 estrelas!",
            rating: 5,
            date: "10-05-2025",
          },
        ],
      },
      {
        id: 6,
        name: "Rota Mediterrânica",
        typesOfTourism: [2, 4],
        price: 265,
        startDate: "2025-07-01",
        endDate: "2025-07-03",
        isPack: false,
        flights: [2, 4],
        miles: 700,
        reviews: [],
      },
      {
        id: 7,
        name: "Capitais Imperiais",
        typesOfTourism: [1, 3],
        price: 360,
        startDate: "2025-07-01",
        endDate: "2025-07-05",
        isPack: true,
        flights: [5, 6, 7],
        miles: 1540,
        reviews: [
          {
            userId: 18,
            name: "Marta",
            message: "Adorei a viagem! Recomendo!",
            rating: 5,
            date: "07-06-2025",
          },
          {
            userId: 15,
            name: "Paulo",
            message: "Não gostei muito :(",
            rating: 2,
            date: "07-06-2025",
          },
        ],
      },
      {
        id: 8,
        name: "Norte Europeu",
        typesOfTourism: [1, 3],
        price: 295,
        startDate: "2025-07-03",
        endDate: "2025-07-06",
        isPack: true,
        flights: [9, 10, 11],
        miles: 1675,
        reviews: [
          {
            userId: 46,
            name: "Charlie",
            message: "Adorei a viagem! Recomendo!",
            rating: 4,
            date: "07-06-2025",
          },
          {
            userId: 12,
            name: "Alice",
            message: "Super fácil de comprar e a melhor experiência :)",
            rating: 5,
            date: "03-06-2025",
          },
        ],
      },
    ];

    localStorage.setItem("trips", JSON.stringify(trips));
    console.log("Realistic travel packages initialized");
  }
}
