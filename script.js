const submitBtn = document.getElementById("submit-btn");
const popUp = document.getElementById("pop-up-container");
const closeBtn = document.getElementById("close-btn");

// Logic

const grossAmount = document.getElementById("grossAmount");
const eAmount = document.getElementById("eIncome");
const age = document.getElementById("age");
const deductions = document.getElementById("deductions");

//popup contents variables
const msg = document.getElementById("msg");
const price = document.getElementById("price");

function formatIndianRupee(number) {
  // Convert the number to a string
  let numberString = number.toString();

  // Add commas to the integer part
  let formattedInteger = "";
  for (let i = numberString.length - 1, j = 0; i >= 0; i--, j++) {
    formattedInteger = numberString[i] + formattedInteger;
    if (j > 0 && j % 2 === 0 && i !== 0) {
      formattedInteger = "," + formattedInteger;
    }
  }

  return formattedInteger;
}

function isFilled() {
  var grossError = document.getElementById("grossError");
  var extraError = document.getElementById("extraError");
  var ageError = document.getElementById("ageError");

  if (grossAmount.value == "") {
    grossError.style.display = "inline";
    grossError.title = "Gross amount is required";
    return 1;
  } else if (eAmount.value == "") {
    extraError.style.display = "inline";
    extraError.title = "Extra Amount is required";
    return 1;
  } else if (age.value === "") {
    ageError.style.display = "inline";
    ageError.title = "Age field is required";
    return 1;
  } else {
    grossError.style.display = "none";
    extraError.style.display = "none";
    ageError.style.display = "none";
    return 0;
  }
}

function specialCharacters() {
  var grossError = document.getElementById("grossError");
  var extraError = document.getElementById("extraError");
  var ageError = document.getElementById("ageError");
  var deductError = document.getElementById("deductError");

  if (isFilled() === 0) {
    if (/[^0-9]/.test(parseInt(grossAmount.value))) {
      grossError.style.display = "inline";
      grossError.title = "Special Charactes are not allowed";
      return 1;
    } else if (/[^0-9]/.test(parseInt(eAmount.value))) {
      extraError.style.display = "inline";
      extraError.title = "Special Charactes are not allowed";
      return 1;
    } else if (/[^0-9]/.test(parseInt(deductions.value))) {
      extraError.style.display = "inline";
      extraError.title = "Special Charactes are not allowed";
      return 1;
    } else {
      grossError.style.display = "none";
      extraError.style.display = "none";
      ageError.style.display = "none";
      deductError.style.display = "none";
      return 0;
    }
  } else {
    return 1;
  }
}

function calcultateTax(gA, eAmounts, age, deduct) {
  const a = parseInt(age.value);
  const ga = parseInt(gA.value);
  const ea = parseInt(eAmounts.value);
  const d = parseInt(deduct.value);

  if (specialCharacters() === 1) {
    return 0;
  } else {
    let totalIncome = (ga + ea - d) * 100000;
    let tax;
    let fIncome;

    if (totalIncome > 800000) {
      if (a == 0) {
        tax = 0.3 * (totalIncome - 800000);
        fIncome = totalIncome - tax;
        price.innerHTML = formatIndianRupee(fIncome);
        return;
      } else if (a == 1) {
        tax = 0.4 * (totalIncome - 800000);
        fIncome = totalIncome - tax;
        price.innerHTML = formatIndianRupee(fIncome);
        return;
      } else if (a == 2) {
        tax = 0.1 * (totalIncome - 800000);
        fIncome = totalIncome - tax;
        price.innerHTML = formatIndianRupee(fIncome);
        return;
      }
    } else {
      price.innerHTML = formatIndianRupee(totalIncome);
    }
  }
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (calcultateTax(grossAmount, eAmount, age, deductions) === 0) {
    return;
  } else {
    popUp.classList.remove("hidden");
  }
});

closeBtn.addEventListener("click", function () {
  popUp.classList.add("hidden");
});
