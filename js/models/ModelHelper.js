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

class Movie {
  title = "";
  releaseYear = "";
  director = "";
  duration = 0;
  actors = [];
  constructor(title, releaseYear, director, duration, actors) {
    this.title = title;
    this.releaseYear = releaseYear;
    this.director = director;
    this.duration = duration;
    this.actors = actors;
  }
}

const movieObj = new Movie("title", "200", "directorA", 90, ["a", "b"]);
console.log(movieObj);
