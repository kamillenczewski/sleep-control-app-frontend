import { View } from "react-native";
import { useEffect, useState } from "react";

import ColorOption from "@/components/Chart/ColorOption";
import { createNumberOption } from "@/components/Chart/NumberOption";
import BoolOption from "@/components/Chart/BoolOption";
 
import { getUserOptions, updateUserOptions } from '@/components/Backend';
import { useUser } from '@/components/UserContext';


const  typesAndComponents = {
  number2: createNumberOption(2),
  number3: createNumberOption(3),
  color: ColorOption,
  bool: BoolOption,
};


export default function OptionsList({ onChange }) {
  const [options, setOptions] = useState([]);
  const { id: userId } = useUser();

  useEffect(() => {
    if (!userId) return;
    getUserOptions(userId, setOptions)
  }, [userId]);

  useEffect(() => {
    onChange(options);
  }, [options]);

  useEffect(() => {
    if (!userId || !options || options.length === 0) return;
    updateUserOptions(userId, options);
  }, [options]);

  const setOption = (index, value) => {
    setOptions(previous => [
      ...previous.slice(0, index), 
      { ...previous[index], value: value},
      ...previous.slice(index + 1)
    ]);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
      {options.map((item, index) =>  {
        const Component = typesAndComponents[item.type];

        return (
          <Component 
            key={index} 
            name={item.name}
            value={item.value ?? item.default_value}
            other={item.other}
            onChange={newValue => setOption(index, newValue)}
          />
        );
      })}
    </View>
  );
}