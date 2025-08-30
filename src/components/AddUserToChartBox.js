import { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Ionicons } from '@expo/vector-icons';


export function SearchableList({ items, onAdd }) {
  const [search, setSearch] = useState('');

  const getFiltered = () => items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={{ gap: 7, width: 300, height: 300, backgroundColor: '#c8c6a1ff', padding: 8, borderRadius: 10 }}>
      {/* Search input */}
      <View style={{ padding: 8, flexDirection: 'row', gap: 7, borderWidth: 2, borderRadius: 8, borderColor: '#959483ff' }}>
        
        <EvilIcons name="search" size={24} color="#959483ff"/>
        
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={{ outlineStyle: 'none', outlineColor: 'transparent' }}
        />
      </View>

      {/* List */}
      <FlatList
        data={getFiltered()}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 10, backgroundColor: '#e9e7c2ff', borderRadius: 8, marginBottom: 5 }}>
            <Text style={{ textAlign: 'center', alignContent: 'center' }}>{item.name}</Text>
            <TouchableOpacity onPress={() => onAdd(item)} style={{ borderRadius: 12 }}>
              <Ionicons name="add" size={26} color="#9ed25dff" />
            </TouchableOpacity>
            
          </View>
        )}
        style={{ borderWidth: 2, borderRadius: 8, borderColor: '#959483ff', padding: 5 }}
      />
    </View>
  );
}




export default function AddUserToChartBox({ isVisible, close, setData, users }) {
  const [toAddData, setToAddData] = useState([]);

  const onAdd = (name) => {
    setToAddData(previous => previous.includes(name) ? previous : [...previous, name]);
  };

  const actualComponent = () => (
    <View>
      <SearchableList items={users} onAdd={onAdd}/>
    </View>
  );
  
  const onClose = () => {
    close();
    setToAddData([]);
    setData(toAddData);
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
        <TouchableWithoutFeedback>
          {actualComponent()}
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
