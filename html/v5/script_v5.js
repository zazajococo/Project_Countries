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
const paysFilter = document.getElementById('paysFilter');

// Variable pour stocker les résultats filtrés
let paysFiltrés = [];

function displayCountries(page, data = Country.all_countries) {
    tBody.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const countriesToDisplay = data.slice(start, end);

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

    updatePaginationButtons(data);
}

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

function changePage(page) {
    currentPage = page;
    const data = paysFiltrés.length ? paysFiltrés : Country.all_countries;
    displayCountries(currentPage, data);
}

function updatePaginationButtons(data = Country.all_countries) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
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

// Initial display
displayCountries(currentPage);

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
    paysFilter.addEventListener('input', applyFilters);
}

function applyFilters() {
    const selectedContinent = continentFilter.value;
    const selectedLanguage = languageFilter.value;
    const selectedPays = paysFilter.value.trim().toLowerCase();

    paysFiltrés = countries.filter(pays => {
        const matchContinent = !selectedContinent || pays.region === selectedContinent;
        const matchLanguage = !selectedLanguage || pays.languages.some(lang => lang.name === selectedLanguage);
        const matchPays = !selectedPays || pays.translations.fr.toLowerCase().includes(selectedPays) || pays.name.toLowerCase().includes(selectedPays) ;
        return matchContinent && matchLanguage && matchPays;
    });

    currentPage = 1;
    displayCountries(currentPage, paysFiltrés);
}

filter();

/* 
localeCompare() : comparer deux chaine avec des règles lingustiques (accent, langue...)
Ex : str1.localeCompare(str2, langues, accents);
- str1, str2 : chaine a comparer
- langues : la ou les langues (fr, en ...)
- accents : sensitivity (differente maniere de comparer (accent, espace etc...))
Ex : str1.localeCompare(str2, 'fr', { sensitivity: 'base' });


*/

let ordreCroissant = true;
function trierNom() {
    const data = paysFiltrés.length ? paysFiltrés : Country.all_countries;
    data.sort((a, b) => {
        const nomA = a.name.toLowerCase(); // minuscule pour que se soit égale
        const nomB = b.name.toLowerCase(); // minuscule pour que se soit égale
        if (ordreCroissant) {
            return nomA.localeCompare(nomB, 'fr', { sensitivity: 'base' })
        } else {
            return nomB.localeCompare(nomA, 'fr', { sensitivity: 'base' })
        }
        
    });

    ordreCroissant = !ordreCroissant;
    displayCountries(currentPage, data);
}

function trierCapital() {
    const data = paysFiltrés.length ? paysFiltrés : Country.all_countries;
    data.sort((a, b) => {
        const capitalA = a.capital.toLowerCase(); // minuscule pour que se soit égale
        const capitalB = b.capital.toLowerCase(); // minuscule pour que se soit égale
        const nomA = a.name.toLowerCase(); // minuscule pour que se soit égale
        const nomB = b.name.toLowerCase(); // minuscule pour que se soit égale
        if (capitalA === capitalB) {
            if (ordreCroissant) {
                return nomA.localeCompare(nomB, 'fr', { sensitivity: 'base' })
            } else {
                return nomB.localeCompare(nomA, 'fr', { sensitivity: 'base' })
            }
        } else {
            if (ordreCroissant) {
                return capitalA.localeCompare(capitalB, 'fr', { sensitivity: 'base' })
            } else {
                return capitalB.localeCompare(capitalA, 'fr', { sensitivity: 'base' })
            }
        }
        
    });

    ordreCroissant = !ordreCroissant;
    displayCountries(currentPage, data);
}

function trierContinent() {
    const data = paysFiltrés.length ? paysFiltrés : Country.all_countries;
    data.sort((a, b) => {
        const continentA = a.continent.toLowerCase(); // minuscule pour que se soit égale
        const continentB = b.continent.toLowerCase(); // minuscule pour que se soit égale
        const nomA = a.name.toLowerCase(); // minuscule pour que se soit égale
        const nomB = b.name.toLowerCase(); // minuscule pour que se soit égale

        if (continentA === continentB) {
            if (ordreCroissant) {
                return nomA.localeCompare(nomB, 'fr', { sensitivity: 'base' })
            } else {
                return nomB.localeCompare(nomA, 'fr', { sensitivity: 'base' })
            }
        } else {
            if (ordreCroissant) {
                return continentA.localeCompare(continentB, 'fr', { sensitivity: 'base' })
            } else {
                return continentB.localeCompare(continentA, 'fr', { sensitivity: 'base' })
            }
        }
    });

    ordreCroissant = !ordreCroissant;
    displayCountries(currentPage, data);
}

function trierPopulation() {
    const data = paysFiltrés.length ? paysFiltrés : Country.all_countries;
    data.sort(function (a, b) {
        const populationA = a.population;
        const populationB = b.population;
        const nomA = a.name.toLowerCase(); // minuscule pour que se soit égale
        const nomB = b.name.toLowerCase(); // minuscule pour que se soit égale
        if (populationA === populationB) {
            if (ordreCroissant) {
                return nomA.localeCompare(nomB, 'fr', { sensitivity: 'base' })
            } else {
                return nomB.localeCompare(nomA, 'fr', { sensitivity: 'base' })
            }
        } else {
            if(ordreCroissant){
                return populationA - populationB;
            }else{
                return populationB - populationA;
            }
        }

        
      });


    ordreCroissant = !ordreCroissant;
    displayCountries(currentPage, data);
}

function trierSurface() {
    const data = paysFiltrés.length ? paysFiltrés : Country.all_countries;
    data.sort(function (a, b) {
        const surfaceA = a.area;
        const surfaceB = b.area;
        const nomA = a.name.toLowerCase(); // minuscule pour que se soit égale
        const nomB = b.name.toLowerCase(); // minuscule pour que se soit égale
        if (surfaceA === surfaceB) {
            if (ordreCroissant) {
                return nomA.localeCompare(nomB, 'fr', { sensitivity: 'base' })
            } else {
                return nomB.localeCompare(nomA, 'fr', { sensitivity: 'base' })
            }
        } else {
            if(ordreCroissant){
                return surfaceA - surfaceB;
            }else{
                return surfaceB - surfaceA;
            }
        }

        
      });


    ordreCroissant = !ordreCroissant;
    displayCountries(currentPage, data);
}

function trierDensite() {
    const data = paysFiltrés.length ? paysFiltrés : Country.all_countries;
    data.sort(function (a, b) {
        const densiteA = a.getPopDensity?.();
        const densiteB = b.getPopDensity?.();
        const nomA = a.name.toLowerCase(); // minuscule pour que se soit égale
        const nomB = b.name.toLowerCase(); // minuscule pour que se soit égale
        if (densiteA === densiteB) {
            if (ordreCroissant) {
                return nomA.localeCompare(nomB, 'fr', { sensitivity: 'base' })
            } else {
                return nomB.localeCompare(nomA, 'fr', { sensitivity: 'base' })
            }
        } else {
            if(ordreCroissant){
                return densiteA - densiteB;
            }else{
                return densiteB - densiteA;
            }
        }

        
      });


    ordreCroissant = !ordreCroissant;
    displayCountries(currentPage, data);
}

document.querySelectorAll("th").forEach(th => {
    th.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll("th").forEach(header => {
            header.classList.remove("th-bold");
        });

        th.classList.add("th-bold");
    });
});

// Cliquer ailleurs dans la page retire le gras
document.addEventListener("click", () => {
    document.querySelectorAll("th").forEach(th => {
        th.classList.remove("th-bold");
    });
});

