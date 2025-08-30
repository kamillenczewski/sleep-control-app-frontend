import { useRef } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

function range(start, end=null) {
  if (!end) {
    end = start;
    start = 0;
  }

  return (new Array(end - start)).fill(undefined).map((_, index) => index + start);
}

const fontSize = 18;
const fontFamiliy = 'monospace';
const fontColor = '#756b6bff';
const separator = '|';
const placeholderColor = '#756b6bff';


export default function InputMask({ 
  placeholders, 
  values, 
  updateMethods, 
  onLastInputCompleted,
}) {
  const inputRefs = useRef([]);

  const maxLengths = placeholders.map(placeholder => placeholder.length);

  const minSize = Math.min(placeholders.length, updateMethods.length);
  

  return (
    <View style={styles.mainView}>
      {range(minSize).map(index => {
        const maxLength = maxLengths[index];
        const width = maxLength.toString() + 'ch';
        const updateMethod = updateMethods[index];
        const value = values[index];

        const onChange = (text) => {
          if (text.length === maxLength && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
          }

          if (onLastInputCompleted && index === minSize - 1 && text.length === maxLength) {
            onLastInputCompleted();
          }

          updateMethod(text);
        }

        const onKeyPress = (event) => {
          if ((event.key === 'Backspace' || event.nativeEvent.key === 'Backspace') && value.length === 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
          }
        }

        return (
          <View key={index} style={ { flexDirection: 'row' } }>
            <View style={{ justifyContent: 'center'}}>
            <TextInput
              value={value}
              ref={ref => inputRefs.current[index] = ref}
              placeholder={placeholders[index]}
              placeholderTextColor={placeholderColor}
              style={[styles.input, { width: width }]}
              onChangeText={onChange}
              onKeyPress={onKeyPress}
              keyboardType="number-pad"
              maxLength={maxLength}
            />
            </View>
            {index < minSize - 1 ? <Text style={styles.separator}>{separator}</Text> : <></>}
          </View>
        );
      })}
    </View>
  );
} 

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000000ff',
    height: 46,
    flexDirection: 'row', 

    backgroundColor: '#a89696ff',

    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

  },


  input: {
    fontSize: fontSize,
    fontFamily: fontFamiliy,
    // textAlign: 'left',

    caretColor: 'black',
    color: fontColor,
    backgroundColor: 'transparent',

    outlineStyle: 'none',
    outlineColor: 'transparent',
    alignSelf: 'center',
  },

  separator: {
    fontFamily: fontFamiliy,
    fontSize: fontSize + 4,
    color: placeholderColor,
    alignSelf: 'center',
  }
}); 