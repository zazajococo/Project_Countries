class Country {
    alpha3;
    name;
    capital;
    continent;
    population;
    area;
    neighbors;
    nativename;
    currencies;
    languages;
    timezones;
    subregion;
    independant;
    topLevelDomain;


    static all_countries = [];

    constructor (alpha3, name, capital, continent, population, area, neighbors, currencies, languages, timezones, nativename, subregion, independant, topLevelDomain) {
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
        this.topLevelDomain = topLevelDomain;
    }
    
    /* 
    Méthode toString()
    Permet de retourner les informations sur un pays
     */
    toString() {
        return `${this.alpha3}, ${this.name}, ${this.capital}, ${this.continent}, ${this.population}, ` + this.getNeighbors(this.neighbors);
    }

    /* 
    Méthode getName(code)
    Permet de retourner le nom d'un pays
    */
    static getName(code) {
        for (let country of this.all_countries) {
            if (country.alpha3 == code) {
                return country.name;
            }
        }
    }

    /* 
    Méthode getNeighbors(code)
    Permet de retourner une liste des noms des voisins du pays
    */
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

    /* 
    Méthode getNbNeighbors()
    Permet de retourner le nombre de voisins du pays
    */
    getNbNeighbors() {
        return this.neighbors.length;
    }

    /* 
    Function fill_countries()
    Permet de lis la source json countries, créer des objets Countries et les stockes dans le tableau associatif all_countries
    */
    static fill_countries() {
        this.all_countries = countries.map(
            country =>  {
                const c = new Country
            (
                country.alpha3Code ? country.alpha3Code : "N/A", 
                country.translations.fr ? country.translations.fr : "N/A", 
                country.capital ? country.capital : "N/A", 
                country.region ? country.region : "N/A", 
                country.population ? country.population : "N/A", 
                country.area ? country.area : "N/A",
                country.borders ? country.borders : [],
                country.currencies ? country.currencies : [],
                country.languages ? country.languages : [],
                country.timezones ? country.timezones : [],
                country.nativeName ? country.nativeName : "N/A",
                country.subregion ? country.subregion : "N/A",
                country.independent,
                country.topLevelDomain ? country.topLevelDomain : []
            )
            
            return c;
            }
        )
    } 

    /* 
    Méthode getArea()
    Permet de retourner la surface d'un pays
    */
    getArea() {
        return this.area;
    }

    /* 
    Méthode getPopDensity()
    Permet de retourner la densité de population du pays (hab. / Km2) 
    */
    getPopDensity() {
        const area = this.getArea();
        const pop = this.population;
        return pop / area;
    }

    /* 
    Méthode getBorders()
    Permet de retourner un tableau JS des pays frontaliers (les objets Country, pas les codes). 
    */
    getBorders() {
        const b = [];
        if (!Array.isArray(this.borders) || this.borders === null) {
            this.b = [];
        }
        console.log("borders",this.borders)
        for (let i = 0; i < this.borders.length; i++) {
            for (let j = 0; j < this.all_countries.length; j++) {
                if (this.borders[i] === this.all_countries[j].alpha3Code) {
                    b.push(this.all_countries[j]);
                }
            }
        }
        return b;
    }

    /* 
    Méthode getCurrencies()
    Permet de retourner un tableau des monnaies (objet Currencies)
    */
    getCurrencies(){
        const currencies = Currency.all_currencies;
        const cu = [];
        for (c of this.currencies) {
            for (let i = 0; i < currencies.length; i++) {
                if (c.code === currencies[i].code) {
                    cu.push(c);
                }
            }
        }
        return cu;
        return cu;
    }

    /* 
    Méthode getLanguages()
    Permet de retourner un tableau des langues (objet Languages
    */
    getLanguages() {
        const languages = Language.all_languages;
        const lang = [];
        for (let l of this.languages) {
            for (let j = 0; j < languages.length; j++) {
                if (l.name === languages[j].name) {
                    lang.push(l);
                }
            }
        }
        return lang;
    }

    /*
    Méthode getNbLanguages()
    Permet de retourner le nombre de langues parlées dans le pays
    */
   getNbLanguages() {
        return this.languages.length;
    }


}

Country.fill_countries()
