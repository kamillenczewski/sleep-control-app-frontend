import { View, Text, TouchableOpacity } from "react-native";

export default function ColorOption({ name, value, onChange, other }) {
  const onColorChange = () => {
    const newValue = value === 'True' ? 'False': 'True';
    console.log(newValue);
    onChange(newValue);
  };

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        gap: 7,
      }}
    >
      <Text style={{ fontSize: 20, fontFamily: 'monospace', alignSelf: 'center', justifyContent: 'center' }}>{name}</Text>
      
      <View 
        style={{ 
          backgroundColor: value == 'True' ? '#57af57' : "#af6957", 
          borderWidth: 1, 
          borderRadius: 10,
          padding: 5,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity onPress={() => onColorChange()}>
          <Text style={{ fontFamily: 'monospace', fontSize: 22, textAlign: 'center', width: 70, }}>
            {value}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}