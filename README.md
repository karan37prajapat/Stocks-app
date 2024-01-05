# Stock Price Tracker

This web application displays a list of stocks  price updates. The backend is built with Node.js, and it fetches stock data from the Polygon API. The frontend, developed in React, interacts with the backend to statically display stock prices.

## Features

### Backend

1. **Fetch Stocks**: Retrieves a list of 20 stocks along with their open prices from the Polygon API. Each stock is assigned a unique refresh interval between 1 to 5 seconds and is stored in a backend file.

2. **Update Stock Prices**: Regularly updates the prices of each stock with a random value, ensuring that each stock is updated at its own interval.

3. **API Endpoint**: Exposes an API endpoint to fetch stock prices from the backend file.

### Frontend

1. **User Input**: Takes an integer 'n' from the user (not exceeding 20).

2. **Fetch Stocks**: Fetches 'n' stocks from the backend and implements a short polling system to fetch stock prices every second.

3. **Display Data**: Displays the received data on the frontend.

