const tBody = document.getElementById('countriesTableBody');

const countriesAll = Country.all_countries;

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

    tBody.appendChild(row);
});