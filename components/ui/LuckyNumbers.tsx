// components/ui/LuckyNumbers.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function LuckyNumbers({ numbers }) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Today's Lucky Numbers</Text>
      <View style={styles.numbers}>
        {numbers.map(num=>(
          <View key={num} style={styles.ball}>
            <Text style={styles.numText}>{num}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  box:{ margin:14 },
  title:{ fontWeight:'bold', fontSize:15 },
  numbers:{ flexDirection:'row', marginTop:8 },
  ball:{ backgroundColor:'#EAFAF3', borderRadius:30, marginHorizontal:4, padding:10 },
  numText:{ fontWeight:'bold', color:'#2559E7', fontSize:16 }
});
