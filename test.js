// Q1 : 
function outsideTheContinent() {
    const paysContinent = new Map(countries.map(c => [c.alpha3Code, c.region])) // dans borders c'est alapha3 
    let pays = [];
    for (let country of countries) {
        if(country.borders !== undefined){
            for (let voisin of country.borders) {
                if (paysContinent.has(voisin) && paysContinent.get(voisin) !== country.continent) {
                    pays.push(country.name); // append ne fonctionne pas sur les tableaux d'apres chatgpt car mon append ne fonctionne pas
                }
            }
        }
        else{
            console.log("aucun borders")
        }
        
    }
    console.table([...new Set(pays)]); // Supprime les doublons
    return pays;
}
outsideTheContinent();

// Q2 : 
// Q3 : 
// Q4 : 
// Q5 : 
// Q6 : 
// Q7 : 
// Q8 : 