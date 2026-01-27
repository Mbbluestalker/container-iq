import React from 'react';

const UserDropdown = () => {
  return (
    <button className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
      <svg
        className="w-4 h-4 text-text-dark"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
};

export default UserDropdown;
