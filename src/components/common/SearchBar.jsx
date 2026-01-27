import React from 'react';

const SearchBar = () => {
  return (
    <div className="relative w-[450px]">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search trips, trucks, containers..."
        className="w-full pl-10 pr-4 py-2 bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-teal focus:border-transparent text-text-dark placeholder:text-text-light cursor-text"
      />
    </div>
  );
};

export default SearchBar;
