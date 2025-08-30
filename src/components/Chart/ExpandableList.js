import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";



const ExpandableList = ({ title, maxHeight = 200, children }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current; // 0 = collapsed, 1 = expanded

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    setExpanded(!expanded);

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Height interpolation
  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxHeight],
  });

  // Arrow rotation
  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View style={styles.container}>
      {/* Header row */}
      <TouchableOpacity style={styles.header} onPress={toggleExpand}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          {/* <AntDesign name="right" size={20} color="#333" /> */}
          <AntDesign name="caretright" size={18} color="#000000ff" />
        </Animated.View>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

      {/* Expandable content */}
      <Animated.View style={[styles.contentContainer, { height }]}>
        <ScrollView>
          <View style={styles.item}>
            {children}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 8,
    // borderRadius: 12,
    // backgroundColor: "#f5f5f5",
    // // overflow: "hidden",
    // elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  contentContainer: {
    overflow: "hidden",
  },
  item: {
    padding: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
  },
});

export default ExpandableList;
