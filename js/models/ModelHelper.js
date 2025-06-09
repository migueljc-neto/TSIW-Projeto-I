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

  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
  }).format(date);
}
