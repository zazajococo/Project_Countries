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

    /* 
    Méthode toString()
    Permet de retourner les informations sur une langue
     */
    toString() { 
        return `${this.GetNom} (${this.GetCode})` 
    }

}

/* 
Function fill_languages()
Permet de lis la source json countries, créer des objets Languages et les stockes dans le tableau associatif all_languages
*/
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




