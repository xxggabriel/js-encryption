class Encript {

    characters = [
        '1', '2', '3', '4',  '5', '6', '7', '8', '9', '0', '-', '_', '=', '+', '[', ']',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '`', '{','}',
        'a', 'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç','^', '~', 'â', 'ã', 'á', 'é', 'è', 'â',
        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', ';', '/', '<', '>', ':', '?', '°', '¬', '─',
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'B', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', 'Â', 'Ã', 'Á', 'É', 'È', 'Â',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M', ' ', '   ', '!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '§'
    ];

    version = 1.0

    constructor() {
    
    }

    

    encrypt(string) {
        let newString = '';
        
        for (let index = 0; index < string.length; index++) {
            let random = Math.floor(Math.random() * 5);
            let positionCharacters = this.characters.findIndex((character) => character == string.split('')[index])

            newString += `${this.characters[random]}` + `${this.characters[positionCharacters + random]}` 
            
        }
        return newString;
    }   

    decrypt(hash) {
        let newString = '';
        let encryptedBlock = hash.split('')
        
        for (let index = 0; index < hash.length / 2; index++) {
            let random = this.characters.findIndex((character) => character == encryptedBlock[index * 2]);
            let positionCharacters = this.characters.findIndex((character) => character == encryptedBlock[(index * 2) + 1]);
            
            // console.log((index * 3) + 1, encryptedBlock[(index * 3) + 1], encryptedBlock, random, positionCharacters);
            // break;
            // console.log(
            //     random,
            //     positionCharacters,
            //     this.characters[Math.abs(random - positionCharacters)],
            //     // Math.abs(positionCharacters -random)
            // );
            newString += this.characters[Math.abs(random - positionCharacters)];
        }

        return newString;
    }

}

let en = new Encript(); 
// console.log(en.encrypt('Gabriel1'))
console.log(en.decrypt( en.encrypt('Gabriel14564as5d')))