import { View, Text, TouchableOpacity } from "react-native";

import { useColorPicker } from '@/components/ColorPickerContext';
import { useEffect, useState } from "react";

const radius = 10;

export default function ColorOption ({ name, value, onChange }) {
  const { open: openColorPicker, data: colorPickerData } = useColorPicker();

  const [colorPickingActive, setColorPickingActive] = useState(false);

  const onColorPress = () => {
    openColorPicker();
    setColorPickingActive(true);
  };

  useEffect(() => {
    if (!colorPickingActive) return;
    onChange(colorPickerData);
    setColorPickingActive(false); 
  }, [colorPickerData]);

  return (
    <View
     style={{
      flex: 1,
      borderRadius: 8,
      borderWidth: 1,
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'space-between'
     }}>
      <View style={{ flexDirection: 'row', gap: 7  }}>
        <Text style={{ fontSize: 20, fontFamily: 'monospace', alignSelf: 'center', justifyContent: 'center' }}>{name}</Text>       
      </View>

      <View style={{ flexDirection: 'row', gap: 7 }}>
        <TouchableOpacity onPress={() => onColorPress()} style={{ borderRadius: radius, width: radius*2, height: radius*2, backgroundColor: value, justifyContent: 'right', alignSelf: 'right' }}>
          <View style={{ borderRadius: radius, width: radius*2, height: radius*2, backgroundColor: value, justifyContent: 'right', alignSelf: 'right' }}/>
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>{value}</Text>   
      </View>
    </View>
  );
}