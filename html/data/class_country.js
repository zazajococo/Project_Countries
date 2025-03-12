class Country {
    /* La classe Country 
    Q1 - A partir de votre analyse de la structure JSON d’un pays, créez une classe Country 
    pour y stocker vos données de travail. Prévoyez une fonction toString() synthétique 
    qui retourne une chaîne (sans \n) contenant : 
    ●  Le code Alpha 3 
    ●  Le nom en français 
    ●  La capitale 
    ●  Le continent 
    ●  La population 
    ●  La liste des noms des pays voisins 
    Exemple à respecter : 
    AND, Andorre, Andorra la Vella, Europe, 77 265 hab, (Espagne, France) 
 
    Q2  -  Ecrivez  une  fonction fill_countries() qui lit la source de données (countries.js) et crée des pays*/

    alpha3;
    name;
    capital;
    continent;
    population;
    neighbors;

    constructor (alpha3, name, capital, continent, population, neighbors) {
        this.alpha3 = alpha3;
        this.name = name;
        this.capital = capital;
        this.continent = continent;
        this.population = population;
        this.neighbors = neighbors;
    }

    static toString() {
        return `${this.alpha3}, ${this.name}, ${this.capital}, ${this.continent}, ${this.population}, (${this.neighbors.join(', ')})`;
    }

    static getName(code) {
        const data = JSON.parse("countries.js")
        data.forEach(element => {
            if (element[2] == code) {
                return element[0];
            }
        });
    }

    static getNeighbors(codes) {
        /* get the codes from codes and return a tuple with their names*/
        const data = JSON.parse("countries.js")
        const names = [];
        codes.forEach(code => {
            data.forEach(element => {
                if (element[3] == code) {
                    neighbors.append(element[0]);
                }
            });
        });
    }

    static fill_countries() {
        const data = JSON.parse("countries.js")
        data.forEach(element => {
            const country = new Country(element[3], element[0], element[5], element[8], element[9], this.getNeighbors(element[14]))
            console.log(country.toString())
        });
    }
}

Country.fill_countries()