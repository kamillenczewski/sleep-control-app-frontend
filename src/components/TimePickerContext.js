import { createContext, useContext, useState } from 'react';
import TimePicker from '@/components/TimePicker';

const TimePickerContext = createContext();

export const TimePickerProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);


  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  return (
    <TimePickerContext.Provider value={{ isVisible, open, close, data }}>
      {children}
      <TimePicker isVisible={isVisible} close={close} setData={setData}/>
    </TimePickerContext.Provider>
  );
};

export const useTimePicker = () => useContext(TimePickerContext);
