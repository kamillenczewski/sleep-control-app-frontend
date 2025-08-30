import { createContext, useContext, useEffect, useState } from 'react';
import AddUserToChartBox from '@/components/AddUserToChartBox';
import { getAllUsers } from '@/components/Backend';
import { useUser } from '@/components/UserContext';

const AddUserToChartContext = createContext();

export const AddUserToChartProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);

  const { name: userName } = useUser();

  const open = () => setIsVisible(true);
  const close  = () => setIsVisible(false);

  const clearData = () => setData([]);

  useEffect(() => {
    if (!userName) return;
    getAllUsers(users => setUsers(users.filter(user => user.name !== userName)));
  }, [userName])

  return (
    <AddUserToChartContext.Provider value={{ isVisible, open, close, data, clearData }}>
      {children}
      <AddUserToChartBox 
        isVisible={isVisible} 
        close={close} 
        setData={setData} 
        users={users} 
      />
    </AddUserToChartContext.Provider>
  );
};

export const useAddUserToChartContext = () => useContext(AddUserToChartContext);
