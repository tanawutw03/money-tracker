const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form-submit");
const text = document.getElementById("transaction-name");
const amount = document.getElementById("transaction-amount");

const dataTransaction = [
  {
    id: 1,
    text: "ค่าขนม",
    amount: -100,
  },
  {
    id: 2,
    text: "ค่าห้อง",
    amount: -3000,
  },
  {
    id: 3,
    text: "เงินเดือน",
    amount: +18000,
  },
];

const transactions = dataTransaction;

const init = () => {
  transactions.forEach(addDataToList);
  calculateMoney();
};

const addDataToList = (transactions) => {
  const symbol = transactions.amount < 0 ? "-" : "+";
  const status = transactions.amount < 0 ? "minus" : "plus";
  console.log(status, transactions);
  const item = document.createElement("li");
  item.classList.add(status);
  item.innerHTML = `${transactions.text} <span>${symbol}${Math.abs(
    transactions.amount
  )}</span> <button class="delete-btn">X</button>`;
  console.log(item);
  list.appendChild(item);
};

// ใช้ Regex ในการเพิ่ม Comma ให้กับตัวเลขทางการเงิน
const formatFinancialNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const calculateMoney = () => {
  const amounts = transactions.map((transactions) => transactions.amount);
  console.log(amounts);

  //ยอดคงเหลือทั้งหมด
  const total = amounts
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  console.log(`Remaining balance: ${total}`);

  //รายรับ
  const income = amounts
    .filter((item) => item > 0)
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  console.log(`Income Remaining: ${income}`);

  //รายจ่าย
  const expense = (
    amounts
      .filter((item) => item < 0)
      .reduce((result, item) => (result += item), 0) * -1
  ).toFixed(2);
  console.log(`Expense Remaining: ${expense}`);

  balance.innerText = `฿` + formatFinancialNumber(total);
  moneyPlus.innerText = `฿` + formatFinancialNumber(income);
  moneyMinus.innerText = `฿` + formatFinancialNumber(expense);
};

init();
