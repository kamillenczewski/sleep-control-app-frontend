import { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';


const ITEM_HEIGHT = 80;
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

const renderItem = (item, selected) => {
  return (
  <View style={styles.squareWrapper}>
    <View style={[styles.square, selected === item && styles.selected]}>
      <Text style={styles.squareText}>{item.toString().padStart(2, '0')}</Text>
    </View>
  </View>
  )
};

function ScrollableSquare({ data, selectedValue, onMomentumScrollEnd }) {
  return (
    <FlatList
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


function getCurrentYear() {
  return (new Date()).getFullYear();
}

// function getCurrentMonth() {
//   return (new Date()).getMonth();
// }

// function getCurrentDay() {
//   return (new Date()).getDate();
// }

// function getYearsFromRange(year1, year2) {
//   return Array.from({ length: (year2 - year1) + 1 }, (_, i) => i + year1);
// }


const years = [getCurrentYear()];
const months = Array.from({ length: 12 }, (_, i) => i + 1);

function getDaysNumber(year, month) {
  return new Date(year, month, 0).getDate();
}

export default function DatePicker({ isVisible, close, setData }) {
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedDay, setSelectedDay] = useState(days[0]);

  useEffect(() => {
    setDays(Array.from({ length: getDaysNumber(selectedYear, selectedMonth) }, (_, i) => i + 1));
  }, [selectedMonth]);

  const onScrollEnd = (event, setMethod, data) => {
    setMethod(data[Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT)]);
  };

  const confirmButtonPress = () => {
    setData({ year: selectedYear, month: selectedMonth, day: selectedDay });
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
        <Text style={styles.label}>Select Date</Text>

        <View style={styles.scrollRow}>



          <ScrollableSquare 
            data={days}
            selectedValue={selectedDay}
            onMomentumScrollEnd={event => onScrollEnd(event, setSelectedDay, days)}
          />    

          <Text style={styles.separator}>:</Text>

          <ScrollableSquare 
            data={months}
            selectedValue={selectedMonth}
            onMomentumScrollEnd={event => onScrollEnd(event, setSelectedMonth, months)}
          />

          <Text style={styles.separator}>:</Text>

   

          <ScrollableSquare 
            data={years}
            selectedValue={selectedYear}
            onMomentumScrollEnd={event => onScrollEnd(event, setSelectedYear, years)}
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
  modalContent: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  label: {
    color: '#ffffffff',
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
  },
  squareWrapper: {
    height: ITEM_HEIGHT, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    height: ITEM_HEIGHT,
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
    padding: 10
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
