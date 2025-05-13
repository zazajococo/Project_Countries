/* 
Création du body de la table
*/
const tBody = document.getElementById('countriesTableBody');

/* 
Tous les pays
*/
const countriesAll = Country.all_countries;

/* 
Création d'un tableau de pays avec toute ses informations
1 ligne = 1 pays
*/
countriesAll.forEach(country => {
    const row = document.createElement('tr');
    const name = document.createElement('td');
    const capital = document.createElement('td');
    const population = document.createElement('td');
    const area = document.createElement('td');
    const continent = document.createElement('td');
    const flag = document.createElement('td');

    name.textContent = country.name || 'N/A';
    capital.textContent = country.capital || 'N/A';
    population.textContent = country.population || 'N/A';
    area.textContent = country.area || 'N/A';
    continent.textContent = country.continent || 'N/A';

    const flagImg = document.createElement('img');
    const countryFlag = countries.find(c => c.alpha3Code === country.alpha3);
    if (countryFlag) {
        flagImg.src = countryFlag.flags.svg;
    } else {
        flagImg.alt = 'Drapeau non disponible';
    }
    flag.appendChild(flagImg);

    row.appendChild(name);
    row.appendChild(capital);
    row.appendChild(population);
    row.appendChild(area);
    row.appendChild(continent);
    row.appendChild(flag);

    /* 
    Mise à jour du body de la table
    */
    tBody.appendChild(row);
});