//  **  Declarations
const defaultLength = 8;
const defaultUseLowercase = true;
const defaultUseNumeric = true;
const defaultUseSpecial = true;
const minLength = 8;
const maxLength = 128;

var wordList = ["able","add","age","ago","air","all","also","and","any","area","arm","art","ask","away","baby","back","bad","bag","ball","bank","bar","base","beat","bed","best","big","bill","bit","blue","body","book","born","both","box","boy","but","buy","call","can","car","card","care","case","cell","city","cold","come","cost","cup","cut","dark","data","day","dead","deal","deep","die","dog","door","down","draw","drop","drug","each","east","easy","eat","edge","else","end","even","ever","eye","face","fact","fail","fall","far","fast","fear","feel","few","fill","film","find","fine","fire","firm","fish","five","fly","food","foot","for","form","four","free","from","full","fund","game","gas","get","girl","give","goal","good","grow","gun","guy","hair","half","hand","hang","hard","have","head","hear","heat","help","her","here","high","him","his","hit","hold","home","hope","hot","hour","how","huge","idea","into","item","its","job","join","just","keep","key","kid","kill","kind","know","land","last","late","law","lay","lead","left","leg","less","let","lie","life","like","line","list","live","long","look","lose","loss","lot","love","low","main","make","man","many","may","mean","meet","mind","miss","more","most","move","Mrs","much","must","n't","name","near","need","new","news","next","nice","none","nor","not","note","now","off","oil","old","once","one","only","onto","open","our","out","over","own","page","pain","part","pass","past","pay","per","pick","plan","play","poor","pull","push","put","race","rate","read","real","red","rest","rich","rise","risk","road","rock","role","room","rule","run","safe","same","save","say","sea","seat","see","seek","seem","sell","send","set","sex","she","shot","show","side","sign","sing","sit","site","six","size","skin","some","son","song","soon","sort","star","stay","step","stop","such","sure","take","talk","task","tax","team","tell","ten","tend","term","test","than","that","the","them","then","they","this","thus","time","too","top","town","tree","trip","true","try","two","type","unit","upon","use","very","view","vote","wait","walk","wall","want","war","way","wear","week","well","west","what","when","who","whom","why","wide","wife","will","win","wind","wish","with","word","work","yard","yeah","year","yes","yet","you","your"];
var specialChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var numberList = "0123456789";
var alphaLower = "qwertyyuiopasdfghjklzxcvbnm";
var alphaUpper = "QWERTYUIOPASDFGHJKKLZXCVBNM";

// Assignment Code
var generateBtn = document.getElementById("generate");
var runBtn = document.getElementById("runGenerator");
var closeBtn = document.getElementById("cancelForm");

// Write password to the #password input
function writePassword() {
  var inputLength = document.getElementById("length");
  var checkCaseSensitive = document.getElementById("case-sensitive");
  var checkNumbers = document.getElementById("include-numbers");
  var checkSpecial = document.getElementById("include-special");

  //  Get user settings from form

  var passLength = inputLength.value;
  var passLengthNumeric = parseInt(passLength);
  var useLowercase = checkCaseSensitive.checked;
  var useNumeric = checkNumbers.checked;
  var useSpecial = checkSpecial.checked;
  var userResponse;

  //  Validate length field before running algorithm
  
  if (isNaN(passLengthNumeric)) {
    alert("Please enter a desired length from " + minLength + " to " + maxLength + " characters to proceed.");
    return;

  } else if (passLengthNumeric < minLength) {
    userResponse = confirm("Minimum length is " + minLength + " characters. Is that okay?");
    if (userResponse) {
      passLengthNumeric = minLength;
      inputLength.value = passLengthNumeric;
    } else {
      return;
    }

  } else if (passLengthNumeric > maxLength) {
    userResponse = confirm("Maximum length is " + maxLength + " characters. Is that okay?");
    if (userResponse) {
      passLengthNumeric = maxLength;
      inputLength.value = passLengthNumeric;
    } else {
      return;
    }
  }

  //  Generate password

  var password = generatePassword(passLengthNumeric, useLowercase, useNumeric, useSpecial);
  var passwordText = document.getElementById("password");

  passwordText.value = password;
  lowerFormOpacity();

  // closeForm();
}

