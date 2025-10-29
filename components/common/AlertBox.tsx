import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const icons = {
  info: { name: 'information-circle-outline', color: '#2196F3' },
  warning: { name: 'warning-outline', color: '#FF9800' },
  success: { name: 'checkmark-circle-outline', color: '#4CAF50' },
  danger: { name: 'close-circle-outline', color: '#F44336' },
};

export default function AlertBox({ 
  type = 'info', 
  message, 
  onClose 
}) {
  const icon = icons[type] || icons.info;
  return (
    <View style={[styles.box, { borderColor: icon.color }]}>
      {/* Top-right close */}
      {onClose && (
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name={"close"} size={22} color={"#BDBDBD"} />
        </TouchableOpacity>
      )}

      {/* Icon top center */}
      <View style={[styles.circle, { backgroundColor: icon.color + "22" }]}>
        <Ionicons name={icon.name} size={48} color={icon.color} />
      </View>
      {/* Message body */}
      <Text style={[styles.text, { color: icon.color }]}>{message}</Text>

      {/* Nice round bottom button if you want (else remove this section) */}
      {onClose && (
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: icon.color + "cc" }]} onPress={onClose}>
          <Text style={styles.actionBtnText}>Close</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderRadius: 22,
    paddingHorizontal: 28,
    paddingVertical: 36,
    alignItems: 'center',
    margin: 7,
    minWidth: 260,
    position: 'relative',
    shadowColor:'#000',
    shadowOpacity:0.09,
    shadowRadius:7,
    elevation:2,
  },
  closeBtn: {
    position: 'absolute',
    top: 16, right: 16,
    padding: 5,
    zIndex: 2,
  },
  circle: {
    alignSelf: 'center',
    width: 70, height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 17,
  },
  text: { 
    fontSize: 15.5, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    lineHeight: 22,
    marginBottom: 18,
  },
  actionBtn: {
    marginTop: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 38,
    alignSelf:'center',
  },
  actionBtnText: { color: "#fff", fontWeight:'700', fontSize:16 },
});
