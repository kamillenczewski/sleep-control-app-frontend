import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS, withSpring } from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PANEL_WIDTH = SCREEN_WIDTH * 0.7;
const DRAG_HANDLE_WIDTH = 30;
const panelBackground = '#87776dff'


export default function Panel({ navigation, mainView }) {
	const title="What you want to do?";

  const panelItemsData = [
    { name: 'Dashboard', onPress: () => navigation.navigate('UserDashboard'), icon: <Entypo name="home" size={24} color="black" />},
    { name: 'Stats of others', onPress: () => navigation.navigate('DashboardWithCharts'), icon: <Ionicons name="stats-chart" size={24} color="black" /> },
    { name: 'Exit', onPress: () => navigation.navigate('MainMenu'), icon: <MaterialIcons name="exit-to-app" size={24} color="black" /> },
  ]; 

  const translateX = useSharedValue(-PANEL_WIDTH);
  const startPanelX = useSharedValue(-PANEL_WIDTH);

  const openPanel = () => {
    translateX.value = withSpring(0, { damping: 20, stiffness: 100 });
  };

  const closePanel = () => {
    translateX.value = withSpring(-PANEL_WIDTH, { damping: 20, stiffness: 100 });
  };

  const panOpenGesture = Gesture.Pan()
    .onStart((event) => {
      // Capture the current panel position when the drag starts
      startPanelX.value = translateX.value;
    })
    .onUpdate((event) => {
      // Only allow dragging right to open if the panel is mostly closed
      // and the drag is primarily to the right.
      if (translateX.value <= 0 && event.translationX > 0) {
        const newTranslateX = startPanelX.value + event.translationX;
        translateX.value = Math.min(0, Math.max(-PANEL_WIDTH, newTranslateX));
      }
    })
    .onEnd((event) => {
      // If the panel is dragged more than halfway open or swiped quickly to the right, snap it open.
      if (translateX.value > -PANEL_WIDTH / 2 || event.velocityX > 500) {
        runOnJS(openPanel)();
      } else {
        // Otherwise, snap it closed.
        runOnJS(closePanel)();
      }
    });


  const panCloseGesture = Gesture.Pan()
    .onStart(() => {
      startPanelX.value = translateX.value;
    })
    .onUpdate((event) => {
      const newTranslateX = startPanelX.value + event.translationX;

      // Allow dragging from open to close
      translateX.value = Math.max(-PANEL_WIDTH, Math.min(0, newTranslateX));
    })
    .onEnd((event) => {
      const draggedFarEnough = translateX.value < -PANEL_WIDTH / 2;
      const swipedFastLeft = event.velocityX < -500;

      if (draggedFarEnough || swipedFastLeft) {
        runOnJS(closePanel)();
      } 
      else {
        runOnJS(openPanel)();
      }
    });

  const panelAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>

        {mainView}

        <GestureDetector gesture={panOpenGesture}>
          <Animated.View style={styles.dragHandle} />
        </GestureDetector>
  
        <GestureDetector gesture={panCloseGesture}>
          <Animated.View style={[styles.panel, panelAnimatedStyle]}>

            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>{title}</Text>
            </View>

            <View style={styles.panelContent}>
              <ScrollView
                style={{ flex: 1 }}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                {panelItemsData.map((item, index) => ( 
                  <View key={index} style={{ flexDirection: 'row', borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 1, borderBottomWidth: index === panelItemsData.length - 1 ? 1 : 0 }} > 
                    <View key={`icon_${index}`} style={{ justifyContent: 'center', padding: 4 }}>
                      {item.icon}
                    </View>
                    <TouchableOpacity 
                      key={index} 
                      onPress={() => [item.onPress && item.onPress()]}
                    >
                      <Text style={styles.panelItem}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

          </Animated.View>
        </GestureDetector> 

      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: PANEL_WIDTH,
    backgroundColor: panelBackground,
    borderRightWidth: 1,
    borderRightColor: '#000000e2',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    paddingTop: 50,
  },

  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#a89c65ff',
    backgroundColor: panelBackground,
  },

  panelTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },

  panelContent: {
    flex: 1,
    padding: 20,
  },

  panelItem: {
    fontSize: 16,
    paddingVertical: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
    // color: '#555',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    fontFamily: 'monospace',
    textAlign: 'center',
    verticalAlign: 'center'
    // backgroundColor: 'white'
  },

  dragHandle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAG_HANDLE_WIDTH,
    zIndex: 3,
  },
});
