import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const [fetchOnButtonClick, setFetchOnButtonClick] = useState(false);

  useEffect(() => {
    if (fetchOnButtonClick) {
      const apiUrl = `http://localhost:3000/stocks/${value}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
      setFetchOnButtonClick(false);
    }
  }, [value, fetchOnButtonClick]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleButtonClick = () => {
    setFetchOnButtonClick(true);
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-4 text-blue  ">
        Enter Number of Stock You want to fetch From Backend static Data
      </h1>
      <div className="flex items-center justify-center space-x-2 mb-8">
        <input
          type="number"
          id="valueInput"
          value={value}
          onChange={handleInputChange}
          className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 text-black "
          placeholder="Enter Number of Stock"
        />
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Fetch Data
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.slice(0, 20).map((item) => (
          <div
            key={item.symbol}
            className="bg-white text-black p-4 rounded-md shadow-md"
          >
            <p className="text-lg font-semibold">Stock Symbol: {item.symbol}</p>
            <p className="text-md">Price: {item.open}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
