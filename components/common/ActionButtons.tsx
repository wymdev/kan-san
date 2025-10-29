import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

const actions = [
  {
    icon: 'gift-outline',
    title: 'Bonus',
    subtitle: 'First purchase bonus',
    color: '#E1007C',
    bg: '#FBF6F9',
  },
  {
    icon: 'flash-outline',
    title: 'Quick Pick',
    subtitle: 'Auto select numbers',
    color: '#F6B800',
    bg: '#FFF8E5',
  },
  {
    icon: 'checkmark-done-outline',
    title: 'Quick Check',
    subtitle: 'Scan/check your ticket',
    color: '#00AAA4',
    bg: '#F3FDFD',
  },
  {
    icon: 'pricetag-outline',
    title: 'Discount',
    subtitle: 'Buy 5 get 1 free',
    color: '#673AB7',
    bg: '#F3F2FD',
  },
  {
    icon: 'sparkles-outline',
    title: 'New Today',
    subtitle: 'Lucky Number',
    color: '#E1007C',
    bg: '#FDEFFC',
  },
];

export default function ActionButtons() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollRow}
    >
      {actions.map((action, idx) => (
        <TouchableOpacity key={idx} style={[styles.card, { backgroundColor: action.bg }]}>
          <Ionicons name={action.icon} size={28} color={action.color} style={{marginRight:10}} />
          <View style={{ flex:1 }}>
            <Text style={[styles.title, { color: action.color }]} numberOfLines={1}>{action.title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{action.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollRow: { paddingVertical: 2, paddingHorizontal: 1 , marginTop:15 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 185,
    height: 62,
    marginHorizontal: 8,
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 18,
    elevation: 1,
    shadowColor: '#ccc',
    shadowOpacity: 0.07,
    shadowRadius: 9,
    borderWidth: 1,
    borderColor: '#eee',
  },
  title: { fontSize: 15, fontWeight: 'bold', marginBottom: 2, letterSpacing: 0.2 },
  subtitle: { fontSize: 13 , color: Colors.muted, marginBottom: 2 },
});
