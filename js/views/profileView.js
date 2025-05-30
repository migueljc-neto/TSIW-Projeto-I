import * as User from "../models/userModel.js";

document.body.classList.add("hidden");

const user = User.getUserLogged();

const userNameLabel = document.getElementById("userNameLabel");
const userEmailLabel = document.getElementById("userEmailLabel");
const userMilesLabel = document.getElementById("userMilesLabel");
const userTotalMilesLabel = document.getElementById("userTotalMilesLabel");
const userTripsLabel = document.getElementById("userTripsLabel");

const flagWrapper = document.getElementById("flagWrapper");

window.addEventListener("load", (event) => {
  if (user === null) {
    window.location.href = "../index.html";
  }

  document.title = `Compass - ${user.name}`;
  userNameLabel.insertAdjacentText("beforeend", ` ${user.name}`);
  userEmailLabel.insertAdjacentText("beforeend", ` ${user.email}`);
  userMilesLabel.insertAdjacentText("beforeend", ` ${user.miles["available"]}`);
  userTotalMilesLabel.insertAdjacentText(
    "beforeend",
    ` ${user.miles["total"]}`
  );
  userTripsLabel.insertAdjacentText("beforeend", ` ${user.trips}`);
  document.body.classList.remove("hidden");
  const userBadges = user.badges;
  let regionNames = new Intl.DisplayNames(["pt"], { type: "region" });
  userBadges.forEach((element) => {
    flagWrapper.insertAdjacentHTML(
      "beforeend",
      `
<div
              class="has-tooltip w-12 h-12 rounded overflow-hidden flex items-center justify-center"
            >
            <span class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>${regionNames.of(
              element.toUpperCase()
            )}</span>
              <img
                src="../img/flags/${element}.svg"
                alt="${element}"
                class="object-contain w-full h-full"
              />
            </div>`
    );
  });
});




