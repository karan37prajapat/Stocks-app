# Stock Price Tracker

## Project Overview

This web application is designed to display a list of stocks and their  price . The project is divided into backend and frontend components, each contributing to the overall functionality of the application.

## Backend

### Functionality Implemented

1. **Fetch Stocks from Polygon API:**
   - Obtains a list of 20 stocks with their open prices from the Polygon API.

2. **Assign Refresh Intervals:**
   - Assigns a unique refresh interval (between 1 to 5 seconds) to each stock and stores this information in a backend file.

3. **Update Stock Prices:**
   - Regularly updates the prices of each stock with a random value at their respective refresh intervals.

4. **API Endpoint:**
   - Exposes an API endpoint (`/showData/updateStockPricesUsingWebSokets`) to fetch stock prices from the backend file.

### Pending Functionality

Unfortunately, due to time constraints and limited knowledge of websockets, I couldn't dynamically update stock prices on the frontend as intended. However, the backend functionality to update prices using websockets is implemented and can be accessed through the mentioned API endpoint.

## Frontend

### User Interaction

1. **User Input:**
   - Takes an integer 'n' from the user, not exceeding 20.

2. **Fetch Stocks:**
   - Fetches 'n' stocks from the backend.

3. **Display Data:**
   - Implements a short polling system to fetch stock prices from the backend every second.(pending)
   - Displays the received data on the frontend.

### Explanation for Pending Functionality

While I initially attempted to dynamically update stock prices on the frontend using JavaScript, I encountered performance issues and the code became cumbersome. Realizing the limitations, I opted for a backend solution utilizing websockets (`/showData/updateStockPricesUsingWebSokets`). Unfortunately, this functionality remains pending on the frontend due to my current understanding of websockets.

##Firstly install frontend and backend dependencies and to start the Project use "npm run dev" 

## How to Continue/Contribute

Feel free to explore the codebase and provide feedback. If you have expertise in websockets or want to contribute to completing the frontend functionality, your collaboration would be highly appreciated.

If you'd like a detailed explanation of the project or have any questions, please feel free to reach out. I am committed to further improving and completing this project.

Thank you for your understanding and consideration.

Sincerely,

Karan Prajpat
