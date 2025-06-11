/* 
Test Q1
Fonction outsideTheContinent()
Tableau JS des pays (Objets Country) dont au moins un pays frontalier n'est pas dans le même continent
*/
function outsideTheContinent() {
    // utilisation de all_countries de la classe Country 
    const allCountries = Country.all_countries;

    const countriesOutside = allCountries.filter(country => {
        const borders = country.neighbors;
        // au moins un pays frontalier n'est pas dans le même continent
        return borders.some(border => {
            if (border != null && border.continent !== country.continent) {
                return true;
            }
            return false;
        });
    });

    console.table(countriesOutside);
}
// Appel de la fonction
//outsideTheContinent();

/* 
Test Q2
Fonction moreNeighbors()
Tableau des pays ayant le plus grand nombre de voisins. Affichez aussi les voisins.
*/
function moreNeighbors() {
    // utilisation de all_countries de la classe Country
    const allCountries = Country.all_countries;
    let maxNeighbors = 0;
    for (const country of allCountries) {
        const borders = country.neighbors;
        if (country.getNbNeighbors() >= maxNeighbors) {
            maxNeighbors = borders.length;
            console.log("Pays = ", country.name," NB = ", country.getNbNeighbors());    
            console.log("Voisins = ", country.getNeighbors(country.neighbors));
        }
        
    }
    
    const countriesWithMaxNeighbors = allCountries.filter(country => country.getNbNeighbors() === maxNeighbors);
    console.table(countriesWithMaxNeighbors);
}
// Appel de la fonction
//moreNeighbors();

/* 
Test Q3
Fonction neighborless()
Tableau des pays n'ayant aucun voisin.
*/
function neighborless() {
    // utilisation de all_countries de la classe Country
    const allCountries = Country.all_countries;
    const countriesWithoutNeighbors = allCountries.filter(country => country.getNbNeighbors() === 0);
    console.table(countriesWithoutNeighbors);
}

/* 
Test Q4
Fonction moreLanguages()
Tableau des pays parlant le plus de langues. Affichez aussi les langues (objets Language). 
*/
function moreLanguages() {
    // utilisation de all_countries de la classe Country
    const allCountries = Country.all_countries;
    let maxLanguages= 0;
    for (const country of allCountries) {
        const languages = country.languages;
        if (country.getNbLanguages() >= maxLanguages) {
            maxLanguages = languages.length;
            console.log("Pays = ", country.name," NB = ", country.getNbLanguages());    
            console.log("Langues = ", country.getLanguages(country.languages));
        }
        
    }
    
    const countriesWithMaxLanguages = allCountries.filter(country => country.getNbLanguages() === maxLanguages);
    console.table(countriesWithMaxNeighbors);
}

/* 
Test Q5
Fonction withCommonLanguage()
Tableau des pays ayant au moins un voisin parlant l’une de  ses  langues.  Affichez  aussi  les  pays  voisins  (objets  Country)  et  les  langues  en question (objets Language). 
*/
function withCommonLanguage() {
    const allCountries = Country.all_countries;
    const result = [];
    for (const country of allCountries) {
        let hasCommonLanguage = false;
        for (const neighbor of country.neighbors) {
            if (neighbor != null) {
                for (const language of country.languages) {
                    if (neighbor.languages.includes(language)) {
                        hasCommonLanguage = true;
                        break;
                    }
                }
            }
            if (!hasCommonLanguage) break;
        }
        if (hasCommonLanguage) {
            result.push(country);
        }
    }
    console.table(result);
}

/* 
Test Q6
Fonction withoutCommonCurrency()
Tableau  des  pays  sans  aucun  voisin ayant au moins une de ses monnaies. 
*/
function withoutCommonCurrency() {
    const allCountries = Country.all_countries;
    const result = [];
    for (const country of allCountries) {
        let hasCommonCurrency = false;
        for (const neighbor of country.neighbors) {
            if (neighbor != null) {
                for (const currency of country.currencies) {
                    if (neighbor.currencies.includes(currency)) {
                        hasCommonCurrency = true;
                        break;
                    }
                }
            }
            if (hasCommonCurrency) break;
        }
        if (!hasCommonCurrency) {
            result.push(country);
        }
    }
    console.table(result);
}

 /* 
Test Q7
Fonction sortingDecreasingDensity()
Tableau  des  pays  triés  par  ordre  décroissant  de densité de population.
*/
function sortingDecreasingDensity() {
    const allCountries = Country.all_countries;
    const result = allCountries.slice().sort((a, b) => {
        return b.getPopDensity() - a.getPopDensity();
    });

    console.table(sortedCountries);
}
// Appel de la fonction
//neighborless();

/* 
Test Q8
Fonction moreTopLevelDomains()
Tableau des pays ayant le plusieurs Top Level Domains Internet. 
*/
function moreTopLevelDomains() {
    const MultipleTopLevelDomains = [];
    for (const country of Country.all_countries) {
        console.log("Pays= ", country.name, " TLD = ", country.topLevelDomain);
        if (country.topLevelDomain.length > 1) {
            MultipleTopLevelDomains.push(country);
            console.log("Pays= ", country.name, " TLD = ", country.topLevelDomain);
        }
    }
    console.table(MultipleTopLevelDomains);
}
// Appel de la fonction
//moreTopLevelDomains();
