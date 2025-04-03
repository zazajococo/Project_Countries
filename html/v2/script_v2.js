/* Tous les pays 
À partir de template.html, créez une page countries_v1.html (+ script_v1.js) qui 
affiche la liste de tous les pays provenant du tableau all_countries. Cette fois-ci, les 
<tr>  de  la  <table>  vont  être  construits  dynamiquement,  en  énumérant  les  données 
JSON et en manipulant le DOM pour ajouter vos <tr */

const tBody = document.getElementById('countriesTableBody');
const paginationContainer = document.getElementById('pagination'); // Utilisez le bon ID
const itemsPerPage = 25; 
let currentPage = 1;

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
        prevButton.textContent = 'PRECmoi';
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