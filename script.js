let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];
const cashElement = document.getElementById("cash");
const pennyElement = document.getElementById("pennies");
const nickelElement = document.getElementById("nickels");
const dimeElement = document.getElementById("dimes");
const quarterElement = document.getElementById("quarters");
const oneElement = document.getElementById("ones");
const fiveElement = document.getElementById("fives");
const tenElement = document.getElementById("tens");
const twentyElement = document.getElementById("twenties");
const hundredElement = document.getElementById("hundreds");
const purchaseButton = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const priceElement = document.getElementById("price");
// let change = parseFloat(cashElement.value);

const changeDueValues = [
  ["PENNY", 0],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];

priceElement.innerText = `Price: $${price}`;
pennyElement.innerText = cid[0][1];
nickelElement.innerText = cid[1][1];
dimeElement.innerText = cid[2][1];
quarterElement.innerText = cid[3][1];
oneElement.innerText = cid[4][1];
fiveElement.innerText = cid[5][1];
tenElement.innerText = cid[6][1];
twentyElement.innerText = cid[7][1];
hundredElement.innerText = cid[8][1];

const checkCash = () => {
  let total = 0;
  for(let i=0; i<cid.length; i++){
    total += cid[i][1];
  }
  return total;
}

const getChange = () => {
  let cash = parseFloat(cashElement.value);
  let change = Number((cash - price).toFixed(2));
  return change;
}

const updateChangeAvailableValues = () => {
  pennyElement.innerText = cid[0][1];
  nickelElement.innerText = cid[1][1];
  dimeElement.innerText = cid[2][1];
  quarterElement.innerText = cid[3][1];
  oneElement.innerText = cid[4][1];
  fiveElement.innerText = cid[5][1];
  tenElement.innerText = cid[6][1];
  twentyElement.innerText = cid[7][1];
  hundredElement.innerText = cid[8][1];
}

const updateChangeDueValues = () =>{
  for(let i=8; i>=0; i--){
    if(changeDueValues[i][1] > 0){
      changeDue.innerHTML += `<p><b>${changeDueValues[i][0]}</b>: $${changeDueValues[i][1]}`;
    }
  }
}

const evaluate = () => {
  let cash = parseFloat(cashElement.value);
  let change = getChange();
  const numbers = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
  if(cash < price){
    alert("Customer does not have enough money to purchase the item");
  }
  else if(cash === price){
    changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
  }
 else if(cash - price > checkCash()){
    changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
  }
  else{
      if(change === checkCash()){
        changeDue.innerHTML = `<p>Status: <b>CLOSED</b></p>`;
      }
      else{
        changeDue.innerHTML = `<p>Status: <b>OPEN</b></p>`;
      }
      for(let i=8; i>= 0; i--){
        let currentCidValue = cid[i][1];
        console.log(change);
        console.log(currentCidValue);
        while(change >= numbers[i] && currentCidValue > 0){
          change = Number((change - numbers[i]).toFixed(2));
          currentCidValue = Number((currentCidValue - numbers[i]).toFixed(2));
          changeDueValues[i][1] = Number((changeDueValues[i][1] + numbers[i]).toFixed(2));
        }
      }
      updateChangeAvailableValues();
      updateChangeDueValues();
      if(change > 0){
        changeDue.innerText = "Status: INSUFFICIENT_FUNDS"
      }
  }
}
purchaseButton.addEventListener("click", evaluate);
