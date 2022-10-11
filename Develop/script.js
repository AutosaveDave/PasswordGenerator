// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword() {
  //-----------Prompt for length
  let pwLength = 8;
  let confirmed = false;
  while( !confirmed ){
    pwLength = parseInt(prompt("How many characters?",8));
    if(!Number.isNaN(pwLength) && pwLength>=8 && pwLength<=128){
      confirmed=true;
    } else if(Number.isNaN(pwLength)){
      alert("Length must be a number.");
    } else {
      alert("Length must be at least 8 characters and no more than 128 characters.");
    }
  }
  //-----------Prompt for character types
  let includeLowercase = true;
  let includeUppercase = true;
  let includeNumbers = true;
  let includeSpecial = true;

  confirmed = false;
  while( !confirmed ){
    includeLowercase = confirm("Include lowercase characters?");
    includeUppercase = confirm("Include uppercase characters?");
    includeNumbers = confirm("Include numeric characters?");
    includeSpecial = confirm("Include special characters?");

    if( !(!includeLowercase && !includeUppercase && !includeNumbers && !includeSpecial) ){
      confirmed=true;
    } else {
      alert("At least one character type must be selected.");
    }
  }

  let lowerCase = [];
  for(let i = 97 ; i<=122 ; i++){
    lowerCase.push(String.fromCharCode(i));
  }

  let upperCase = [];
  for(let i = 65 ; i<=90 ; i++){
    upperCase.push(String.fromCharCode(i));
  }

  let numChars = [];
  for(let i = 48 ; i<=57 ; i++){
    numChars.push(String.fromCharCode(i));
  }

  let specialChars = [];
  for(let i = 32 ; i<=47 ; i++){
    specialChars.push(String.fromCharCode(i));
  }
  for(let i = 58 ; i<=64 ; i++){
    specialChars.push(String.fromCharCode(i));
  }
  for(let i = 91 ; i<=96 ; i++){
    specialChars.push(String.fromCharCode(i));
  }
  for(let i = 123 ; i<=126 ; i++){
    specialChars.push(String.fromCharCode(i));
  }

  let allChars = [];
  if(includeLowercase){
    allChars.push(...lowerCase);
  }
  if(includeUppercase){
    allChars.push(...upperCase);
  }
  if(includeNumbers){
    allChars.push(...numChars);
  }
  if(includeSpecial){
    allChars.push(...specialChars);
  }

  //--------- Pick unique spots to insert required characters
  const iLowercase = Math.floor(Math.random()*pwLength);
  let iUppercase = Math.floor(Math.random()*pwLength);
  while(iUppercase===iLowercase){
    iUppercase = Math.floor(Math.random()*pwLength);
  }
  let iNumber = Math.floor(Math.random()*pwLength);
  while(iNumber===iLowercase || iNumber===iUppercase){
    iNumber = Math.floor(Math.random()*pwLength);
  }
  let iSpecial = Math.floor(Math.random()*pwLength);
  while(iSpecial===iLowercase || iSpecial===iUppercase || iSpecial===iNumber){
    iSpecial = Math.floor(Math.random()*pwLength);
  }

  console.log(allChars);

  let pw = "";

  for(let i = 0 ; i < pwLength ; i++){
    if(includeLowercase && i===iLowercase){
      pw+=pickRandom(lowerCase);
    } else if(includeUppercase && i===iUppercase){
      pw+=pickRandom(upperCase);
    } else if(includeNumbers && i===iNumber){
      pw+=pickRandom(numChars);
    } else if(includeSpecial && i===iSpecial){
      pw+=pickRandom(specialChars);
    } else {
      pw+=pickRandom(allChars);
    }
  }

  return pw;

}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function pickRandom(charList) {
  const rand = Math.floor(Math.random() * charList.length);

  return charList[rand];
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
