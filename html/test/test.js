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
    console.log("Comming soon !");
}

/* 
Test Q5
Fonction withCommonLanguage()
Tableau des pays ayant au moins un voisin parlant l’une de  ses  langues.  Affichez  aussi  les  pays  voisins  (objets  Country)  et  les  langues  en question (objets Language). 
*/
function withCommonLanguage() {
    console.log("Comming soon !");
}

/* 
Test Q6
Fonction withoutCommonCurrency()
Tableau  des  pays  sans  aucun  voisin ayant au moins une de ses monnaies. 
*/
function withoutCommonCurrency() {
    console.log("Comming soon !");
}

 /* 
Test Q7
Fonction sortingDecreasingDensity()
Tableau  des  pays  triés  par  ordre  décroissant  de densité de population.
*/
function sortingDecreasingDensity() {
    console.log("Comming soon !");
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
        if (country.getNbTLD() > 1) {
            MultipleTopLevelDomains.push(country);
            console.log("Pays= ", country.name, " TLD = ", country.topLevelDomains);
        }
    }
    console.table(MultipleTopLevelDomains);
}
// Appel de la fonction
//moreTopLevelDomains();
