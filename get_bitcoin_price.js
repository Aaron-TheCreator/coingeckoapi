// this is a vanilla js HTTP GET request to coingecko API
// to get the current price of bitcoin, ask whether USD or EUR
//  and return price as string
// this can be improved by passing in the contract address in the url and 
// having much less data to parse through

const https = require('https'); // https://nodejs.org/api/https.html

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let keep;
const options = {
  method:   'GET',
  hostname: 'api.coingecko.com',
  path:     '/api/v3/coins/bitcoin',
}

// this object is defined to hold the result of parsing through and manipulating response data
let result = {};

const req = https.request(options, (res) => {

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    readline.question('Which currency (Ex. USD, EUR, JPY, ETH)?', curr => {
        if (JSON.parse(data)['market_data']['current_price'][`${curr}`.toLowerCase()]) {
          console.log('The price of Bitcoin is ' + JSON.parse(data)['market_data']['current_price'][`${curr}`.toLowerCase()] + `${curr}`+ " per coin.");
        } else {
            console.log(`Currency: ${curr} not found. Please Try again`);
        };
        readline.close();
    })
  });

  res.on('error', (e) => {
    console.error('Error: ' + e.message);

  });

  
});

req.end();

