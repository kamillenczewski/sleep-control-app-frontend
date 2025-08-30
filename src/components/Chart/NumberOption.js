import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";

const fillChar = '0';
const inputFontSize = 22;

export function createNumberOption(maxLength) {
  return ({ name, value, onChange }) => NumberOption(name, value, onChange, maxLength);
}


function NumberOption(name, value, onChange, maxLength) {
  function removeFillChars(text) {
    let indexWithoutZero = text.length;
      
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== fillChar) {
        indexWithoutZero = i;
        break;
      }
    }

    return text.slice(indexWithoutZero);
  }

  function putFillChars(text) {
    return text.padStart(maxLength, fillChar);
  }

  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    setCurrentValue(putFillChars(value ?? ''));
  }, [value]);

  const updateValue = () => {
    if (!currentValue) return;
    onChange(removeFillChars(currentValue));
  };

  const onChangeCurrentText = (newText) => {
    let cleanText = removeFillChars(newText);

    if (cleanText.length > maxLength) {
      cleanText = cleanText.slice(0, maxLength);
    }

    cleanText = putFillChars(cleanText);

    setCurrentValue(cleanText);
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


      <TextInput
        style={{ maxWidth: 0.6*inputFontSize*maxLength + 10, backgroundColor: '#6c6c6c89', fontSize: inputFontSize, borderRadius: 5, alignSelf: 'center', fontFamily: 'monospace', padding: 6, borderWidth: 1, borderColor: '#000000ff', outlineStyle: 'none', outlineColor: 'transparent' }}
        value={String(currentValue)}
        onChangeText={onChangeCurrentText}
        onSubmitEditing={updateValue}
        onBlur={updateValue}
      />
      
    </View>
  );
}

// export default function NumberOption({ name, value, onChange, other }) {
//   const maxLength = useMemo(() => {
//     if (!other || !other.maxLength) return defaultMaxLength;
//     return other.maxLength;
//   }, [other])

//   function removeFillChars(text) {
//     let indexWithoutZero = text.length;
      
//     for (let i = 0; i < text.length; i++) {
//       if (text[i] !== fillChar) {
//         indexWithoutZero = i;
//         break;
//       }
//     }

//     return text.slice(indexWithoutZero);
//   }

//   function putFillChars(text) {
//     return text.padStart(maxLength, fillChar);
//   }

//   const [currentValue, setCurrentValue] = useState('');

//   useEffect(() => {
//     setCurrentValue(putFillChars(value ?? ''));
//   }, [value]);

//   const updateValue = () => {
//     if (!currentValue) return;
//     onChange(removeFillChars(currentValue));
//   };

//   const onChangeCurrentText = (newText) => {
//     let cleanText = removeFillChars(newText);

//     if (cleanText.length > maxLength) {
//       cleanText = cleanText.slice(0, maxLength);
//     }

//     cleanText = putFillChars(cleanText);

//     setCurrentValue(cleanText);
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         borderRadius: 8,
//         borderWidth: 1,
//         flexDirection: 'row',
//         padding: 20,
//         justifyContent: 'space-between',
//         gap: 7,
//       }}
//     >
//       <Text style={{ fontSize: 20, fontFamily: 'monospace', alignSelf: 'center', justifyContent: 'center' }}>{name}</Text>


//       <TextInput
//         style={{ maxWidth: 0.6*inputFontSize*maxLength + 10, backgroundColor: '#6c6c6c89', fontSize: inputFontSize, borderRadius: 5, alignSelf: 'center', fontFamily: 'monospace', padding: 6, borderWidth: 1, borderColor: '#000000ff', outlineStyle: 'none', outlineColor: 'transparent' }}
//         value={String(currentValue)}
//         onChangeText={onChangeCurrentText}
//         onSubmitEditing={updateValue}
//         onBlur={updateValue}
//       />
      
//     </View>
//   );
// }