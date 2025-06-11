const tBody = document.getElementById('countriesTableBody');
const paginationContainer = document.getElementById('pagination');
const itemsPerPage = 25;
let currentPage = 1;
const detailsTableBody = document.getElementById('detailsTableBody');
const largeFlag = document.getElementById('largeFlag');
const closeDetails = document.getElementById('closeDetails');
const detailsContainer = document.getElementById('detailsContainer');
const flagContainer = document.getElementById('flagContainer');
const closeFlag = document.getElementById('closeFlag');
const continentFilter = document.getElementById('continentFilter');
const languageFilter = document.getElementById('languageFilter');
const countiresFilter = document.getElementById('countriesFilter');

// Variable pour stocker les pays filtrés
let tabCountryFilters = [];

/* 
Function displayCountries(page)
Permet d'afficher le tableau de pays avec une pagination
1 page = 25 pays
Ajout d'un paramètre countryFilters qui stocke les pays filtrés ou tous les pays
*/
function displayCountries(page, countryFilters = Country.all_countries) {
    tBody.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const countriesToDisplay = countryFilters.slice(start, end);

    countriesToDisplay.forEach(country => {
        const row = document.createElement('tr');
        const name = document.createElement('td');
        const capital = document.createElement('td');
        const population = document.createElement('td');
        const area = document.createElement('td');
        const density = document.createElement('td');
        const continent = document.createElement('td');
        const flag = document.createElement('td');

        name.textContent = country.name || 'N/A';
        capital.textContent = country.capital || 'N/A';
        population.textContent = country.population || 'N/A';
        area.textContent = country.area || 'N/A';
        density.textContent = country.getPopDensity?.() || 'N/A';
        continent.textContent = country.continent || 'N/A';

        for (const c of countries) {
            if (country.alpha3 === c.alpha3Code) {
                const flagImg = document.createElement('img');
                flagImg.src = c.flags.svg;
                flagImg.onclick = (event) => {
                    event.stopPropagation();
                    showLargeFlag(flagImg.src);
                };
                flag.appendChild(flagImg);
                break;
            }
        }

        row.onclick = () => showDetails(country);

        row.appendChild(name);
        row.appendChild(capital);
        row.appendChild(population);
        row.appendChild(area);
        row.appendChild(density);
        row.appendChild(continent);
        row.appendChild(flag);
        tBody.appendChild(row);
    });

    // Appel de la fonction
    updatePaginationButtons(countryFilters);
}

/* 
Function showDetails(country)
Permet d'afficher le détails d'un pays lors d'un click sur la ligne coresspondante
*/
function showDetails(country) {
    detailsTableBody.innerHTML = "";
    document.getElementById('countryName').textContent = country.name;

    const row = document.createElement('tr');
    const code = document.createElement('td');
    const nativename = document.createElement('td');
    const monnaie = document.createElement('td');
    const subregion = document.createElement('td');
    const timezones = document.createElement('td');
    const language = document.createElement('td');
    const independent = document.createElement('td');
    const borders = document.createElement('td');

    code.textContent = country.alpha3 || 'N/A';

    if (country.languages?.length) {
        language.textContent = country.languages.map(l => l.name).join(', ');
    } else {
        language.textContent = 'N/A';
    }

    if (country.currencies?.length) {
        monnaie.textContent = country.currencies.map(c => `${c.name} (${c.symbol})`).join(', ');
    } else {
        monnaie.textContent = 'N/A';
    }

    subregion.textContent = country.subregion || 'N/A';
    timezones.textContent = (country.timezones || []).join(', ') || 'N/A';
    nativename.textContent = country.nativeName || 'N/A';
    borders.textContent = country.getNeighbors?.(country.neighbors) || 'N/A';
    independent.textContent = country.independent ? 'Oui' : 'Non';

    row.appendChild(code);
    row.appendChild(nativename);
    row.appendChild(subregion);
    row.appendChild(borders);
    row.appendChild(timezones);
    row.appendChild(monnaie);
    row.appendChild(language);
    row.appendChild(independent);
    detailsTableBody.appendChild(row);

    detailsContainer.style.display = 'block';
}

/* 
Function showLargeFlag(flagSrc)
Permet d'afficher le drapeau en grand sur la page
*/
function showLargeFlag(flagSrc) {
    largeFlag.src = flagSrc;
    flagContainer.style.display = 'block';
}

closeFlag.onclick = () => {
    flagContainer.style.display = 'none';
};

closeDetails.onclick = () => {
    detailsContainer.style.display = 'none';
};

/* 
Function changePage(page)
Permet de changer de page 
*/
function changePage(page) {
    currentPage = page;
    const countryFilters = tabCountryFilters
.length ? tabCountryFilters
 : Country.all_countries;
    displayCountries(currentPage, countryFilters);
}

/* 
Function updatePaginationButtons()
Permet d'afficher ou non les boutons PREC/SUIV
*/
function updatePaginationButtons(countryFilters = Country.all_countries) {
    const totalPages = Math.ceil(countryFilters.length / itemsPerPage);
    paginationContainer.innerHTML = "";

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'PREC';
        prevButton.onclick = () => changePage(currentPage - 1);
        paginationContainer.appendChild(prevButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'SUIV';
        nextButton.onclick = () => changePage(currentPage + 1);
        paginationContainer.appendChild(nextButton);
    }
}

// Appel de la fonction
displayCountries(currentPage);

/* 
Function filter
Permet de récupérer filtres que l'utilisateur souhaite
*/
function filter() {
    const continents = new Set(countries.map(country => country.region).filter(Boolean));
    [...continents].sort().forEach(continent => {
        const option = document.createElement('option');
        option.value = continent;
        option.textContent = continent;
        continentFilter.appendChild(option);
    });

    const tabLanguages = countries.flatMap(country => country.languages.map(lang => lang.name));
    const languages = new Set(tabLanguages.filter(Boolean));
    [...languages].sort().forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        languageFilter.appendChild(option);
    });

    continentFilter.addEventListener('change', applyFilters);
    languageFilter.addEventListener('change', applyFilters);
    countriesFilter.addEventListener('input', applyFilters);
}

/* 
Function applyFilters()
Permet d'appliquer les filtres au tableau et d'appeler la fonction displayCountries(currentPage, tabCountryFilters) pour afficher seulement les pays filtrés
*/
function applyFilters() {
    const selectedContinent = continentFilter.value;
    const selectedLanguage = languageFilter.value;
    const selectedCountries = countriesFilter.value.trim().toLowerCase();

    tabCountryFilters = countries.filter(pays => {
        const matchContinent = !selectedContinent || pays.region === selectedContinent;
        const matchLanguage = !selectedLanguage || pays.languages.some(lang => lang.name === selectedLanguage);
        const matchPays = !selectedPays || pays.translations.fr.toLowerCase().includes(selectedPays) || pays.name.toLowerCase().includes(selectedPays) ;
        return matchContinent && matchLanguage && matchPays;
    });

    currentPage = 1;
    displayCountries(currentPage, tabCountryFilters);
}
// Appel de la fonction
filter();
