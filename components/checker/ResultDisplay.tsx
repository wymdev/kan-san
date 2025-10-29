// components/checker/ResultDisplay.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function ResultDisplay({ result }) {
  if (!result) return null;
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{result}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  box:{ marginTop:20, backgroundColor:'#EFF4FA', padding:18, borderRadius:12, alignItems:'center' },
  text:{ fontWeight:'bold', fontSize:20 }
});
