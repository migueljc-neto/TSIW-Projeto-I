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
