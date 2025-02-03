const rangeInp = document.querySelector(".rangeInp");
const showLength = document.querySelector(".length");
const showPassElem = document.querySelector("p.showPass");
const elems = document.querySelectorAll(".switch input");
const elemsInArr = [...elems];
const generatePassBtn = document.querySelector(".generatePassBtnBox button");
const showPassBox = document.querySelector(".showPassBox");
let password = "";
showLength.textContent = rangeInp.value;
let percentage = ((rangeInp.value - 4) / (32 - 4)) * 100;
rangeInp.style.background = `linear-gradient(90deg, rgb(11, 30, 223) ${percentage}%, rgba(255, 255, 255, 0.216) ${percentage}%`;
let lengthOfPass = rangeInp.value;
const inputRange = () => {
  lengthOfPass = rangeInp.value;
  percentage = ((lengthOfPass - 4) / (32 - 4)) * 100;
  rangeInp.style.background = `linear-gradient(90deg, rgb(11, 30, 223) ${percentage}%, rgba(255, 255, 255, 0.216) ${percentage}%`;
  showLength.textContent = lengthOfPass;
}

const passwordGenerator = () => {
  password = "";
  const checkedInputs = elemsInArr.filter(el => el.checked);
  const symbols = "!@#$%^&*()";
  const numbers = "123457890";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let allChars = "";

  checkedInputs.forEach(inp => {
    if (inp.checked && inp.className === "uppercaseEl") {
      allChars += uppercase;
    } else if (inp.checked && inp.className === "lowercaseEl") {
      allChars += lowercase;
    } else if (inp.checked && inp.className === "symbolEl") {
      allChars += symbols;
    } else if (inp.checked && inp.className === "numberEl") {
      allChars += numbers;
    }
  });
  for (let i = 0; i < lengthOfPass; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }
  showPassElem.textContent = password;
  showPassBox.classList.add("generated");
  showPassBox.classList.remove("copied");
}

const copyPasswordInClipboard = async (pass) => {
  try {
    if (!navigator.clipboard) {
      const textArea = document.createElement("textarea");
      textArea.value = pass;
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showPassBox.classList.replace("generated", "copied");
    } else {
      await navigator.clipboard.writeText(pass);
      showPassBox.classList.replace("generated", "copied");
    }
  } catch (err) {
    console.error("Failed to copy password:", err);
    alert("Failed to copy password. Please try again.");
  }
};

const disableOnlyInput = () => {
  const totalChecked = elemsInArr.filter(el => el.checked);
  totalChecked.forEach(el => {
    el.disabled = (totalChecked.length === 1) ? true : false;
  });
}

showPassBox.addEventListener("click", () => {
  if (showPassElem.textContent === "Click Generate") return;
  copyPasswordInClipboard(password);
});
rangeInp.addEventListener("input", inputRange);
generatePassBtn.addEventListener("click", passwordGenerator);
elemsInArr.forEach(el => el.addEventListener("click", disableOnlyInput));
