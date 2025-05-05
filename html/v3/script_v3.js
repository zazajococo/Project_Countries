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

function displayCountries(page) {
    tBody.innerHTML = ""; 
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const countriesAll = Country.all_countries.slice(start, end);
    countriesAll.forEach(country => {
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
        density.textContent = country.getPopDensity() || 'N/A';
        continent.textContent = country.continent || 'N/A';
        for (c of countries) {
            if (country.alpha3 == c.alpha3Code) {
                const flagImg = document.createElement('img');
                flagImg.src = c.flags.svg;
                flagImg.onclick = (event) => {
                                event.stopPropagation(); // Empêche le clic sur le drapeau d'ouvrir les détails
                                showLargeFlag(flagImg.src);
                            };
                flag.appendChild(flagImg);
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
    const independant = document.createElement('td');
    const borders = document.createElement('td');

    code.textContent = country.alpha3 || 'N/A';
    if (country.getLanguages) {
        for (let l of country.languages) {
            language.textContent += l.name;
            if (l.name != country.languages[country.languages.length - 1].name) {
                language.textContent += ', ';
            }
        }
    } else {
        language.textContent = 'N/A';
    }

    if (country.getCurrencies) {
        for (let c of country.currencies) {
            monnaie.textContent += c.name + ' (' + c.symbol + ')';
            if (c.name != country.currencies[country.currencies.length - 1].name) {
                monnaie.textContent += ', ';
            }
        }
    } else {
        monnaie.textContent = 'N/A';
    }

    subregion.textContent = country.subregion || 'N/A';
    timezones.textContent = country.timezones || 'N/A';
    nativename.textContent = country.nativeName || 'N/A';
    borders.textContent = country.getNeighbors(country.neighbors) || 'N/A';
    if (country.independent == true) {
        independant.textContent = 'Oui';
    } else {
        independant.textContent = 'Non';
    }

    row.appendChild(code);
    row.appendChild(nativename);
    row.appendChild(subregion);
    row.appendChild(borders);
    row.appendChild(timezones);
    row.appendChild(monnaie);
    row.appendChild(language);
    row.appendChild(independant);
    detailsTableBody.appendChild(row);
    //console.log de row et de tbody
    console.log(row);
    console.log(detailsTableBody);
    detailsContainer.style.display = 'block';
}
    
function showLargeFlag(flagSrc) {
    largeFlag.src = flagSrc; // Affiche le drapeau en grand
    flagContainer.style.display = 'block';

}

closeFlag.onclick = () => {
    flagContainer.style.display = 'none';
}
    
closeDetails.onclick = () => {
    detailsContainer.style.display = 'none'; // Masque la zone de détails
};

function changePage(page) {
    currentPage = page;
    displayCountries(currentPage);
    updatePaginationButtons();
}

displayCountries(currentPage);


function updatePaginationButtons() {
    const totalPages = Math.ceil(Country.all_countries.length / itemsPerPage);
    console.log("tot = ", totalPages)
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

updatePaginationButtons();