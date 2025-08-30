import { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';


const ITEM_HEIGHT = 80;
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

const renderItem = (item, selected) => (
  <View style={styles.squareWrapper}>
    <View style={[styles.square, selected === item && styles.selected]}>
      <Text style={styles.squareText}>{item.toString().padStart(2, '0')}</Text>
    </View>
  </View>
);

function ScrollableSquare({ ref, data, selectedValue, onMomentumScrollEnd }) {
  return (
    <FlatList
      ref={ref}
      data={data}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => renderItem(item, selectedValue)}
      getItemLayout={(_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      showsVerticalScrollIndicator={false}
      pagingEnabled
      snapToInterval={ITEM_HEIGHT}
      onMomentumScrollEnd={onMomentumScrollEnd}

      style={styles.scrollList}
      contentContainerStyle={styles.centerOnly}
      scrollEventThrottle={16}
    />
  );
}


function getCurrentHour() {
  return (new Date()).getHours();
}

function getCurrentMinute() {
  return (new Date()).getMinutes();
}

function getCurrentSecond() {
  return (new Date()).getSeconds();
}

export default function TimePicker({ isVisible, close, setData }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedSecond, setSelectedSecond] = useState(0);

  const onScrollEnd = (event, setMethod, data) => {
    setMethod(data[Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT)]);
  };

  const confirmButtonPress = () => {
    setData({ hour: selectedHour, minute: selectedMinute, second: selectedSecond });
    close();
  };


  return (
    <View style={{ alignSelf: "center", justifyContent: "center"}}>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => closeTimePicker()}
      >
      
      <BlurView
        intensity={70}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
     
      <View style={styles.modalContent} >
        <View style={{alignContent: 'center', justifyContent: 'center', padding: 20, borderWidth: 1, borderRadius: 20, backgroundColor: '#938282ff'}}>
        <Text style={styles.label}>Select Time</Text>

        <View style={styles.scrollRow}>
          <ScrollableSquare 
            data={hours}
            selectedValue={selectedHour}
            onMomentumScrollEnd={event => onScrollEnd(event, setSelectedHour, hours)}
          />

          <Text style={styles.separator}>:</Text>

          <ScrollableSquare 
            data={minutes}
            selectedValue={selectedMinute}
            onMomentumScrollEnd={event => onScrollEnd(event, setSelectedMinute, minutes)}
          />

          <Text style={styles.separator}>:</Text>

          <ScrollableSquare 
            data={seconds}
            selectedValue={selectedSecond}
            onMomentumScrollEnd={event => onScrollEnd(event, setSelectedSecond, seconds)}
          />

          </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmButtonPress}
            >
              <Text style={{ color: '#fff' }}>Confirm</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    opacity: 0.7,

  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  pickerContainer: {
    // width: '100%',
  },
  label: {
    color: '#ffffffff',
    // opacity: 0.9,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',

  },
  scrollList: {
    height: ITEM_HEIGHT,
    borderWidth: 1,
    borderRadius: 10
  },
  centerOnly: {
    alignItems: 'center',
      // paddingVertical: ITEM_HEIGHT,
  },
  squareWrapper: {
    height: ITEM_HEIGHT,
    width: ITEM_HEIGHT, 
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderRadius: 15,
    // borderColor: 'pink'
  },
  square: {
    height: ITEM_HEIGHT,
    width: 90,
    backgroundColor: '#436a7bff',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  selected: {
    opacity: 1
  },
  squareText: {
    fontSize: 32,
    color: '#ffffffff',
    fontWeight: 'bold',
  },
  separator: {
    color: '#ffffff',
    fontSize: 40,
    paddingHorizontal: 10,
  },
  confirmButton: {
    width: 100,
    height: 40,
    marginTop: 20,
    backgroundColor: '#6a5a5aff',
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
});
