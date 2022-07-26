// ::::::::
// DATABASE
// ::::::::

let beers = [
  {
    name: "Leo",
    base: 10,
    min: 8,
    current: 11,
    trending: 1
  },
  {
    name: "Singha",
    base: 10,
    min: 7,
    current: 9,
    trending: 0
  },
  {
    name: "Chang",
    base: 9,
    min: 6,
    current: 10,
    trending: 1
  }
];
let orders = [];
let snaps = [];

// :::::::
// METHODS
// :::::::

const updateTrend = () => {
  beers = beers.map(beer => {
    // Update the trend
    if (beer.current >= beer.base) {
      beer.trending = 1;
    } else {
      beer.trending = 0;
    }
    return beer;
  });
};

const createOrder = beerName => {
  // Find beer
  let beer = beers.find(b => b.name == beerName);
  // Create order
  orders.push(beer);
  // Add 2% to current price
  beer.current = Number((beer.current + (beer.current / 100) * 2).toFixed(2));
  updateTrend();
};

const decreasePrices = () => {
  beers = beers.map(beer => {
    // Remove 1% from current price, prevent from going below min price
    if (beer.current <= beer.min) {
      beer.current = beer.min;
    } else {
      beer.current = Number(
        (beer.current - (beer.current / 100) * 1).toFixed(2)
      );
    }
    return beer;
  });
};

// :::
// DOM
// :::

// Nav

let nav = document.querySelector("nav");

// Place each beer as a button in the nav
beers.forEach(beer => {
  nav.innerHTML += `<button onclick="createOrder('${beer.name}')">Order ${beer.name}</button>`;
});

// Table

let tbody = document.querySelector("table tbody");

const updateTable = () => {
  decreasePrices();
  updateTrend();
  // Reset the content of the table
  tbody.innerHTML = "";
  // Add each beer as a table row
  beers.forEach((beer, i) => {
    tbody.innerHTML += `
		<tr class=${beer.trending ? "up" : "down"}>
			<td>${beer.name}</td>
			<td>${beer.base}</td>
			<td class="trend">${beer.current}</td>
			<td class="trend">${beer.trending ? "UP" : "DOWN"}</td>
		</tr>
	`;
  });
};

// :::::
// TIMER
// :::::

// Refresh every second

updateTable();
let loop = setInterval(() => {
  updateTable();
}, 1000);

// Stop after 60 seconds

setInterval(() => {
  clearInterval(loop);
}, 60000);
