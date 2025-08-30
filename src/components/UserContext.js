import { createContext, useState, useContext, useEffect } from 'react';
import { getIdFromName, getUserOptions } from '@/components/Backend'



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;
    getIdFromName(name, data => setId(data));
  }, [name]);

  useEffect(() => {
    if (!id) return; 
    setLoading(false);
  }, [id]);

  const resetUser = () => {
    setName(null);
    setId(null);
    setOptions(null);
    setLoading(true);
  };

  return (
    <UserContext.Provider value={{ id, name, setName, resetUser, options, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);