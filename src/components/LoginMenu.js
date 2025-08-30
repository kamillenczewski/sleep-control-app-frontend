import { useState } from 'react';
import { View,Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { validateUser } from '@/components/Backend'
import PasswordInput from '@/components/PasswordInput';
import { useUser } from '@/components/UserContext';


export default function LoginMenu({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [statement, setStatement] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginRun, setIsLoginRun] = useState(false);

  const { setName: setUserName } = useUser();


  const login = () => {
    setIsLoginRun(true);

    if (!name) {
        setStatement('Please enter your name!');
        setIsLoginRun(false);
        return;
    }

    if (!password) {
        setStatement('Please enter your password!');
        setIsLoginRun(false);
        return;
    }

    validateUser(name, password, result => {
      if (result) {
        setStatement('Successfully logged in!');
        navigation.replace('Loading', { target: 'UserDashboard'});
        setUserName(name);
      }
      else {
        setStatement('Wrong name or password!');
        setIsLoginRun(false);
      }      
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.basicInput}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
      />

      <PasswordInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
        onSubmitEditing={login}
      />

      <Text style={styles.statement}>{statement}</Text>

      <TouchableOpacity 
        style={[styles.button, isLoginRun && { opacity: 0.5 } ]}
        onPress={login} 
        disabled={isLoginRun}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },

  title: {
    fontFamily: 'monospace',
    fontWeight: 'Bold',
    color: '#000000ff',
    fontSize: 30,
    marginBottom: 32,
    textAlign: 'center',
  },

  basicInput: {
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
    borderColor: '#474443ff',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16
  },

  buttonText: {
    color: '#000000ff',
    fontSize: 16,
    fontFamily: 'monospace',
  },

  statement: {
    color:  '#3d5e7dff',
    marginBottom: 5,
    padding: 5,
    fontWeight: 'bold',
  }
})