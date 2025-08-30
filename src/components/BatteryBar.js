import { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const START_COLOR = '#b26d6d'; 
const END_COLOR   = '#679e67';  


const hexToRgb = (hex) => {
  const num = parseInt(hex.replace('#', ''), 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

const blend = (start, end, p) => {
  const s = hexToRgb(start);
  const e = hexToRgb(end);
  const r = Math.round(s.r + (e.r - s.r) * p);
  const g = Math.round(s.g + (e.g - s.g) * p);
  const b = Math.round(s.b + (e.b - s.b) * p);
  return `rgb(${r},${g},${b})`;
};

export default function EnergyBar({ percent, setPercent }) {
  const [width, setWidth] = useState(0);
  const lastUpdateRef = useRef(0);

  const handleTouch = (e) => {
    if (!width) return;
    const x = e.nativeEvent.locationX;
    if (isNaN(x)) return;
    const clamped = Math.max(0, Math.min(x, width));
    const newPercent = clamped / width * 100;

    if (Math.abs(newPercent - percent) < 2) {
      return;
    }

    const now = Date.now();
    if (now - lastUpdateRef.current < 50) {
      return; 
    }
    lastUpdateRef.current = now;

    setPercent(newPercent);
  };

  const bg = blend(START_COLOR, END_COLOR, percent / 100);

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => true}
      onResponderGrant={handleTouch}
      onResponderMove={handleTouch}
      style={styles.barOuter}
      key='energyBar'
    >
      <View key="inner" style={[styles.barInner, { width: `${percent}%`, backgroundColor: bg }]}>
        {percent >= 29 && 
          <Text style={styles.percentText}>{percent.toFixed(0)}%</Text>
        }
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  barOuter: {
    flex: 1,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#b0a4a4ff',
    overflow: 'hidden',
    padding: 4,
  },
  barInner: { 
    height: '100%', 
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 10,
    justifyContent: 'center',
    alignContent: 'center'
  },  
  percentText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    alignContent: 'left',
    justifyContent: 'center',
    alignSelf: 'left',
    // textAlign: 'left',
    color: '#4d4949ff',
    fontSize: 20,
    // backgroundColor: 'white',
    marginLeft: 10,
  },
});
