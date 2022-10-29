import React, { useState, useEffect, createContext } from 'react';

export const NovoPostContext = createContext();

export const NovoPostContextProvider = ({ children }) => {
  const [enderecoMap, setEnderecoMap] = useState(null);

  return (
    <NovoPostContext.Provider value={{ enderecoMap, setEnderecoMap }}>
      {children}
    </NovoPostContext.Provider>
  );
};
