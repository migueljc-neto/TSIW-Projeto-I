export function getAllCountries() {
  return fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => data.map((country) => country.cca2));
}

export function createDestinObj(destinName, latitude, longitude) {
  const obj = {
    objName: destinName,
    lat: latitude,
    long: longitude,
  };

  return obj;
}
