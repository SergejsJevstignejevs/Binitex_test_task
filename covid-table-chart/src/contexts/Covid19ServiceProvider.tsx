import React, { useContext } from "react";

import useCovid19Service, { Covid19Service } from "../hooks/covid19Service.hook";

const Covid19ServiceContext = React.createContext<Covid19Service | undefined>(undefined);

export const useCovid19ServiceDI = (): Covid19Service => {
    const service = useContext(Covid19ServiceContext);

    if (!service) {
      throw new Error('Covid19ServiceContext not found');
    }
    
    return service;
};

interface Covid19ServiceProps {
  children: React.ReactNode;
}

export const Covid19ServiceProvider: React.FC<Covid19ServiceProps> = ({ children }) => {
    const covid19Service: Covid19Service = useCovid19Service();
  
    return (
      <Covid19ServiceContext.Provider value={covid19Service}>
        {children}
      </Covid19ServiceContext.Provider>
    );
  };