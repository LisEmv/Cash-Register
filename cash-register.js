function checkCashRegister(price, cash, cid) {
  const values = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };
  let change = cash - price;
  let sumCid = 0;
  for (let i = 0; i < cid.length; i++) {
    sumCid += cid[i][1];
  }
  if (sumCid < change) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  if (sumCid === change) {
    return {status: "CLOSED", change: cid};
  }
  let result = [];
  cid = cid.reverse();
  for (let i = 0; i < cid.length; i++) {
    const coinName = cid[i][0];
    const coinTotal = cid[i][1];
    const coinValue = values[coinName];
    let coinAmount = Math.round(coinTotal / coinValue);
    let coinsToReturn = 0;
    while (change >= coinValue && coinAmount > 0) {
      change -= coinValue;
      change = Math.round(change * 100) / 100;
      coinAmount--;
      coinsToReturn++;
    }
    if (coinsToReturn > 0) {
      result.push([coinName, coinsToReturn * coinValue]);
    }
  }
  if (change > 0) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  return {status: "OPEN", change: result};
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);