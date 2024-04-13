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

function calcultateTax(gA, eAmounts, age, deduct) {
  const a = parseInt(age.value);
  const ga = parseInt(gA.value);
  const ea = parseInt(eAmounts.value);
  const d = parseInt(deduct.value);

  let totalIncome = (ga + ea - d) * 100000;
  let tax;
  let fIncome;

  if (totalIncome > 800000) {
    if (a < 40) {
      tax = 0.3 * (totalIncome - 800000);
      fIncome = totalIncome - tax;
      price.innerHTML = formatIndianRupee(fIncome);
      return;
    } else if (a >= 40 && a < 60) {
      tax = 0.4 * (totalIncome - 800000);
      fIncome = totalIncome - tax;
      price.innerHTML = formatIndianRupee(fIncome);
      return;
    } else if (a >= 60) {
      tax = 0.1 * (totalIncome - 800000);
      fIncome = totalIncome - tax;
      price.innerHTML = formatIndianRupee(fIncome);
      return;
    }
  } else {
    price.innerHTML = totalIncome;
  }
}

submitBtn.addEventListener("click", function () {
  console.log(eAmount);
  calcultateTax(grossAmount, eAmount, age, deductions);
  popUp.classList.remove("hidden");
});

closeBtn.addEventListener("click", function () {
  popUp.classList.add("hidden");
});
