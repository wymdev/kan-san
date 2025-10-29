// components/common/Header.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HeaderGreeting({ name = 'Guest', iconAnim, animateIcon }) {
  const iconRotate = iconAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={styles.header}>
      <Text style={styles.helloTxt}>Hello, {name}</Text>
      <TouchableOpacity style={styles.iconCircle} onPress={animateIcon}>
        <Animated.View style={{ transform: [{ rotate: iconRotate }] }}>
          <Ionicons name="sparkles-outline" size={30} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  helloTxt: { color: '#fff', fontSize: 26, fontWeight: '700', letterSpacing: 0.8 },
  iconCircle: { backgroundColor: 'rgba(255,255,255,0.17)', borderRadius: 25, padding: 8, elevation: 3 },
});
