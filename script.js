class Encrypt {

    characters = [
        '1', '2', '3', '4',  '5', '6', '7', '8', '9', '0', '-', '_', '=', '+', '[', ']',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',  '{','}',
        'a', 'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç', 'â', 'ã', 'á', 'é', 'â',
        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', ';', 
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 's', 'S',
        'A', 'B', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', 'Â', 'Ã', 'Á', 'É', 'È', 'Â',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M', ' ', '   ', '!',
        '/', '<', '>', ':', '?', '@', '#', '$', '%', '¨', '&', '*',
        '(', ')', 'è', '°', '¬', '─','^', '~', '§', '`',
    ];

    version = 1.0

    constructor() {
    
    }

    encrypt(string) {
        let newString = '';
        
        for (let index = 0; index < string.length; index++) {
            let random = Math.floor(Math.random() * 5);
            let positionCharacters = this.characters.findIndex((character) => character == string.split('')[index])
            
            if(positionCharacters + random > this.characters.length - 1){
                random = 0;
            }

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

let page;
const mainForm = `
    <div class="form-control" id="form-main">
        >> Selecione uma das opções abaixo:<br/>
        >> [0] Criptografar<br/>
        >> [1] Descriptografar<br/>
        >> <input class="input-form-main input" type="text">    
    </div>
`
showPage1();
function showPage1(){
    $("main").prepend(mainForm)
}

$("body").keyup(function (e) {
    $("#input-cript").keyup(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            pageLoading(page)
        }
    });

    $(".input-form-main").keyup(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            clearWindow()
            
            switch ($(".input-form-main").val()) {
                case '0':
                    page = 0;
                    showFormEncrypt()
                    break;
    
                case '1':
                    page = 1;
                    showFormDecrypt()
                    break;
            
                default:
                    page = 404;
                    showError()
                    break;
            }
        }
    }); 
});

function showFormEncrypt(){
    
    $("#form-input").show().html(`
        >> Digite um texto para ser criptografado: 
        <input class="input" type="text" id="input-cript">
    `);
    $("#input-cript").focus();
}

function showFormDecrypt(){
    $("#form-input").show().html(`
        >> Digite o hash para ser descriptografado: 
        <input class="input" type="text" id="input-cript">
    `);
    $("#input-cript").focus();
}

function pageLoading(page) {
    $("#loading").show();
    setTimeout(() => {
        $("#loading").html(`>> LOADING [2%]`);
    }, 0)

    setTimeout(() => {
        $("#loading").html(`>> LOADING [30%]`);
    }, 1000)

    setTimeout(() => {
        $("#loading").html(`>> LOADING [46%]`);
    }, 1500)

    setTimeout(() => {
        $("#loading").html(`>> LOADING [55%]`);
    }, 2500)

    setTimeout(() => {
        $("#loading").html(`>> LOADING [88%]`);
    }, 3000)
    
    setTimeout(() => {
        $("#loading").html(`>> LOADING [99%]`);
    }, 3800)

    setTimeout(() => {
        $("#loading").html(`>> LOADING [100%]`);

        switch (page) {
            case 0:
                setTimeout(showEncrypetMessage, 900)
                break;
            case 1:
                setTimeout(showDecryptMessage, 900)
                break;
        
            default:
                break;
        }
    }, 4500)
}

function showEncrypetMessage() {
    let encrypt = new Encrypt()

    setTimeout(function(){
        $("#message-03").show().html(`
            >> <span class="encrypted-message">${encrypt.encrypt($('#input-cript').val())}</span>
        `);
    }, 0)

    setTimeout(function(){
        $("#message-03").show().html(`
            >> <span class="encrypted-message">${encrypt.encrypt($('#input-cript').val())}</span>
        `);
    }, 500)

    setTimeout(function(){
        $("#message-03").show().html(`
            >> <span class="encrypted-message">${encrypt.encrypt($('#input-cript').val())}</span>
        `);
    }, 1500)

    setTimeout(function(){
        $("#form-main").remove();
        $("#message-03").show().html(`
            >> <span class="encrypted-message">${encrypt.encrypt($('#input-cript').val())}</span>
            <div id="sub-form"></div>
        `);
    }, 2000)

    setTimeout(function () {
        $("#sub-form").html(mainForm);
    }, 2200)
    $("#input-cript").val("")
}

function showDecryptMessage() {
    let encrypt = new Encrypt();

    $("#message-03").show().html(`
        >>
        <span class="encrypted-message">
            ${encrypt.decrypt($("#input-cript").val())}
            <div id="sub-form"></div>
        </span>
    `)

    $("#sub-form").html(mainForm);
    $("#input-cript").val("")
}

function showError() {
    
}

function clearWindow() {
    $(".input-form-main ").focus()
    $("#loading").hide();
    $("#message-03").hide();
    $(".encrypted-message").html('Loading...')
}