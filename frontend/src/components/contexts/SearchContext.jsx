// src/SearchContext.js
import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userEmail, setUserEmail] = useState('');

  return (
    <SearchContext.Provider value={{search:[searchQuery, setSearchQuery], user:[userEmail, setUserEmail]}}>
      {children}
    </SearchContext.Provider>
  );
};
