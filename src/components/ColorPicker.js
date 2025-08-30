import { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, PanResponder, useWindowDimensions, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const thumbSize = 10;
const sliderHeight = 10;
const sliderPadding = 10;
// const colorPreviewCircleRadius = 10; 


const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');

const hsvToRgb = (h, s, v) => {
  h = ((h % 360) + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;

  let r, g, b;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const result =  {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };

  return result;
};

const hexToRgb = (hex) => {
  const num = parseInt(hex.replace('#', ''), 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};


export default function ColorPicker({ isVisible, close, setData }) {
  const { width: width } = useWindowDimensions();

  const mapSize = useMemo(() => {
    return width * 0.6;
  }, [width]); 

  const sliderWidth = useMemo(() => {
    return mapSize - 2 * sliderPadding;
  }, [mapSize]); 

  const [hueSliderPosition, setHueSliderPosition] = useState(0);

  const [xMapPosition, setXMapPosition] = useState(mapSize - thumbSize / 2);
  const [yMapPosition, setYMapPosition] = useState(thumbSize / 2);

  const [hue, setHue] = useState(0);

  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  
  const [hex, setHex] = useState('#ff0000');

  // useEffect(() => {
  //   if (!isVisible || !data) return;

  //   setHex(data);

  //   const rgb = hexToRgb(data);
    
  //   setRed(rgb.r);
  //   setGreen(rgb.g);
  //   setBlue(rgb.b);
  // }, [isVisible, data]);

  useEffect(() => {
    setHue(Math.min(Math.max(hueSliderPosition / sliderWidth, 0), 1) * 360);
  }, [hueSliderPosition]);

  useEffect(() => {
    const saturation = Math.min(Math.max(xMapPosition / mapSize, 0), 1); 
    const brightness = 1 - Math.min(Math.max(yMapPosition / mapSize, 0), 1);

    const rgb = hsvToRgb(hue, saturation, brightness);

    setRed(rgb.r);
    setGreen(rgb.g);
    setBlue(rgb.b);

    setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  }, [xMapPosition, yMapPosition, hueSliderPosition]);

  const onMapPanResponderEvent = (event) => {
    const { locationX, locationY } = event.nativeEvent;

    const newX = Math.max(0, Math.min(locationX, mapSize));
    const newY = Math.max(0, Math.min(locationY, mapSize));

    setXMapPosition(newX);
    setYMapPosition(newY);
  };

  const mapPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: onMapPanResponderEvent,
      onPanResponderMove: onMapPanResponderEvent,
    })
  ).current;

  const onHuePanResponderEvent = (event) => {
    const newX = Math.max(0, Math.min(event.nativeEvent.locationX, sliderWidth + sliderPadding));
    setHueSliderPosition(newX);
  };

  const sliderPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: onHuePanResponderEvent,
      onPanResponderMove: onHuePanResponderEvent,
    })
  ).current;

  const hueSliderColors = useMemo(() => {
    return Array(361).fill(null).map((_, index) => {
      const rgb = hsvToRgb(index, 1, 1);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    });
  }, []);

  const onClose = () => {
    close();
    setData(hex);
  };

  const actualPicker = () => {
    return (
      <View style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: '#4f4c4cff',
        borderRadius: 8, 
      }}>

      {/* Title */}

      {/* Picker map */}
      <View
          style={[styles.pickerContainer, { width: mapSize, height: mapSize }]}
          {...mapPanResponder.panHandlers}
        >
          <LinearGradient
            colors={['#fff', `hsl(${hue}, 100%, 50%)`]}
            start={[0, 0.5]}
            end={[1, 0.5]}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            start={[0, 0]}
            end={[0, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View
            style={[
              styles.thumb,
              {
                left: xMapPosition - thumbSize / 2,
                top: yMapPosition - thumbSize / 2,
                backgroundColor: 'transparent',
                borderColor: '#fff',
                borderWidth: 2,
              }
            ]}
          />
        </View>

        {/* Hue slider */}
        <View style={{ padding: sliderPadding }}>
          <View
            style={[styles.sliderContainer, { height: sliderHeight, width: sliderWidth }]}
            {...sliderPanResponder.panHandlers}
          >
            <LinearGradient
              colors={hueSliderColors}
              start={[0, 0.5]}
              end={[1, 0.5]}
              style={styles.hueSlider}
            />
            <View
              style={[
                styles.sliderThumb,
                {
                  left: (hue / 360) * sliderWidth - thumbSize / 4,
                  backgroundColor: `hsl(${hue}, 100%, 50%)`
                }
              ]}
            />

          </View>
        </View>

        {/* Other */}
        <View style={{ flexDirection: 'row', gap: 8, padding: 10, paddingTop: 0, alignSelf: 'center' }}> 
          {/* <View style={{ borderRadius: colorPreviewCircleRadius, width: colorPreviewCircleRadius * 2, height: colorPreviewCircleRadius * 2, backgroundColor: hex, alignSelf: 'center', borderWidth: 2, borderColor: 'white' }}/> */}
          
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'white', fontSize: 15, fontFamily: 'monospace', justifyContent: 'center', alignSelf: 'center' }}>
              {hex}
            </Text>

            <Text style={{ color: 'white', fontSize: 15, fontFamily: 'monospace', justifyContent: 'center', alignSelf: 'center' }}>
              {`${red.toString().padStart(3, '0')}.${green.toString().padStart(3, '0')}.${blue.toString().padStart(3, '0')}`}
            </Text>
          </View>
        </View>


        <TouchableOpacity
          style={styles.confirmButton}
          onPress={onClose}
        >
          <Text style={{ color: '#fff' }}>Confirm</Text>
        </TouchableOpacity>

      </View>
    );
  };
  
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onClose()}
    >
      <TouchableOpacity 
        style={styles.modalBackground} 
        activeOpacity={1} 
        onPressOut={() => onClose()}
      >
        <TouchableWithoutFeedback style={{backgroundColor: 'pink'}}>
          {actualPicker()}
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },


  pickerContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8
  },

  thumb: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    zIndex: 10,
    borderColor: 'yellow'
  },

  sliderContainer: {
    borderRadius: 10,
    position: 'relative',
    justifyContent: 'center',
  },

  hueSlider: { 
    ...StyleSheet.absoluteFillObject, 
    borderRadius: 10 
  },

  sliderThumb: {
    position: 'absolute',
    width: 13,
    height: 13,
    borderRadius: 6.5,
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 10,
  },

  valuesContainer: { 
    width: 10,
    backgroundColor: '#2a2a2a', 
    borderRadius: 10, 
    padding: 20, 
    marginTop: 30, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { 
      width: 0, 
      height: 2 
    }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
  }, 

  valueRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15, 
  }, 

  valueLabel: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#aaa', 
    width: '20%', 
  }, 

  valueText: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#f0f0f0', 
    width: '75%', 
    textAlign: 'right', 
  },

  confirmButton: {
    width: 80,
    height: 30,
    fontFamily: 'monospace',
    fontSize: 15,
    backgroundColor: '#6e6a6aff',
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',

    shadowColor: '#000', 
    shadowOffset: { 
      width: 0, 
      height: 2 
    }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    marginBottom: 15,
  },
});
