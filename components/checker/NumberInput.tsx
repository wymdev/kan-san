// components/checker/NumberInput.tsx
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
export default function NumberInput({ value, onChange }) {
  return (
    <TextInput
      style={styles.input} placeholder="Enter ticket number"
      value={value}
      onChangeText={onChange}
      maxLength={6} keyboardType="number-pad"
    />
  );
}
const styles = StyleSheet.create({
  input:{ borderWidth:1, borderRadius:10, borderColor:'#1A6DFF', fontSize:18, padding:12 }
});
