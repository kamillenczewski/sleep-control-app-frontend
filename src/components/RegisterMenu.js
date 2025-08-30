import { useEffect, useState } from 'react';
import { View,Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { nameExists, addUser } from '@/components/Backend'
import PasswordInput from '@/components/PasswordInput';


export default function RegisterMenu({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [statement, setStatement] = useState('');
  const [isStatement, setIsStatement] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatedPasswordVisible, setIsRepeatedPasswordVisible] = useState(false);

  

  const register = () => {
    if (!name) {
        setStatement('Please enter your name!');
        return;
    }

    if (!password) {
        setStatement('Please enter your password!');
        return;
    }

    if (!repeatedPassword) {
        setStatement('Please confirm your password!');
        return;   
    }    

    if (repeatedPassword !== password) {
        setStatement('Passwords are different!');
        return;   
    }    

    if (repeatedPassword !== password) {
        setStatement('Passwords are different!');
        return;   
    }    

    nameExists(name, result => {
      if (result) {
        setStatement('Account name already exists!')
      }
      else {
        addUser(name, password);
        setStatement('YAY successfully registered!');
        navigation.replace('Loading', { target: 'UserDashboard' });
      }
    });
  };

  useEffect(() => {
    setIsStatement(statement !== '');
  }, [statement]);

  useEffect(() => {
    setIsStatement(false);
  }, [name, password]);

  const wrongPasswordTextStyle = {
    color: isStatement ? '#3d5e7dff' : "transparent",
    marginBottom: 5,
    padding: 5,
    fontWeight: 'bold'
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
      />

      <PasswordInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
      />

      <PasswordInput
        placeholder='Confirm password'
        value={repeatedPassword}
        onChangeText={setRepeatedPassword}
        isPasswordVisible={isRepeatedPasswordVisible}
        setIsPasswordVisible={setIsRepeatedPasswordVisible}
        onSubmitEditing={register}
      />

      <Text style={wrongPasswordTextStyle}>{statement}</Text>

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('MainMenu')}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#87776dff',
    borderRadius: 10
  },

  title: {
    fontFamily: 'monospace',
    fontWeight: 'Bold',
    color: '#000000ff',
    fontSize: 30,
    marginBottom: 32,
    textAlign: 'center',
  },

  input: {
    fontFamily: 'monospace',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#493a3aff',
    backgroundColor: 'transparent',
    color: '#000000ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    outlineStyle: 'none',
    outlineColor: 'transparent', 
  },

  button: {
    backgroundColor: '#3d5e7dff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },

  backButton: {
    backgroundColor: 'transparent',
    padding: 15,  
    borderRadius: 8,
    borderColor: '#474543ff',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16
  },

  buttonText: {
    color: '#000000ff',
    fontSize: 16,
    fontFamily: 'monospace',
  },
})