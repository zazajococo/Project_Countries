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
    area;
    neighbors;
    TopLevelDomains;
    nativename;
    currencies;
    languages;
    timezones;
    subregion;
    independant;

    static all_countries = [];

    constructor (alpha3, name, capital, continent, population, area, neighbors, currencies, languages, timezones, nativename, subregion, independant) {
        this.alpha3 = alpha3;
        this.name = name;
        this.capital = capital;
        this.continent = continent;
        this.population = population;
        this.area = area;
        this.neighbors = neighbors;
        this.currencies = currencies;
        this.languages = languages;
        this.timezones = timezones;
        this.nativename = nativename;
        this.subregion = subregion;
        this.independant = independant;
    }
    

    toString() {
        return `${this.alpha3}, ${this.name}, ${this.capital}, ${this.continent}, ${this.population}, ` + this.getNeighbors(this.neighbors);
    }

    static getName(code) {
        for (let country of this.all_countries) {
            if (country.alpha3 == code) {
                return country.name;
            }
        }
    }

    getNeighbors(codes) {
        const names = [];
        for (let i = 0; i < codes.length; i++) {
            const name = Country.getName(codes[i]);
            if (name) {
                names.push(name);
            } else {
                names.push(codes[i]);
            }
        }
        return "(" +names.join(", ")+")";
    }

    getNbNeighbors() {
        return this.neighbors.length;
    }

    static fill_countries() {
        this.all_countries = countries.map(
            country =>  {
                const c = new Country
            (
                country.alpha3Code ? country.alpha3Code : "No Alpha3Code", 
                country.translations.fr ? country.translations.fr : "No translations found", 
                country.capital ? country.capital : "No Capital found", 
                country.region ? country.region : "No region", 
                country.population ? country.population : "No population", 
                country.area ? country.area : "No area",
                country.borders ? country.borders : [],
                country.currencies ? country.currencies : [],
                country.languages ? country.languages : [],
                country.timezones ? country.timezones : [],
                country.nativeName ? country.nativeName : "No native name",
                country.subregion ? country.subregion : "No subregion",
                country.independent,
            )
            
            return c;
            }
        )
    } 

    //omplétez votre classe Country avec les méthodes suivantes : 
    //  ●  getPopDensity() : retourne la densité de population du pays (hab. / Km2) 

    getArea() {
        return this.area;
    }


    getPopDensity() {
        const area = this.getArea();
        const pop = this.population;
        return pop / area;
    }

    //  ●  getBorders() : retourne un tableau JS des pays frontaliers (les objets Country, pas les codes). 

    getBorders() {
        const b = [];
        if (!Array.isArray(this.borders)) {
            this.b = [];
        }
        for (let i = 0; i < this.borders.length; i++) {
            for (let j = 0; j < this.all_countries.length; j++) {
                if (this.borders[i] === this.all_countries[j].alpha3Code) {
                    b.push(this.all_countries[j]);
                }
            }
        }
        return b;
    }

    //  ●  getCurrencies() : retourne un tableau des monnaies (objet Currencies)

    getCurrencies(){
        return null;
    }

    // getLanguage() : retourne un tableau des langues (objet Languages

    getLanguage() {
        return null;
    }
}

Country.fill_countries()
