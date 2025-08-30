import { View, TouchableOpacity } from "react-native";

export default function CheckBox({ radius=10, color='#538a42ff', value, setValue }) {
  return (
    <TouchableOpacity onPress={() => setValue(!value)}>
      <View style={{ borderWidth: 2, borderRadius: radius, height: 2*radius, width: 2*radius, borderColor: color, alignContent: 'center' }}/>
      {value && (
        <View style={{ top: radius - 5, position: 'absolute',  borderRadius: radius - 5, height: 2*radius - 10, width: 2*radius - 10, backgroundColor: color, justifyContent: 'center', alignSelf: 'center'}}/>
      )}
    </TouchableOpacity>
  );
}