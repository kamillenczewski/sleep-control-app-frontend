import { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';


export default function ListScroll({ data, title, onDelete }) {
  const scrollViewRef = useRef();

  // const confirmDeleteOnPhone = (index) => {
  //   Alert.alert(
  //     'Delete Item',
  //     'Are you sure you want to delete this item?',
  //     [
  //       { text: 'Cancel', style: 'cancel' },
  //       { text: 'Delete', onPress: () => onDelete(index), style: 'destructive' },
  //     ]
  //   );    
  // };

  // const confirmDeleteOnWeb = (index) => {
  //   const result = window.confirm('Are you sure you want to delete this item?');

  //   if (result) {
  //     onDelete(index);
  //   }  
  // };

  return (
    <View style={styles.mainView}>
      <View style={{ flexDirection: 'row', gap: 4,  justifyContent: 'center', alignSelf: 'center', padding: 2 }}>
        <Text style={styles.title}>{title}</Text>
        <Feather name="edit" size={18} color="black" />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
      >
      {data.map((item, index) => (
        <View key={index} style={styles.innerItem}>
          <Text style={{ flex: 1, fontSize: 'monospace', alignSelf: 'center', justifyContent: 'center', textAlign: 'center' }}>
            {item.datetime}
          </Text>
        </View>
      ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    height: 200,
    backgroundColor: '#a89696ff',
    borderRadius: 15,
    borderWidth: 1,
    paddingBottom: 6,
    paddingTop: 6
  },

  title: {
    fontWeight: '600',
    backgroundColor: 'transparent',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center'
  },

  container: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
    height: 150,
    borderRadius: 12,
  },

  innerItem: {
    backgroundColor: '#2e262654',
    padding: 10,
    marginBottom: 5,

    paddingVertical: 4,
    borderColor: '#8e8282ff',
    borderRadius: 10,
    
    fontSize: 14,
    color: '#212121ff',
    fontWeight: 'bold', 

    flexDirection: 'row',
    alignItems: 'center',
  },
});