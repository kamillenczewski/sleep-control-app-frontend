import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function PasswordInput({ 
  placeholder, 
  value, 
  onChangeText, 
  isPasswordVisible, 
  setIsPasswordVisible,
  onSubmitEditing,
}) {
  return (
    <View style={styles.inputView}>    
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={!isPasswordVisible}
        onSubmitEditing={onSubmitEditing}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        maxLength={30}
      />

      <TouchableOpacity 
        activeOpacity={1}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        style={styles.eyeWrapper}
      >
        <Ionicons
          name={isPasswordVisible ? 'eye' : 'eye-off'}
          size={20}
          color={'#493a3aff'}
        />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#493a3aff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16
  },

  input: {
    flex: 1,
    height: 40,
    outlineStyle: 'none',
    outlineColor: 'transparent', 
  },

  eyeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 27,
    width: 27,
  },
})