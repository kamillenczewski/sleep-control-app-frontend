import { createContext, useContext, useState } from 'react';
import DatePicker from '@/components/DatePicker';

const Context = createContext();

export const DatePickerProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  return (
    <Context.Provider value={{ isVisible, open, close, data }}>
      {children}
      <DatePicker isVisible={isVisible} close={close} setData={setData}/>
    </Context.Provider>
  );
};

export const useDatePicker = () => useContext(Context);
