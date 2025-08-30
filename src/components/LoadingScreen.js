import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const possibleTexts = [
  // "Death is nothing to us,\nsince when we are,\ndeath is not come, and when death has come, \nwe are not.",
  "Life is a theatre and you are an actor...\nSo choose your mask as you want",
  "Loading..."
];

function randomInt(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}

function generateText() {
  return possibleTexts[randomInt(0, possibleTexts.length - 1)];
}

function createText(string) {
  const lines = string.split('\n');
  const header = lines[0];

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.headerTextLine}>
        {header}
      </Text>

      {lines.slice(1).map((line, index) => {
        return (
          <Text style={styles.endingTextLine} key={`loading_${index}`}>
            {line}
          </Text>
        )
      })}
    </View>
  );
}

export default function LoadingScreen({ route, navigation }) {
  const [activeSquare, setActiveSquare] = useState(0);
  const hasNavigated = useRef(false);

  const { target } = route.params;

  useEffect(() => {
    if (hasNavigated.current) return;

    hasNavigated.current = true;

    const timeout = setTimeout(() => {
      navigation.replace(target);
    }, 100); // 1800

    const interval = setInterval(() => {
      setActiveSquare(previous => (previous + 1) % 3);
    }, 300);


    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.loadingContainer}>
      {createText(generateText())}

      <View style={styles.squareContainer}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[
              styles.square,
              {
                backgroundColor: activeSquare === i ? '#5865F2' : '#d1d1d1',
                opacity: activeSquare === i ? 0.8 : 0.4,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#87776dff',
    // justifyContent: 'center',
    justifyContent: 'center',
    // padding: 100
    // backgroundColor: 'transparent',
  },

  squareContainer: {
    // flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#87776dff',
    // padding: 200

  },

  square: {
    width: 16 * 1.4,
    height: 16 * 1.4,
    borderRadius: 4,
    backgroundColor: 'white'
  },


  headerTextLine: {
    fontSize: 14,
    fontFamily: 'monospace',
    alignContent: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    textAlign: 'center',
    opacity: 0.4,
  },

  endingTextLine: {
    fontSize: 14,
    fontFamily: 'monospace',
    alignContent: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    textAlign: 'center',
    opacity: 0.4,
    marginBottom: 7
  },

});