import { View, Text, TouchableOpacity } from "react-native";

import CheckBox from '@/components/Chart/CheckBox';

import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ColorPreview ({ userName, hexColor, onDelete, onColorPress, isActive, setIsActive }) {
  const radius = 10;

  return (
    <View
     style={{
      flex: 1,
      borderRadius: 8,
      borderWidth: 1,
      flexDirection: 'row',
      padding: 20,
      opacity: isActive ? 1 : 0.4,
      justifyContent: 'space-between'
     }}>
      <View style={{ flexDirection: 'row', gap: 7  }}>
        <CheckBox value={isActive} setValue={setIsActive}/>
        <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>{userName}</Text>       
      </View>

      <View style={{ flexDirection: 'row', gap: 7 }}>
        <TouchableOpacity onPress={() => onColorPress()} style={{ borderRadius: radius, width: radius*2, height: radius*2, backgroundColor: hexColor, justifyContent: 'right', alignSelf: 'right' }}>
          <View style={{ borderRadius: radius, width: radius*2, height: radius*2, backgroundColor: hexColor, justifyContent: 'right', alignSelf: 'right' }}/>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>{hexColor}</Text>   
      </View>

      <TouchableOpacity onPress={onDelete}>
        <FontAwesome name="trash-o" size={24} color='#945252ff' />
      </TouchableOpacity>

    </View>
  );
}