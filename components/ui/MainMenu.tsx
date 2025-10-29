// components/ui/MainMenu.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MainMenu() {
  const router = useRouter();
  const menu = [
    { icon:'cash-outline', label:'Buy Lottery', route:'/buy' },
    { icon:'search-circle-outline', label:'Check Lottery', route:'/checker' },
    { icon:'ticket-outline', label:'My Tickets', route:'/orders' }
  ];
  return (
    <View style={styles.menuRow}>
      {menu.map(i=>(
        <TouchableOpacity 
          key={i.label}
          style={styles.btn}
          onPress={()=>router.push(i.route)}
        >
          <Ionicons name={i.icon} size={26} color="#1A6DFF" />
          <Text style={styles.label}>{i.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  menuRow:{ flexDirection:'row', justifyContent:'space-between', margin:16 },
  btn:{ alignItems:'center', backgroundColor:'#EFF4FA', flex:1, marginHorizontal:4, borderRadius:16, padding:14 },
  label:{ marginTop:3, fontWeight:'bold', fontSize:13, color:'#1A6DFF' }
});