// Country code to name mapping
const countryNames = {
  'br': 'Brasil',
  'pt': 'Portugal',
  'es': 'Espanha',
  'fr': 'França',
  'de': 'Alemanha',
  'it': 'Itália',
  'gb': 'Reino Unido',
  'us': 'Estados Unidos',
  'ca': 'Canadá',
  'au': 'Austrália',
  'jp': 'Japão',
  'cn': 'China',
  'ru': 'Rússia',
  'in': 'Índia',
  'za': 'África do Sul',
  'mx': 'México',
  'ar': 'Argentina',
  'cl': 'Chile',
  'co': 'Colômbia',
  'pe': 'Peru',
  've': 'Venezuela',
  'uy': 'Uruguai',
  'py': 'Paraguai',
  'bo': 'Bolívia',
  'ec': 'Equador',
  'cr': 'Costa Rica',
  'pa': 'Panamá',
  'gt': 'Guatemala',
  'hn': 'Honduras',
  'sv': 'El Salvador',
  'ni': 'Nicarágua',
  'do': 'República Dominicana',
  'cu': 'Cuba',
  'jm': 'Jamaica',
  'ht': 'Haiti',
  'bs': 'Bahamas',
  'tt': 'Trinidad e Tobago',
  'bb': 'Barbados',
  'gd': 'Granada',
  'lc': 'Santa Lúcia',
  'vc': 'São Vicente e Granadinas',
  'ag': 'Antígua e Barbuda',
  'dm': 'Dominica',
  'kn': 'São Cristóvão e Nevis',
  'sr': 'Suriname',
  'gy': 'Guiana',
  'gf': 'Guiana Francesa',
  'fk': 'Ilhas Malvinas',
  'gl': 'Groenlândia',
  'is': 'Islândia',
  'no': 'Noruega',
  'se': 'Suécia',
  'fi': 'Finlândia',
  'dk': 'Dinamarca',
  'nl': 'Países Baixos',
  'be': 'Bélgica',
  'lu': 'Luxemburgo',
  'ch': 'Suíça',
  'at': 'Áustria',
  'pl': 'Polônia',
  'cz': 'República Tcheca',
  'sk': 'Eslováquia',
  'hu': 'Hungria',
  'ro': 'Romênia',
  'bg': 'Bulgária',
  'gr': 'Grécia',
  'tr': 'Turquia',
  'ua': 'Ucrânia',
  'by': 'Bielorrússia',
  'lt': 'Lituânia',
  'lv': 'Letônia',
  'ee': 'Estônia',
  'md': 'Moldávia',
  'rs': 'Sérvia',
  'hr': 'Croácia',
  'si': 'Eslovênia',
  'ba': 'Bósnia e Herzegovina',
  'me': 'Montenegro',
  'mk': 'Macedônia do Norte',
  'al': 'Albânia',
  'mt': 'Malta',
  'cy': 'Chipre',
  'il': 'Israel',
  'lb': 'Líbano',
  'sy': 'Síria',
  'jo': 'Jordânia',
  'iq': 'Iraque',
  'ir': 'Irã',
  'sa': 'Arábia Saudita',
  'ye': 'Iêmen',
  'om': 'Omã',
  'ae': 'Emirados Árabes Unidos',
  'qa': 'Catar',
  'kw': 'Kuwait',
  'bh': 'Bahrein',
  'eg': 'Egito',
  'ly': 'Líbia',
  'tn': 'Tunísia',
  'dz': 'Argélia',
  'ma': 'Marrocos',
  'mr': 'Mauritânia',
  'ml': 'Mali',
  'sn': 'Senegal',
  'gm': 'Gâmbia',
  'gw': 'Guiné-Bissau',
  'gn': 'Guiné',
  'sl': 'Serra Leoa',
  'lr': 'Libéria',
  'ci': 'Costa do Marfim',
  'gh': 'Gana',
  'tg': 'Togo',
  'bj': 'Benin',
  'ng': 'Nigéria',
  'cm': 'Camarões',
  'td': 'Chade',
  'ne': 'Níger',
  'bf': 'Burkina Faso',
  'cf': 'República Centro-Africana',
  'cg': 'Congo',
  'cd': 'República Democrática do Congo',
  'ao': 'Angola',
  'zm': 'Zâmbia',
  'mw': 'Malawi',
  'mz': 'Moçambique',
  'zw': 'Zimbábue',
  'bw': 'Botswana',
  'na': 'Namíbia',
  'sz': 'Suazilândia',
  'ls': 'Lesoto',
  'mg': 'Madagascar',
  'km': 'Comores',
  'mu': 'Maurício',
  'sc': 'Seicheles',
  're': 'Reunião',
  'yt': 'Mayotte',
  'dj': 'Djibuti',
  'er': 'Eritreia',
  'et': 'Etiópia',
  'so': 'Somália',
  'ke': 'Quênia',
  'ug': 'Uganda',
  'rw': 'Ruanda',
  'bi': 'Burundi',
  'tz': 'Tanzânia',
  'zm': 'Zâmbia',
  'mw': 'Malawi',
  'mz': 'Moçambique',
  'zw': 'Zimbábue',
  'bw': 'Botswana',
  'na': 'Namíbia',
  'sz': 'Suazilândia',
  'ls': 'Lesoto',
  'mg': 'Madagascar',
  'km': 'Comores',
  'mu': 'Maurício',
  'sc': 'Seicheles',
  're': 'Reunião',
  'yt': 'Mayotte',
  'dj': 'Djibuti',
  'er': 'Eritreia',
  'et': 'Etiópia',
  'so': 'Somália',
  'ke': 'Quênia',
  'ug': 'Uganda',
  'rw': 'Ruanda',
  'bi': 'Burundi',
  'tz': 'Tanzânia'
};


function getCountryName(code) {
  return countryNames[code.toLowerCase()] || code.toUpperCase();
}


function createCountryElement(code) {
  const countryName = getCountryName(code);
  const div = document.createElement('div');
  div.className = 'flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer';
  
  const img = document.createElement('img');
  img.src = `../img/flags/${code.toLowerCase()}.svg`;
  img.alt = countryName;
  img.className = 'w-6 h-4 object-cover';
  
  const span = document.createElement('span');
  span.textContent = countryName;
  
  div.appendChild(img);
  div.appendChild(span);
  
  return div;
}


function populateCountriesList() {
  const countriesContainer = document.getElementById('allCountries');
  if (!countriesContainer) return;


  countriesContainer.innerHTML = '';


  Object.keys(countryNames).forEach(code => {
      const countryElement = createCountryElement(code);
      countriesContainer.appendChild(countryElement);
  });
}


function togglePassportModal() {
  const modal = document.getElementById('passportModal');
  if (!modal) return;

  if (modal.classList.contains('hidden')) {
      modal.classList.remove('hidden');
      populateCountriesList();
  } else {
      modal.classList.add('hidden');
  }
}

document.getElementById("passportButton").addEventListener("click", async (event) => {
  event.preventDefault();
  if (!User.isLogged()) {
    document.getElementById("loginModal").classList.remove("hidden");
    return;
  }
  countriesData = await getAvailableCountries();
  document.getElementById("passportModal").classList.remove("hidden");
  loadAllCountries();
});

document.addEventListener("click", (event) => {
  const modal = document.getElementById("passportModal");
  if (event.target.id === "closePassportModal" || event.target === modal) {
    modal.classList.add("hidden");
  }
}); 
