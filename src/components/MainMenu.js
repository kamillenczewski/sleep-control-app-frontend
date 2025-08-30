import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { useUser } from '@/components/UserContext';
import { useEffect } from 'react';

export default function MainMenu({ navigation }) {
  const { resetUser } = useUser();

  useEffect(() => {
    resetUser();
  }, []);

  return (
    <View style={styles.menu}>
      <Text style={styles.mainText}>SleepO</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Loading', { target: 'Login'})}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Loading', { target: 'Register'})}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    gap: 5,
    backgroundColor: '#a9896eff',
  },

  mainText: {
    fontFamily: 'monospace',
    fontSize: 45,
    textAlign: 'center',
    marginBottom: 60
  },

  button: {
    backgroundColor: 'transparent',
    padding: 15,  
    borderRadius: 8,
    borderColor: '#754f2dff',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16
  },

  buttonText: {
    color: '#000000ff',
    fontSize: 16,
    fontFamily: 'monospace',
  },
});