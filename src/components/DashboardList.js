import { View, FlatList, StyleSheet, Platform, StatusBar } from 'react-native';

export default function DashboardList({ components }) {
  const indexes = Array.from({ length: components.length }, (_, index) => index);

  return (
    <FlatList
      data={indexes}
      keyExtractor={index => `outer-${index}`}
      nestedScrollEnabled={true} 
      renderItem={({ index }) => (
        <View style={styles.outerItem}>
          {components[index]}
        </View>
      )}
      contentContainerStyle={styles.container}
			style={styles.container}
      keyboardShouldPersistTaps="always"
      scrollEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#87776dff',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 4
	},

  outerItem: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  innerScroll: {
    height: 150, // needed for ScrollView to scroll
  },
  innerItem: {
    backgroundColor: '#ccc',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
});