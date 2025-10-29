// components/ui/PromoCard.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PromoCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons name="flame" size={26} color="#FF5733" />
        <Text style={styles.title}>Win Big This Week!</Text>
      </View>
      <Text style={styles.prize}>Jackpot Prize ฿6,000,000</Text>
      <Text style={styles.bonus}>🎉 Special Bonus Offer: Get 10% Extra Credit</Text>
      <Text style={styles.discount}>🛒 Buy 5 get 1 Free | Draw Soon: Nov 1, 2025</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor:'#FFF4EB', borderRadius:12, padding:16, margin:2 },
  row:{ flexDirection:'row', alignItems:'center' },
  title:{ fontSize:18, fontWeight:'bold', marginLeft:8, color:'#FF5733' },
  prize:{ fontSize:14, color:'#222', marginVertical:4 },
  bonus:{ fontSize:14, color:'#1A6DFF', marginVertical:2 },
  discount:{ fontSize:13, color:'#2074d4' }
});
