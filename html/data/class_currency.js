// Vous allez d’abord traiter les monnaies.  
// Q1  -  A  partir  de  votre  analyse de la structure JSON d’une monnaie, créez une classe 
// Currency  pour  y  stocker  vos  données  de  travail.  Prévoyez  une  fonction  toString() 
// synthétique qui retourne une chaîne (sans \n) contenant : 
// ●  Le code 
// ●  Le nom (anglais) 
// ●  Le symbole 
// Exemple à respecter : 
// EUR, Euro, € 

// Q2 - Écrivez une fonction fill_currencies() qui, à partir de la source de données, crée 
// des objets Currency que vous stockez dans un tableau associatif (variable de classe) 
// nommé all_currencies dont les clés sont les valeurs trouvées

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

    toString() { 
        return `${this.GetCode}, ${this.GetNom}, ${this.GetSymbole}` 
    }

}

 // Clé : valeur, ex : code : EUR
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



