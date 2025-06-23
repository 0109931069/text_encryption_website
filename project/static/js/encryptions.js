document.addEventListener('DOMContentLoaded', function() {
    let plainText = document.getElementById('plainText');
    let cipherText = document.getElementById('cipherText');
    let encryptBtn = document.getElementById('encryptBtn');
    let decryptBtn = document.getElementById('decryptBtn');
    let fileInput = document.getElementById('fileInput');
    let uploadBtn = document.getElementById('uploadBtn');
    let downloadBtn = document.getElementById('downloadBtn');
    let algorithmSelect = document.getElementById('algorithm');
    let homophonicMap = {
        'a':['12', '29', '25', '43', '71', '80', '89', '95'],
        'b':['05', '92'],
        'c':['19', '37', '36'],
        'd':['23', '41', '61', '66'],
        'e':['16', '30', '47', '59', '72', '83', '90', '60', '69', '88', '99', '00'],
        'f':['17', '49'],
        'g':['02', '31'],
        'h':['04', '45', '55', '63', '76', '82'],
        'i':['15', '34', '56', '97', '77', '86'],
        'j':['03'],
        'k':['11'],
        'l':['24', '38', '48', '64'],
        'm':['65', '46'],
        'n':['26', '42', '53', '70', '73', '98'],
        'o':['10', '44', '50', '94', '78', '85', '91'],
        'p':['06', '39'],
        'q':['52'],
        'r':['21', '35', '54', '20', '74', '87'],
        's':['01', '40', '57', '68', '79', '81'],
        't':['13', '28', '51', '67', '75', '84', '33', '27', '22'],
        'u':['08', '62', '58'],
        'v':['07'],
        'w':['18', '32'],
        'x':['96'],
        'y':['09', '93'],
        'z':['14']
    };
    let isfile = 0;
    let plainfile = '';
    let cipherfile = '';
    let filecontent = '';
    let encrypt = 0;
     let key = 'monarchy';
    const matrix = generateKeySquare(key);
    let map = new Map();
    let row = matrix.length;
    let col = matrix[0].length;
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            map.set(matrix[i][j], [i, j]);
        }
    }

    // Caesar Cipher Algorithm
    function caesarEncrypt(text, shift) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) {
                charCode = (charCode - 65 + shift) % 26 + 65;
            } else if (charCode >= 97 && charCode <= 122) {
                charCode = (charCode - 97 + shift) % 26 + 97;
            }
            result += String.fromCharCode(charCode);
        }
        return result;
    }

    function caesarDecrypt(text, shift) {
        return caesarEncrypt(text, 26 - shift);
    }

    // Vigenère Cipher Algorithm
    function vigenereEncrypt(text, key) {
        let result = '';
        let keyLength = key.length;
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);
            let keyIndex = i % keyLength;
            let keyCharCode = key.charCodeAt(keyIndex);
            if (charCode >= 65 && charCode <= 90) {
                charCode = (charCode - 65 + (keyCharCode - 65)) % 26 + 65;
            } else if (charCode >= 97 && charCode <= 122) {
                charCode = (charCode - 97 + (keyCharCode - 65)) % 26 + 97;
            }
            result += String.fromCharCode(charCode);
        }
        return result;
    }

    function vigenereDecrypt(text, key) {
        let result = '';
        let keyLength = key.length;
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);
            let keyIndex = i % keyLength;
            let keyCharCode = key.charCodeAt(keyIndex);
            if (charCode >= 65 && charCode <= 90) {
                charCode = (charCode - 65 - (keyCharCode - 65) + 26) % 26 + 65;
            } else if (charCode >= 97 && charCode <= 122) {
                charCode = (charCode - 97 - (keyCharCode - 65) + 26) % 26 + 97;
            }
            result += String.fromCharCode(charCode);
        }
        return result;
    }

    // Mixed Alphabet Algorithm
    function mixedAlphabetEncrypt(text, mixedAlphabet) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) {
                charCode = mixedAlphabet[charCode - 65].charCodeAt(0);
            } else if (charCode >= 97 && charCode <= 122) {
                charCode = mixedAlphabet[charCode - 97].charCodeAt(0);
            }
            result += String.fromCharCode(charCode);
        
        }
        return result;
    }
    
    function mixedAlphabetDecrypt(text, mixedAlphabet) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) {
                charCode = mixedAlphabet.findIndex((letter) => letter.charCodeAt(0) === charCode) + 65;
            } else if (charCode >= 97 && charCode <= 122) {
                charCode = mixedAlphabet.findIndex((letter) => letter.charCodeAt(0) === charCode) + 97;
            }
            result += String.fromCharCode(charCode);
        }
        console.log(result);
        return result;
    }

    //Homophonic Cipher Algorithm
    function homophonicEncrypt(text) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) {
                let char = String.fromCharCode(charCode).toLowerCase();
                const possibleChars = homophonicMap[char];
                const randomIndex = Math.floor(Math.random() * possibleChars.length);
                charCode = possibleChars[randomIndex];
            } else if (charCode >= 97 && charCode <= 122) {
                let char = String.fromCharCode(charCode);
                const possibleChars = homophonicMap[char];
                const randomIndex = Math.floor(Math.random() * possibleChars.length);
                charCode = possibleChars[randomIndex];
            } else {
                charCode = String.fromCharCode(charCode);
            }
            result += charCode;
        }
        return result;
    }
    
    function homophonicDecrypt(text) {
        let result = '';
        for (let i = 0; i < text.length; i+=2) {
            let numcode = text[i] + text[i+1];
            let charCode = '';
            for (let key in homophonicMap) {
                if (homophonicMap[key].includes(numcode)) {
                  charCode = key;
                  break;
                }
            }
            result += charCode;
        }
        return result;
    }
    
    // Playfair Cipher Algorithm
    function playfairEncrypt(text) {
        let cipher = '';
        const preperdText = prepareText(text);
        let char1 = '';
        let char2 = '';
        for(let i = 0; i< preperdText.length;i+=2)
        {
            char1 = preperdText[i];
            char2 = preperdText[i+1];
            console.log(preperdText);
            console.log(char1);
            console.log(char2);
            let char1index = map.get(char1.toUpperCase());
            let char2index = map.get(char2.toUpperCase());
            console.log(char1index);
            console.log(char2index);
            if(char1index[0] === char2index[0]){
                cipher += matrix[char1index[0]][(char1index[1] + 1) % 5] + matrix[char2index[0]][(char2index[1] + 1) % 5];
            }else if(char1index[1] === char2index[1]){
                cipher += matrix[(char1index[0] + 1) % 5][char1index[1]] + matrix[(char2index[0] + 1) % 5][char2index[1]];
            }else{
                cipher += matrix[char1index[0]][char2index[1]] + matrix[char2index[0]][char1index[1]];
            }
        }
        
        return cipher;
    }

    function playfairDecrypt(text) {
        let char1 = '';
        let char2 = '';
        let plain = '';
        for(let i = 0; i < text.length;i+=2)
        {
            char1= text[i];
            char2= text[i+1];
            let char1index = map.get(char1.toUpperCase());
            let char2index = map.get(char2.toUpperCase());
            if(char1index[0] === char2index[0]){
                plain += matrix[char1index[0]][(char1index[1] - 1) % 5] + matrix[char2index[0]][(char2index[1] - 1) % 5];
            }else if(char1index[1] === char2index[1]){
                plain += matrix[(char1index[0] - 1) % 5][char1index[1]] + matrix[(char2index[0] - 1) % 5][char2index[1]];
            }else{
                plain += matrix[char1index[0]][char2index[1]] + matrix[char2index[0]][char1index[1]];
            }
        }
        return plain;
    }

    // Helper functions for Playfair cipher
    function generateKeySquare(key) {
        const keySquare = [];
        const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; 
        key = key.toUpperCase().replace(/J/g, 'I');
        for (let i = 0; i < key.length; i++) {
            if (!keySquare.includes(key[i]) && key[i] !== ' ') {
                keySquare.push(key[i]);
            }
        }
    
        for (let i = 0; i < alphabet.length; i++) {
            if (!keySquare.includes(alphabet[i])) {
                keySquare.push(alphabet[i]);
            }
        }
        const matrix = [];
        for (let i = 0; i < 5; i++) {
            matrix.push(keySquare.slice(i * 5, (i + 1) * 5));
        }
        console.log(matrix);
        return matrix;     
    }

    function prepareText(text) {
        let preperdText = '';
        let char1 = '';
        let char2 = '';
        for(let i = 0; i < text.length; i+=2)
        {
            char1 = text[i];
            char2 = i+1 < text.length ? text[i+1] : 'x';
            if(char1 === char2){
                i--;
                char2 = 'x';
            }
            preperdText += char1 + char2;
        }
        return preperdText;
    }

    //onetime pad cipher
    function encryptOneTimePad(plaintext, key) {
        let ciphertext = '';
        for (let i = 0; i < plaintext.length; i++) {
          const plaintextCharCode = plaintext.charCodeAt(i);
          const keyCharCode = key.charCodeAt(i);
          const encryptedCharCode = (plaintextCharCode ^ keyCharCode) % 256; // Using modulo 256 to handle overflow
          const encryptedChar = String.fromCharCode(encryptedCharCode);
          ciphertext += encryptedChar;
        }
        return ciphertext;
      }
      
      function decryptOneTimePad(ciphertext, key) {
        let plaintext = '';
        for (let i = 0; i < ciphertext.length; i++) {
          const ciphertextCharCode = ciphertext.charCodeAt(i);
          const keyCharCode = key.charCodeAt(i);
          const decryptedCharCode = (ciphertextCharCode ^ keyCharCode) % 256; // Using modulo 256 to handle overflow
          const decryptedChar = String.fromCharCode(decryptedCharCode);
          plaintext += decryptedChar;
        }
        return plaintext;
      }
      
      
    //Autokeycipher algorithm
      function encryptAutokey(plaintext, key) {
        plaintext = plaintext.toUpperCase();
        key = key.toUpperCase();
      
        let ciphertext = '';
        let keyIndex = 0;
      
        for (let i = 0; i < plaintext.length; i++) {
          const plaintextCharCode = plaintext.charCodeAt(i) - 65;
          const keyCharCode = key.charCodeAt(keyIndex) - 65;
          const encryptedCharCode = (plaintextCharCode + keyCharCode) % 26;
          const encryptedChar = String.fromCharCode(encryptedCharCode + 65);
          ciphertext += encryptedChar;
      
          if (plaintextCharCode >= 0 && plaintextCharCode <= 25) {
            keyIndex++;
          }
        }
      
        return ciphertext;
      }
      
      function decryptAutokey(ciphertext, key) {
        ciphertext = ciphertext.toUpperCase();
        key = key.toUpperCase();
      
        let plaintext = '';
        let keyIndex = 0;
      
        for (let i = 0; i < ciphertext.length; i++) {
          const ciphertextCharCode = ciphertext.charCodeAt(i) - 65;
          const keyCharCode = key.charCodeAt(keyIndex) - 65;
          const decryptedCharCode = (ciphertextCharCode - keyCharCode + 26) % 26;
          const decryptedChar = String.fromCharCode(decryptedCharCode + 65);
          plaintext += decryptedChar;
      
          if (ciphertextCharCode >= 0 && ciphertextCharCode <= 25) {
            keyIndex++;
          }
      
          if (keyIndex >= key.length) {
            key += plaintext.charAt(keyIndex - key.length);
          }
        }
      
        return plaintext;
      }
      
    
    //Rail Fence Algorithm 
    // Function to encrypt using the Rail Fence Cipher algorithm
    function encryptRailFence(text, key) {
        let rail = new Array(key).fill().map(() => new Array(text.length).fill('\n'));
        let dirDown = false;
        let row = 0, col = 0;
        for (let i = 0; i < text.length; i++) {
            if (row === 0 || row === key - 1) {
                dirDown = !dirDown;
            }
            rail[row][col++] = text[i];
            dirDown ? row++ : row--;
        }
        let result = '';
        for (let i = 0; i < key; i++) {
            for (let j = 0; j < text.length; j++) {
                if (rail[i][j] !== '\n') {
                    result += rail[i][j];
                }
            }
        }
        return result;
    }

    // Function to decrypt using the Rail Fence Cipher algorithm
    function decryptRailFence(cipher, key) {
        let rail = new Array(key).fill().map(() => new Array(cipher.length).fill('\n'));
        let dirDown = false;
        let row = 0, col = 0;
        for (let i = 0; i < cipher.length; i++) {
            if (row === 0) {
                dirDown = true;
            }
            if (row === key - 1) {
                dirDown = false;
            }
            rail[row][col++] = '*'; // Mark the places with '*'
            dirDown ? row++ : row--;
        }
        let index = 0;
        for (let i = 0; i < key; i++) {
            for (let j = 0; j < cipher.length; j++) {
                if (rail[i][j] === '*' && index < cipher.length) {
                    rail[i][j] = cipher[index++];
                }
            }
        }
        row = 0, col = 0;
        let result = '';
        for (let i = 0; i < cipher.length; i++) {
            if (row === 0) {
                dirDown = true;
            }
            if (row === key - 1) {
                dirDown = false;
            }
            if (rail[row][col] !== '*') {
                result += rail[row][col++];
            }
            dirDown ? row++ : row--;
        }
        return result;
    }

    // Columnar Transposion Algorithm

    function encryptColumnarTransposition(plainText, key) {
        const columns = key.length;
        const rows = Math.ceil(plainText.length / columns);
        while (plainText.length < columns * rows) {
            plainText += 'x';
        }
        const matrix = new Array(rows).fill().map(() => new Array(columns).fill(''));
        let index = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                matrix[row][col] = plainText[index++];
            }
        }
        let cipherText = '';
        let sortkey = key.split('').sort().join('');
        for(let char = 0; char < columns; char++) {
            let col = key.indexOf(sortkey[char]);
            for(let row = 0; row < rows; row++) {
                cipherText += matrix[row][col]
            }
        }
        return cipherText;
    }

    function decryptColumnarTransposition(cipherText, key) {
        const columns = key.length;
        const rows = Math.ceil(cipherText.length / columns);
        const matrix = new Array(rows).fill().map(() => new Array(columns).fill(''));
        let sortkey = key.split('').sort().join('');
        let index = 0;
        for(let char = 0; char < columns; char++) {
            let col = key.indexOf(sortkey[char]);
            for(let row = 0; row < rows; row++) {
                matrix[row][col] = cipherText[index++];
            }
        }
        let plainText = '';
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                plainText += matrix[row][col];
            }
        }
        return plainText;
    }

    //affine cipher algorithm
    function encryptAffine(plainText, key) {
        var a = key[0];
        var b = key[1];
      
        var cipher = "";
        for (var i = 0; i < plainText.length; i++) {
            var charCode = plainText.charCodeAt(i);

            if (charCode >= 65 && charCode <= 90) {
              // Uppercase letters
              charCode = ((a * (charCode - 65)) + b) % 26 + 65;
            } else if (charCode >= 97 && charCode <= 122) {
              // Lowercase letters
              charCode = ((a * (charCode - 97)) + b) % 26 + 97;
            }
            cipher += String.fromCharCode(charCode);
        }
        return cipher;
      }
      
      function decryptAffine(encryptedText, key) {
        var a = key[0];
        var b = key[1];
      
        var plain = "";
        var aInverse = 0;
        for (var i = 0; i < 26; i++) {
          if ((a * i) % 26 === 1) {
            aInverse = i;
            break;
          }
        }

        for (var i = 0; i < encryptedText.length; i++) {
            var charCode = encryptedText.charCodeAt(i);

            if (charCode >= 65 && charCode <= 90) {
              // Uppercase letters
              let c = aInverse * (charCode - 65 - b);
              if (c < 0){
                    let x = Math.ceil(-c / 26) * 26;
                    c = x + c;
                }
              charCode = c % 26+ 65;
            } else if (charCode >= 97 && charCode <= 122) {
              // Lowercase letters
              let c = aInverse * (charCode - 97 - b);
              if(c < 0){
                    let x = Math.ceil(-c / 26) * 26;
                    c = x + c;
                }
                
              charCode = c % 26 + 97;
            }
            plain += String.fromCharCode(charCode);
        }
      
        return plain;
      }
      
    encryptBtn.addEventListener('click', function(event) {
        encrypt = 1;
        event.preventDefault();
        let algorithm = algorithmSelect.value;
        let cipher = '';
        if (algorithm === 'caesar') {
            let shift = 3; // Example shift value, you can change it as needed
            let text = isfile ? filecontent : plainText.value;
            cipher = caesarEncrypt(text, shift);
        } else if (algorithm === 'vigenere') {
            let key = 'KEY'; // Example key, you can change it as needed
            let text = isfile ? filecontent : plainText.value;
            cipher = vigenereEncrypt(text, key);
        } else if (algorithm === 'mixed-alphabet') {
            let mixedAlphabet = 'mixedalphbtcfgjknoqrsuvwyz';
            let text = isfile ? filecontent : plainText.value;
            cipher = mixedAlphabetEncrypt(text, mixedAlphabet);
        } else if (algorithm === 'homophonic') {
            let text = isfile ? filecontent : plainText.value;
            cipher = homophonicEncrypt(text, homophonicMap);
        } else if (algorithm === 'rail-fence') {
            let key = 3;
            let text = isfile ? filecontent : plainText.value;
            cipher = encryptRailFence(text, key);
        } else if (algorithm === 'Affine') {
            let key = [5, 8];
            let text = isfile ? filecontent : plainText.value;
            cipher = encryptAffine(text, key);
        } else if (algorithm === 'columnar-transposition') {
            let key = 'luck';
            let text = isfile ? filecontent : plainText.value;
            cipher = encryptColumnarTransposition(text, key);
        } else if (algorithm === 'play-fair') {  
            let text = isfile ? filecontent : plainText.value;
            cipher = playfairEncrypt(text);
        } else if (algorithm === 'one-time') {
            let key = "randomkeyjjf;jxgnl;ka;spooqiojwrncnm.,;',mpoowkfeiojergnjvnj;ndz;";
            let text = isfile ? filecontent : plainText.value;
            cipher = encryptOneTimePad(text, key);
        } else if (algorithm === 'auto-key') {
            let key = "KEYghgldhfpgIUFHWUHB;aksjhUHF9[UH0[13UJ[JQFD'NJ'LADNFJBHDJKBFCVHBAIFY";
            let text = isfile ? filecontent : plainText.value;
            cipher = encryptAutokey(text, key) ;
        }
        if (isfile) {
            cipherfile = cipher;
        }else {
            cipherText.value = cipher;
        }
    });

    decryptBtn.addEventListener('click', function(event) {
        encrypt = 0;
        event.preventDefault();
        let algorithm = algorithmSelect.value;
        let plain = '';
        if (algorithm === 'caesar') {
            let shift = 3; // Example shift value, should be the same as used for encryption
            let text = isfile ? cipherfile : cipherText.value;
            plain = caesarDecrypt(text, shift);
        } else if (algorithm === 'vigenere') {
            let key = 'KEY'; // Example key, should be the same as used for encryption
            let text = isfile ? cipherfile : cipherText.value;
            plain = vigenereDecrypt(text, key);
        } else if (algorithm === 'mixed-alphabet') {
            console.log(isfile);
            let mixedAlphabet = ['m', 'i', 'x', 'e', 'd', 'a', 'l', 'p', 'h', 'b', 't', 'c', 'f', 'g', 'j', 'k', 'n', 'o', 'q', 'r', 's', 'u', 'v', 'w', 'y', 'z'];
            let text = isfile ? filecontent : cipherText.value;
            plain = mixedAlphabetDecrypt(text, mixedAlphabet);
        } else if (algorithm === 'homophonic') {
            let text = isfile ? filecontent : cipherText.value;
            plain = homophonicDecrypt(text, homophonicMap);
        } else if (algorithm === 'rail-fence') {
            let key = 3;
            let text = isfile ? filecontent : cipherText.value;
            plain = decryptRailFence(text, key);
        } else if (algorithm === 'Affine') {
            let key = [5, 8];
            let text = isfile ? filecontent : cipherText.value;
            plain = decryptAffine(text, key);
        } else if (algorithm === 'columnar-transposition') {
            let key = 'luck';
            let text = isfile ? filecontent : cipherText.value;
            plain = decryptColumnarTransposition(text, key);
        } else if (algorithm === 'play-fair') {;
            let text = isfile ? filecontent : cipherText.value;
            plain = playfairDecrypt(text);
        } else if (algorithm === 'one-time') {
            let key = "randomkeyrandomkeyrandomkeyrandomkeyrandomkeyrandomkeyrandomkeyrandomkeyrandomkeyrandomkeyrandomkey";
            let text = isfile ? filecontent : cipherText.value;

            plain = decryptOneTimePad(text, key);
        } else if (algorithm === 'auto-key') {
            let key = "KEYghgldhfpgIUFHWUHB;aksjhUHF9[UH0[13UJ[JQFD'NJ'LADNFJBHDJKBFCVHBAIFY";
            let text = isfile ? filecontent : cipherText.value;
            plain = decryptAutokey(text, key);
        } 
        if(isfile)
        {
            plainfile = plain;
        }else {
            plainText.value = plain;
        }
    });

    uploadBtn.addEventListener('click', function(event) {
        event.preventDefault();
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            filecontent = e.target.result;
            isfile = 1;
            showMessage('File uploaded successfully!');
        };
        reader.readAsText(file);
    });

    function showMessage(message) {
        // Create a new element to display the message
        const successMessage = document.createElement('p');
        successMessage.textContent = message;
        console.log(successMessage.textContent);
        // Add CSS class for animation
        successMessage.classList.add('success-message');
        // Append the message element to the document body or any other desired location
        document.body.appendChild(successMessage);
        // Remove the message after a delay
        setTimeout(function() {
            successMessage.remove();
        }, 3000);
    }
    

    downloadBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const textToSave = encrypt ? cipherfile : plainfile;
        const blob = new Blob([textToSave], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'file.txt';
        link.click();
        isfile = 0;
    });
});
