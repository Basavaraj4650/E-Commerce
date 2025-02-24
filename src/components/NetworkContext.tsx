import React, {createContext, useState, useEffect, ReactNode} from 'react';
import NetInfo from '@react-native-community/netinfo';

interface NetworkContextProps {
  isConnected: boolean;
}

export const NetworkContext = createContext<NetworkContextProps>({
  isConnected: true,
});

interface NetworkProviderProps {
  children: ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({children}) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? true); // Default to true if state.isConnected is null
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={{isConnected}}>
      {children}
    </NetworkContext.Provider>
  );
};
