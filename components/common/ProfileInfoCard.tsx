// components/common/ProfileInfoCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function ProfileInfoCard({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card:{ backgroundColor:'#EAF6FF', borderRadius:12, padding:14, margin:5 },
  label:{ fontWeight:'bold', fontSize:16 },
  value:{ fontSize:15 }
});
