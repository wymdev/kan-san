// components/AlertCard.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function AlertCard() {
  return (
    <View style={styles.card}>
      <Ionicons name="timer-outline" size={22} color={Colors.primary} />
      <View style={{marginLeft:10}}>
        <Text style={styles.title}>New Draw Will Start Soon</Text>
        <Text style={styles.desc}>2 days • Bonus: First purchase bonus</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { flexDirection: 'row',marginTop:30, alignItems: 'center', backgroundColor: Colors.white, padding: 14, borderRadius: 14, marginVertical: 12, elevation:2 },
  title: { fontWeight: 'bold', fontSize: 15 },
  desc: { color: Colors.muted, fontSize: 13 }
});
