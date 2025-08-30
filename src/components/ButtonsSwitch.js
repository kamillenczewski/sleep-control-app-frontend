import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const gap = 3;
const buttonPaddingVertical = 7;
const buttonPaddingHorizontal = 7 + 15;
const buttonHeight = 46;

function createButtonStyle(buttonColor) {
  return {
    flex: 1,
    paddingVertical: buttonPaddingVertical,
    paddingHorizontal: buttonPaddingHorizontal,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: buttonColor,
    padding: 5,
    borderWidth: 1,
  };
}

export default function ButtonsSwitch({ names, onChangeMethods, color, defaultActiveIndex, index }) {
  if (!defaultActiveIndex) {
    defaultActiveIndex = 0;
  }

  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  if (!onChangeMethods) {
    onChangeMethods = [];
  }

  if (!color) {
    color = '#807777ff'
  }

  const onPress = (index) => {
    setActiveIndex(index);

    if (index < onChangeMethods.length) {
      onChangeMethods[index]();
    }
  };

  const buttonStyle = createButtonStyle(color);

  return (
    <View key={index} style={styles.container}>
      {names.map((name, index) => (
        <TouchableOpacity
          activeOpacity={1}
          key={index}
          onPress={() => onPress(index)}
          style={[
            buttonStyle,
            activeIndex === index ? styles.active : styles.inactive
          ]}
        >
          <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: gap,
    justifyContent: 'center',
    height: buttonHeight,
  },
  active: {
    borderColor: '#000000ff'
  },
  inactive: {
    borderColor: 'transparent',
    opacity: 0.7,
  },
  text: {
    fontFamily: 'monospace',
    color: '#000000ff',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf:'center'
  }
});
