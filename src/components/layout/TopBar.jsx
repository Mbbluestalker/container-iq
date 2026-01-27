import React from 'react';
import SearchBar from '../common/SearchBar';
import NotificationBell from '../common/NotificationBell';
import UserDropdown from '../common/UserDropdown';

const TopBar = () => {
  return (
    <header className="h-24 fixed top-0 left-56 right-0 z-10">
      <div className="h-full px-6 pt-6 flex items-center justify-between gap-6">
        <SearchBar />
        <div className="flex items-center gap-2">
          <NotificationBell count={1} />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
