import { createContext, useContext, useState } from 'react';
import ColorPicker from '@/components/ColorPicker';

const ColorPickerContext = createContext();

export const ColorPickerProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  return (
    <ColorPickerContext.Provider value={{ isVisible, open, close, data }}>
      {children}
      <ColorPicker isVisible={isVisible} close={close} setData={setData}/>
    </ColorPickerContext.Provider>
  );
};

export const useColorPicker = () => useContext(ColorPickerContext);
