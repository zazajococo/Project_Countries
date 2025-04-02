/*Tests 
Écrivez  des  fonctions  permettant  de  répondre  aux  questions  suivantes.  Les  résultats 
doivent s’afficher dans la console du navigateur à l’aide de console.table() si ça s’y 
prête*/

// Q1 - outsideTheContinent() : Tableau JS des pays (Objets Country) dont au moins un pays frontalier n'est pas dans le même continent

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
outsideTheContinent();

// Q2 - moreNeighbors() : Tableau des pays ayant le plus grand nombre de voisins. Affichez aussi les voisins.

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
moreNeighbors();

