let countriesData;

export function getAllCountries() {
  return fetch("https://restcountries.com/v3.1/all?fields=cca2,continents")
    .then((response) => response.json())
    .then((data) => {
      countriesData = data;
      return data;
    });
}

export function formatDateToLabel(dateString) {
  const [year, month, day] = dateString.split("-");
  const currentYear = new Date().getFullYear().toString();

  if (year === currentYear) {
    return `${day}/${month}`;
  } else {
    return `${day}/${month}/${year}`;
  }
}

// Função para formatar hora (ex: "14:30")
export function formatTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getIata(company) {
  // Mapeamento de nomes de companhias para códigos IATA (para mostrar o logo)
  const IATA_CODES = {
    TAP: "TP",
    Vueling: "VY",
    Iberia: "IB",
    "Air France": "AF",
    "British Airways": "BA",
    Lufthansa: "LH",
    Ryanair: "FR",
    KLM: "KL",
    "Swiss Air": "LX",
    "Austrian Airlines": "OS",
    SAS: "SK",
    Norwegian: "DY",
    "Aer Lingus": "EI",
    "Aegean Airlines": "A3",
    "Turkish Airlines": "TK",
    "Brussels Airlines": "SN",
    "Czech Airlines": "OK",
    Finnair: "AY",
    "ITA Airways": "AZ",
    Icelandair: "FI",
    "Air Europa": "UX",
    EasyJet: "U2",
    Delta: "DL",
  };

  return IATA_CODES[company] || company;
}

export function formatDate(isoString) {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
  }).format(date);
}

// Calcula desconto: para cada 100 milhas, desconta 20€ do preço final
export function calculateDiscount(miles, finalPrice) {
  return finalPrice - Math.floor(miles / 100) * 20;
}

/* Scratchoff */
export function mouseEvent(type, sx, sy, cx, cy) {
  var evt;
  var e = {
    bubbles: true,
    cancelable: type != "mousemove",
    view: window,
    detail: 0,
    screenX: sx,
    screenY: sy,
    clientX: cx,
    clientY: cy,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button: 0,
    relatedTarget: undefined,
  };
  if (typeof document.createEvent == "function") {
    evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(
      type,
      e.bubbles,
      e.cancelable,
      e.view,
      e.detail,
      e.screenX,
      e.screenY,
      e.clientX,
      e.clientY,
      e.ctrlKey,
      e.altKey,
      e.shiftKey,
      e.metaKey,
      e.button,
      document.body.parentNode
    );
  } else if (document.createEventObject) {
    evt = document.createEventObject();
    for (prop in e) {
      evt[prop] = e[prop];
    }
    evt.button = { 0: 1, 1: 4, 2: 2 }[evt.button] || evt.button;
  }
  return evt;
}
export function dispatchEvent(el, evt) {
  if (el.dispatchEvent) {
    el.dispatchEvent(evt);
  } else if (el.fireEvent) {
    el.fireEvent("on" + type, evt);
  }
  return evt;
}

// Vai buscar o nome do aeroporto a uma API externa
export function fetchAirportName(iataCode) {
  const url = `https://airport-info.p.rapidapi.com/airport?iata=${iataCode}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "64760f03c0msh7ee6b39d8565e2dp1c0847jsnc47c37b50d04",
      "X-RapidAPI-Host": "airport-info.p.rapidapi.com",
    },
  };

  return fetch(url, options)
    .then((response) => {
      if (!response.ok)
        throw new Error("Network response was not ok: " + response.status);
      return response.json();
    })
    .then((data) => {
      return data.name;
    })
    .catch((error) => {
      console.error("Error fetching airport info:", error);
      return null;
    });
}

export function createDestinObj(destinName, latitude, longitude, poi) {
  const obj = {
    objName: destinName,
    lat: latitude,
    long: longitude,
    pois: poi,
  };

  return obj;
}

export function formatDateToYMD(dateString) {
  const [day, month, year] = dateString.split("-");

  return Date.parse(`${year},${month},${day}`);
}

export function formatFlightTime(dateString) {
  const date = dateString.split("T")[0];
}

export function getTurismTypeId(tourismType) {
  let tourismTypesArray = JSON.parse(localStorage.getItem("tourismTypes"));
  for (const [id, type] of Object.entries(tourismTypesArray)) {
    if (tourismType === type) {
      console.log(id);

      return id;
    }
  }
}

export function focusPoi() {
  console.log(poi.name);
}
