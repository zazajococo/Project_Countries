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
        return `Monnaie : ${this.GetCode}, ${this.GetNom}, ${this.GetSymbole}` // Monnaie a enlever pour respecter la consigne
    }

}

 // Clé : valeur, ex : code : EUR
 function fill_currencies() {
    const all_currencies = countries.map(country => {
        if (country.currencies && country.currencies.length > 0) {
            country.currencies.forEach(currencyData => {
                //if (!all_currencies.has(code)) {
                    const currency = new Currency(currencyData[i].code, currencyData[i].name, currencyData[i].symbol);
                    console.log(currency.toString()); 
                    return currency;
                //}
            })
            
        }
        else{
            console.log("Aucune monnaie")
        }
    });
}



