const tBody = document.getElementById('countriesTableBody');
const paginationContainer = document.getElementById('pagination'); // Utilisez le bon ID
const itemsPerPage = 25; 
let currentPage = 1;

/* 
Function displayCountries(page)
Permet d'afficher le tableau de pays avec une pagination 
1 page = 25 pays
*/
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
        const continent = document.createElement('td');
        const flag = document.createElement('td');

        // put the data in the cells
        name.textContent = country.name || 'N/A';
        capital.textContent = country.capital || 'N/A';
        population.textContent = country.population || 'N/A';
        area.textContent = country.area || 'N/A';
        continent.textContent = country.continent || 'N/A';
        for (c of countries) {
            if (country.alpha3 == c.alpha3Code) {
                const flagImg = document.createElement('img');
                flagImg.src = c.flags.svg;
                flag.appendChild(flagImg);
            }   
        }

        row.appendChild(name);
        row.appendChild(capital);
        row.appendChild(population);
        row.appendChild(area);
        row.appendChild(continent);
        row.appendChild(flag);

        tBody.appendChild(row);
    }); 
}

/* 
Function changePage(page)
Permet de changer de page 
*/
function changePage(page) {
    currentPage = page;
    displayCountries(currentPage);
    updatePaginationButtons();
}

// Appel de la fonction 
displayCountries(currentPage);

/* 
Function updatePaginationButtons()
Permet d'afficher ou non les boutons PREC/SUIV
*/
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

// Appel de la fonction
updatePaginationButtons();