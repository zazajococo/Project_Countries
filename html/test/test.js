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
    const allCountries = Country.all_countries;
    let maxLanguage = 0;
    for (const country of allCountries) {
        const languages = country.languages;
        if (country.languages.length >= maxLanguage) {
            maxLanguage = languages.length;
        }
        
    }
    const countriesWithMaxLanguage = allCountries.filter(country => country.languages.length === maxLanguage);
    console.table(countriesWithMaxLanguage);
}
// Appel de la fonction



/* 
Test Q5
Fonction withCommonLanguage()
Tableau des pays ayant au moins un voisin parlant l’une de  ses  langues.  Affichez  aussi  les  pays  voisins  (objets  Country)  et  les  langues  en question (objets Language). 
*/
function withCommonLanguage() {
    const results = [];
    // Parcours tous les pays
    for (const country of Country.all_countries) {
        // Récupérer les voisins comme objets Country
        const neighborCountries = country.neighbors
        .map(code => Country.all_countries.find(c => c.alpha3 === code))
        .filter(n => n); // filtre les undefined si code invalide
        // Pour stocker voisins partageant au moins une langue
        const commonLanguageNeighbors = [];
        for (const neighbor of neighborCountries) {
        // Trouver les langues communes entre country et neighbor
        const commonLangs = country.languages.filter(clang =>
            neighbor.languages.some(nlang => nlang.name === clang.name)
        );
        if (commonLangs.length > 0) {
            commonLanguageNeighbors.push({
            neighbor: neighbor,
            commonLanguages: commonLangs
            });

        }
        // Si au moins un voisin partage une langue
        if (commonLanguageNeighbors.length > 0) {
            results.push({
                country: country,
                neighbors: commonLanguageNeighbors
            });
        }
    }
    // Affichage du résultat
    for (const result of results) {
        console.log(`Pays: ${result.country.name}`);
        for (const neighbor of result.neighbors) {
            console.log(`  Voisin: ${neighbor.neighbor.name}`);
            console.log(`  Langues communes: ${neighbor.commonLanguages.map(lang => lang.name).join(', ')}`);
        }
    }
    console.table(results);
}


/* 
Test Q6
Fonction withoutCommonCurrency()
Tableau  des  pays  sans  aucun  voisin ayant au moins une de ses monnaies. 
*/
function withoutCommonCurrency() {
    const results = [];
    
    // Parcours tous les pays
    for (const country of Country.all_countries) {
        // Récupérer les voisins comme objets Country
        const neighborCountries = country.neighbors
            .map(code => Country.all_countries.find(c => c.alpha3 === code))
            .filter(n => n); // filtre les undefined si code invalide

        // Pour stocker les voisins partageant au moins une monnaie
        const commonCurrencyNeighbors = [];
        
        for (const neighbor of neighborCountries) {
            // Trouver les monnaies communes entre country et neighbor
            const commonCur = country.currencies.filter(ccu =>
                neighbor.currencies.some(ncu => ncu.code === ccu.code) // Comparer par code
            );
            if (commonCur.length > 0) {
                commonCurrencyNeighbors.push({
                    neighbor: neighbor,
                    commonCurrencies: commonCur
                });
            }
        }

        // Si aucun voisin ne partage de monnaie
        if (commonCurrencyNeighbors.length === 0 && neighborCountries.length > 0) {
            results.push({
                country: country,
                neighbors: neighborCountries // Ajouter les voisins
            });
        }
    }

    // Affichage du résultat
    console.log("Pays sans voisin ayant une monnaie commune :");
    for (const result of results) {
        console.log(`Pays: ${result.country.name}`);
        for (const neighbor of result.neighbors) {
            console.log(`  Voisin: ${neighbor.name}`);
            // Afficher les monnaies non communes
            const nonCommonCurrencies = neighbor.currencies.map(c => c.name).join(', ');
            console.log(`  Monnaies non communes: ${nonCommonCurrencies}`);
        }
    }
    
    console.table(results);
}

// --- Exemple d’utilisation ---


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
    const allCountries = Country.all_countries;
    const result = allCountries.slice().sort((a, b) => {
        return b.getPopDensity() - a.getPopDensity();
    });

    console.table(result);
}
// Appel de la fonction

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
