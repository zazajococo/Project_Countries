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
    const allCountries = Country.all_countries;
    let maxLanguage = 0;
    for (const country of allCountries) {
        const languages = country.languages;
        if (country.languages.length >= maxLanguage) {
            maxLanguage = languages.length;
            console.log("Pays = ", country.name," NB = ", country.languages.length);    
            console.log("Languages = ", country.languages);
        }
        
    }
    const countriesWithMaxLanguage = allCountries.filter(country => country.languages.length === maxLanguage);
    console.table(countriesWithMaxLanguage);
}
// Appel de la fonction
moreLanguages();    

/* 
Test Q5
Fonction withCommonLanguage()
Tableau des pays ayant au moins un voisin parlant l’une de  ses  langues.  Affichez  aussi  les  pays  voisins  (objets  Country)  et  les  langues  en question (objets Language). 
*/
function withCommonLanguage() {
    const allCountries = Country.all_countries;
    const result=[]
    for(const country of allCountries){
        let hasCommonLanguage = false;
        for(const border of country.getNeighbors(country)){
            if(border !=null){
                for(const language of country.languages){
                    if(country.languages.includes(language)){
                        hasCommonLanguage = true;
                        break;
                    }
                }
            }
            if(hasCommonLanguage){
                break;
            }
        }
        if(!hasCommonLanguage){
            result.push(country)
        }
    }
    console.table(result)
}

/* 
Test Q6
Fonction withoutCommonCurrency()
Tableau  des  pays  sans  aucun  voisin ayant au moins une de ses monnaies. 
*/
function withoutCommonCurrency() {
    const allCountries = Country.all_countries;
    const result=[]
    for(const country of allCountries){
        let hasCommonCurrency = false;
        for(const border of country.getNeighbors(country)){
            if(border !=null){
                for(const currency of country.currencies){
                    if(country.currencies.includes(currency)){
                        hasCommonCurrency = true;
                        break;
                    }
                }
            }
            if(hasCommonCurrency){
                break;
            }
        }
        if(!hasCommonCurrency){
            result.push(country)
        }
    }
    console.table(result)

}

/* 
Test Q7
Fonction sortingDecreasingDensity()
Tableau  des  pays  triés  par  ordre  décroissant  de densité de population.
*/
function sortingDecreasingDensity() {
    const countriesSort = Country.all_countries;
    countriesSort.sort(function (a, b) {
        const densiteA = a.getPopDensity?.();
        const densiteB = b.getPopDensity?.();
        const nomA = a.name.toLowerCase(); // minuscule pour que se soit égale
        const nomB = b.name.toLowerCase(); // minuscule pour que se soit égale
        if (densiteA === densiteB) {
            return nomB.localeCompare(nomA, 'fr', { sensitivity: 'base' })
        } else {
            return densiteB - densiteA;
        }
    });
    console.table(countriesSort);
}
// Appel de la fonction
sortingDecreasingDensity();

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
