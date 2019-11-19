const fetch = require("node-fetch");
let priceArray = [];
let min = "1min";

async function getPrices() {
  let addresses;
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GOOG&outputsize=full&interval=${min}&apikey=API_KEY_HERE`
    );
    addresses = await response.text();
    addresses = JSON.parse(addresses);
    return addresses;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

originalBad = () => {
  let result = 0;
  for (i = 0; i < priceArray.length; i++) {
    for (j = i + 1; j < priceArray.length - i; j++) {
      let sub = priceArray[j] - priceArray[i];
      if (sub > result) {
        result = sub;
      }
    }
  }
  return result;
};

findBest = () => {
  let best = 0;
  let min = priceArray[0];
  for (i = 1; i < priceArray.length - 1; i++) {
    if (priceArray[i] - min > best) {
      best = priceArray[i] - min;
    }
    if (priceArray[i] < min) {
      min = priceArray[i];
    }
  }
  return best;
};

getPrices()
  .then(data => {
    let d = new Date();
    day = d.getDate() - 1;
    for (const timestamp in data[`Time Series (${min})`]) {
      if (timestamp.includes("2019-11-")) {
        var item = data[`Time Series (${min})`][timestamp]["4. close"];
        priceArray.push(parseFloat(item));
      }
    }
    return findBest().toFixed(2);
  })
  .then(data => {
    console.log(data);
  });

module.export = doMath;
