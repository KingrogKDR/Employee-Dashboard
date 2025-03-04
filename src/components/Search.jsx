import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchId, setSearchId] = useState("");
  const handleInputChange = (e) => {
    const id = e.target.value;
    setSearchId(id);
    onSearch(id);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="relative">
        <input
          type="text"
          value={searchId}
          onChange={handleInputChange}
          placeholder="Enter employee id..."
          className="px-4 py-2 border-2 border-gray-400 rounded-full w-64 lg:w-96 focus:outline-none focus:shadow-md text-sm transition duration-300"
        />
        <img
          src="search.svg"
          alt="search"
          className="size-5 absolute right-2 top-2 hover:scale-110 transition duration-300 active:opacity-60"
        />
      </div>
    </div>
  );
};

export default Search;
