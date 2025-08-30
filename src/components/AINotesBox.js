import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing, Platform, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function AINotesBox({ message, onDiscard, onSave }) {
  const width = 350;
  const height = 140;
  const typeSpeed = 30;

  const [loading, setLoading] = useState(true);
  const [typed, setTyped] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  const shimmer = useRef(new Animated.Value(-width)).current;
  const cursor = useRef(new Animated.Value(1)).current;
  const sweepLoopRef = useRef(null);
  const cursorAnimation = useRef(null);

  // Start sweep animation on mount
  useEffect(() => {
    shimmer.setValue(-width);

    sweepLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: width,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.delay(500),
      ])
    );

    sweepLoopRef.current.start();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      sweepLoopRef.current?.stop();
      cursorAnimation.current?.stop();
      clearTimeout(timer);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (loading) return;
    
    let i = 0;
    const interval = setInterval(() => {
      setTyped(prev => prev + message[i]);
      i++;
      if (i >= message.length) {
        clearInterval(interval);
        setTypingComplete(true);
        cursorAnimation.current?.stop();
        cursor.setValue(1);
        sweepLoopRef.current?.stop();
      }
    }, typeSpeed);

    return () => clearInterval(interval);
  }, [loading]);

  // Cursor animation
  useEffect(() => {
    if (typingComplete) return;
    
    cursorAnimation.current = Animated.loop(
      Animated.sequence([
        Animated.timing(cursor, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(cursor, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    
    cursorAnimation.current.start();
    
    return () => cursorAnimation.current?.stop();
  }, [loading, typingComplete]);

  const iconsColor = '#82b5d9ff';

	const afterTypingOptions = () => {
		return (
			<View style={{ flexDirection: 'row', gap: 4, alignItems: 'right', justifyContent: 'right' }}>
				<View style={{ borderWidth: 1, borderRadius: 8, borderColor: iconsColor, padding: 5, justifyContent: 'center', alignItems: 'center'}}>
      		<TouchableOpacity onPress={onSave ? onSave : () => {}}>
						<View>
							<MaterialIcons name="save-alt" size={17} color={iconsColor} />
						</View>
					</TouchableOpacity>
				</View>
				<View style={{ borderWidth: 1, borderRadius: 8, borderColor: iconsColor, padding: 5 , justifyContent: 'center', alignItems: 'center'  }}>
      		<TouchableOpacity onPress={onDiscard ? onDiscard : () => {}}>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
							{/* <Text style={{ color: '#72b6c3ff', fontWeight: 'bold', textAlign: 'center', alignContent: 'center' }}>Save</Text> */}
							<MaterialIcons name="delete" size={17} color={iconsColor} />
						</View>
					</TouchableOpacity>
				</View>
			</View>
    )
	};

  return (
    <View style={styles.wrapper}>
      <View style={[styles.bubble, { width, minHeight: height }]}>
        {/* Sweep overlay (rendered until typing completes) */}
        {!typingComplete && (
          <Animated.View
            style={[
              styles.sweep,
              {
                transform: [
                  { translateX: shimmer },
                  { skewX: "-20deg" },
                ],
              },
            ]}
          />
        )}
{/* style={{ borderBottomWidth: 1, borderBottomColor: '#68b7b7ff' }*/}
        <View> 
          <Text style={styles.header}>AI:Notes</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContent}>
            <DotsAnimation />
          </View>
        ) : (
          <Text style={styles.text}>
            {typed}
            {!typingComplete && (
              <Animated.Text style={[styles.cursor, { opacity: cursor }]}>
                ▌
              </Animated.Text>
            )}
          </Text>
					
        )}
				{typingComplete && afterTypingOptions()}
      </View>
    </View>
  );
}
					
// Extracted dots animation to separate component
function DotsAnimation() {
  const [dots, setDots] = useState("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "·"));
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return <Text style={styles.dots}>{dots}</Text>;
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  bubble: {
    // backgroundColor: "#444654",
		backgroundColor: "#536a71ff",
    borderRadius: 8,
    overflow: "hidden",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    gap: 3
  },
  header: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20,
		fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    color: '#68b7b7ff',
  },
  loadingContent: {
    minHeight: 24,
    justifyContent: 'center',
  },
  dots: {
    fontSize: 28,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 2,
    height: 28,
    includeFontPadding: false,
  },
  sweep: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
    color: "#b8c8c4ff",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  cursor: {
    color: "#fff",
    fontWeight: "bold",
  },
});