const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNnumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
// query selector all for all checkbox data
const allCheckbox = document.querySelectorAll("input[type = checkbox]");
// string for diffrent symbols
const symbols = "~!@#$%^&*()_+{}[]/=<>,?;";

// defaul values
let password = "";
let passwordLength = 10;
let checkCount = 0;
// set strength circle color to "gray"
handleSlider();
setIndicator('#ccc');

// function - set password length
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  const min= inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%";
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
  // shadow
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

// functions for diffrent choices
function generateLowercase() {
  // return getRndInteger(97,123); -->(a,z)
  return String.fromCharCode(getRndInteger(97, 123));
}

function generateUppercase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
  const randomNumber = getRndInteger(0, symbols.length);
  return symbols.charAt(randomNumber);
}

function clacStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;

  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNumber = true;
  if (symbolsCheck.checked) hasSymbol = true;

  // rules
  if (hasUpper && hasLower && hasNumber && hasSymbol && passwordLength >= 8) {
    setIndicator("#0fe091");
  } else if (
    (hasUpper || hasLower) &&
    (hasNumber || hasSymbol) &&
    passwordLength >= 6
  ) {
    setIndicator("#ed1717");
  } else {
    setIndicator("#dbd5d5");
  }
}
// function use API called navigateor.clipboard API for copy text to clipboard :(return Promise)
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "failed";
  }
  // to make copy wala span visible in css
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

// evetnlistners

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

// generating btn for copy
copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyContent();
  } else {
    // alert("Generate Password First!!");
    console.log("Generate Password First!!");
  }
});

allCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckboxChange);
});
// move
handleSlider();
function handleCheckboxChange() {
  checkCount = 0;
  allCheckbox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });
  // handel special case condition
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

generateBtn.addEventListener("click", () => {
  // none of the checkbox are selected that case..
  if (checkCount <= 0) {
    return;
  }

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  // let's start the journey to find new password

  // remove old password..
  password = "";

  let funArr = [];
  // push into array if checked
  if (uppercaseCheck.checked) {
    funArr.push(generateUppercase);
  }

  if (lowercaseCheck.checked) {
    funArr.push(generateLowercase);
  }

  if (numbersCheck.checked) {
    funArr.push(generateRandomNumber);
  }

  if (symbolsCheck.checked) {
    funArr.push(generateSymbol);
  }

  // compulsiry addition
  for (let i = 0; i < funArr.length; i++) {
    password += funArr[i]();
  }
  // remaining addition
  for (let i = 0; i < passwordLength - funArr.length; i++) {
    let randIndex = getRndInteger(0, funArr.length);
    password += funArr[randIndex]();
  }

  // shuffle the password <-----Array.from(password): This part of the code converts the password variable into an array. The Array.from() method creates a new, shallow-copied array instance from an array-like or iterable object. In this case, it's converting the characters of the password into an array.
  password = shufflePassword(Array.from(password));

  // display in UI
  passwordDisplay.value = password;
  // calculate strength
  clacStrength();
});

// algo for shuffling password
// <------------------ fisher yeats method ------------------>
function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  // let str = "";
  // array.forEach((el) => (str + el));
  // return str;
  let str = array.join("");
  return str;
}
