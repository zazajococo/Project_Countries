class Currency{

    static all_currencies = {};

    constructor (code, nom, symbole) {
        this.code = code;
        this.nom = nom; 
        this.symbole = symbole;
       
    } 

    get GetCode() { 
        return this.code; 
    }

    set SetCode(code) { 
        this.code = code;
    }

    get GetSymbole() { 
        return this.symbole; 
    }

    set SetSymbole(symbole) { 
        this.symbole = symbole;
    }

    get GetNom() { 
        return this.nom; 
    }

    set SetNom(nom) { 
        this.nom = nom;
    }

    /* 
    Méthode toString()
    Permet de retourner les informations sur une monnaie
     */
    toString() { 
        return `${this.GetCode}, ${this.GetNom}, ${this.GetSymbole}` 
    }

}

/* 
Function fill_currencies()
Permet de lis la source json countries, créer des objets Currencies et les stockes dans le tableau associatif all_currencies
*/
 function fill_currencies() {
    const all_currencies = {};
    countries.forEach(country => {
        if (country.currencies && country.currencies.length > 0) {
            country.currencies.forEach(currencyData => {
                if (!all_currencies[currencyData.code]) {
                    all_currencies[currencyData.code] = new Currency(currencyData.code, currencyData.name, currencyData.symbol);
                    console.log(all_currencies[currencyData.code].toString()); 
                }
            })
                
        }
        else{
            console.log("Aucune monnaie")
        }
    })
}



