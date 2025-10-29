// components/ui/QuickPick.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function randomTicket() {
  let n = '';
  for (let i=0; i<6; i++) n += Math.floor(Math.random()*10);
  return n;
}
export default function QuickPick() {
  const [pick, setPick] = useState('');
  return (
    <TouchableOpacity style={styles.btn} onPress={()=>setPick(randomTicket())}>
      <Ionicons name="sparkles" color="#FFB320" size={22} />
      <Text style={styles.label}>Quick Pick</Text>
      {pick ? <View style={styles.card}><Text style={styles.pickText}>{pick}</Text></View> : null}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn:{ flexDirection:'row', alignItems:'center', justifyContent:'flex-start', backgroundColor:'#FBF2C0', borderRadius:8, padding:12, marginHorizontal:14, marginTop:8 },
  label:{ marginLeft:8, fontWeight:'bold', color:'#E67400', fontSize:15 },
  card:{ backgroundColor:'#FFF', borderRadius:8, marginLeft:14, paddingHorizontal:16, paddingVertical:4 },
  pickText:{ fontSize:18, fontWeight:'bold', color:'#1A6DFF' }
});
