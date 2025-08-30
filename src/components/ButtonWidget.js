import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';


export default function ButtonWidget({ title, onPress }) {
    return (
      <View style={styles.mainView}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // paddingHorizontal: 10
  },

  button: {
    flex: 1,
    height: 80,
    backgroundColor: '#697786ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1
  },
  buttonText: {
    fontFamily: 'monospace',
    color: '#000000ff',
    fontSize: 16,
    fontWeight: '600',
  },
});