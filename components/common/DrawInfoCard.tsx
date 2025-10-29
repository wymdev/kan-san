// components/DrawInfoCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function DrawInfoCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Draw Date</Text>
      <Text style={styles.dateBadge}>Nov 1, 2025</Text>
      <Text style={styles.sub}>Results will be announced on November 1, 2025</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginTop: 20, alignItems: 'center', elevation:1 },
  title: { fontSize: 16, fontWeight: 'bold', color: Colors.primary },
  dateBadge: { backgroundColor: Colors.bg, color: Colors.primary, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 8, fontWeight: 'bold', fontSize: 14, marginVertical:6 },
  sub: { color: Colors.muted, marginTop: 3, fontSize: 13 }
});
