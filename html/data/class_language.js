// La classe Language 
// Vous allez maintenant traiter les langues, de façon similaire aux monnaies. 
// On s’intéresse au code iso639_2 et au nom (en anglais). 
// Q1  -  A  partir  de  votre  analyse  de  la  structure  JSON  d’une  langue,  créez  une  classe 
// Language  pour  y  stocker  vos  données  de  travail.  Prévoyez  une  fonction  toString() 
// synthétique qui retourne une chaîne (sans \n) contenant : 
// ●  Le code iso639_2 
// ●  Le nom (anglais) 
// Exemple à respecter : 
// French (fra) 
 
// Q2 - Écrivez une fonction fill_languages() qui, à partir de la source de données, crée 
// des objets Language que vous stockez dans un tableau associatif (variable de classe) 
// nommé all_languages dont les clés sont les valeurs trouvées champ iso639_2 de la propriété
// languages, et les valeurs sont des objets Language.

class Language{

    static all_languages = {};

    constructor (code, nom) {
        this.code = code;
        this.nom = nom; 
       
    } 

    get GetCode() { 
        return this.code; 
    }

    set SetCode(code) { 
        this.code = code;
    }

    get GetNom() { 
        return this.nom; 
    }

    set SetNom(nom) { 
        this.nom = nom;
    }

    toString() { 
        return `${this.GetNom} (${this.GetCode})` 
    }

}

 function fill_languages() {
    const all_languages = {};
    countries.forEach(country => {
        if (country.languages && country.languages.length > 0) {
            country.languages.forEach(languagesData => {
                if (!all_languages[languagesData.iso639_2]) {
                    all_languages[languagesData.iso639_2] = new Language(languagesData.iso639_2, languagesData.name);
                    console.log(all_languages[languagesData.iso639_2].toString()); 
                }
            })
                
        }
        else{
            console.log("Aucune langue")
        }
    })
}