function generatePassword(passwordLength, isCaseSensitive, isIncludingNumbers, isIncludingSpecial) {
  //  **  Declarations
  let returnPassword = "";
    
  const chanceUpper_FirstOrLast = 0.5;
  const chanceReplaceCharacter = 0.25;

  let currentSpecial = "";
  let currentNumeral = "";
  let currentWord = "";
  let workingPassword = "";
  let currentLength = 0;
  let upperCaseDirection = 0;

  //  **  Functions

  //  Adds an element from the indicated array or string to workingPassword and updates currentLength.
  function addElement(wordArray) {
    let currentWord = randomElement(wordArray);

    if (isCaseSensitive && (currentWord.length > 1)) {
      currentWord = currentWord.toLowerCase();

      if (upperCaseDirection > 0) {
        currentWord = currentWord[0].toUpperCase() + currentWord.substring(1);

      } else {
        currentWord = currentWord.substring(0, currentWord.length - 1) + currentWord.substring(currentWord.length - 1).toUpperCase();        
      }

    } else {
      currentWord = currentWord.toUpperCase();
    }

    workingPassword += currentWord;
    currentLength += currentWord.length;
  }
  
  //  Replaces elements from the indicated array or string without adding or removing anything.
  function replaceElement(wordArray) {
    let arrayShuffled;
    let replacedCount = 0;

    if (typeof wordArray == "string") {
      arrayShuffled = wordArray.split("");
    } else {
      arrayShuffled = [...wordArray];
    }

    shuffleArray(arrayShuffled);
    
    for (var i = 0; i < arrayShuffled.length; i++) {
      if (Math.random() > chanceReplaceCharacter) {
        continue;
      }

      let replacementCharacter = arrayShuffled[i];
      let characterToReplace = "";
      let loopCount = -1;

      do {
        characterToReplace = randomElement(workingPassword);
        loopCount++;

        if (loopCount > 9) {
          replacedCount--;
          break;
        }
      } while (alphaLower.indexOf(characterToReplace) < 0);
      
      workingPassword = workingPassword.replace(/characterToReplace/i, replacementCharacter);
      replacedCount++;
    }

    if (replacedCount < 1) {
      let fourthQuarterReplacement = randomElement(wordArray);
      workingPassword = workingPassword.substring(0, workingPassword.length - 1) + fourthQuarterReplacement[0];
    }
  }
  
  //  **  Logic

  if (isCaseSensitive) {
    if (Math.random() < chanceUpper_FirstOrLast) {
      upperCaseDirection = 1;
    } else {
      upperCaseDirection = -1;
    }
  }

  //  Generate first word in sequence

  addElement(wordList);

  if (isIncludingSpecial) {
    addElement(specialChars);
  }

  //  Generate required number of characters

  while (currentLength < passwordLength) {
    addElement(wordList);

    if (isIncludingSpecial) {
      addElement(specialChars);
    }
  }
  
  //  If there's leading or trailing whitespace, we're gonna get rid of it first.

  workingPassword = workingPassword.trim();

  //  Trim otherwise unneeded characters

  if (workingPassword.length > passwordLength) {
    workingPassword = workingPassword.substring(0, passwordLength);
  }

  //  Add numerals, if appropriate

  if (isIncludingNumbers) {
    replaceElement(numberList);
  }

  //  Final QC
  for (let j = 0; j < alphaUpper.length - 1; j++) {
    if (workingPassword.indexOf(alphaUpper) > -1) {
      break;
    }
    if (j = alphaUpper.length -1) {
      workingPassword = randomElement(alphaUpper) + workingPassword.substring(1);
    }
  }
  
  if (isCaseSensitive) {
    for (let k = 0; k < alphaLower.length - 1; k++) {
      if (workingPassword.indexOf(alphaLower) > -1) {
        break;
      }
      if (k = alphaLower.length -1) {
        workingPassword = workingPassword[0] + randomElement(alphaLower) + workingPassword.substring(2);
      }
    }
  }

  if (isIncludingSpecial) {
    for (let l = 0; l < specialChars.length - 1; l++) {
      if (workingPassword.indexOf(specialChars) > -1) {
        break;
      }
      if (l = specialChars.length -1) {
        workingPassword = workingPassword.substring(0,2) + randomElement(specialChars) + workingPassword.substring(3);
      }
    }
  }

  if (isIncludingNumbers) {
    for (let m = 0; m < numberList.length - 1; m++) {
      if (workingPassword.indexOf(numberList) > -1) {
        break;
      }
      if (m = numberList.length -1) {
        workingPassword = workingPassword.substring(0,3) + randomElement(numberList) + workingPassword.substring(4);
      }
    }
  }

  while (workingPassword.length < passwordLength) {
    workingPassword += addElement(alphaUpper);
  }
  

  //  Deliver product

  returnPassword = workingPassword;

  return returnPassword;
}

//  Returns one item from an array or one character from a string
function randomElement(targetArray) {
  let randIndex = Math.floor(Math.random() * targetArray.length);
  return targetArray[randIndex];
}

//  Set popup visibility
function openForm() {
  document.getElementById("popupForm").style.display="block";
  raiseFormOpacity();
}

//  Set popup visibility
function closeForm() {
  document.getElementById("popupForm").style.display="none";
}

function lowerFormOpacity() {
  document.getElementById("popupForm").style.opacity = "0.85";
}

function raiseFormOpacity() {
  document.getElementById("popupForm").style.opacity = "0.95";
}

//  from https://github.com/Daplie/knuth-shuffle
// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Add event listener to generate button
generateBtn.addEventListener("click", function () {
  event.preventDefault();
  openForm();
});

runBtn.addEventListener("click", function () {
  event.preventDefault();
  writePassword();
});
closeBtn.addEventListener("click", function () {
  event.preventDefault();
  closeForm();
})
