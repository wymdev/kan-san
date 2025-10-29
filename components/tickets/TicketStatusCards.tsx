import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function TicketStatusCards({ pending = 3, won = 0 }) {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name="time-outline" size={24} color={Colors.primary} />
        </View>
        <Text style={styles.label}>Pending</Text>
        <Text style={styles.value}>{pending}</Text>
      </View>
      <View style={[styles.card, styles.cardWon]}>
        <View style={[styles.iconCircle, {backgroundColor:'#FFF8E6', borderColor:'#F6B800'}]}>
          <Ionicons name="trophy-outline" size={24} color="#F6B800" />
        </View>
        <Text style={[styles.label, { color: '#F6B800' }]}>Won</Text>
        <Text style={[styles.value, { color: '#F6B800' }]}>{won}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    gap: 13,
  },
  card: {
    flex:1,
    backgroundColor: Colors.white,
    borderRadius: 22,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 14,
    marginHorizontal: 0,
    elevation: 0,
    borderWidth: 1.4,
    borderColor: '#F4F4FC',
    shadowColor: Colors.primary,
    shadowOpacity: 0.06,
    shadowRadius: 6
  },
  cardWon: {
    backgroundColor: '#FFF8E6',
    borderColor: '#F6B800',
  },
  iconCircle: {
    width:40,
    height:40,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F4F6FC',
    marginBottom: 8,
    borderWidth:1,
    borderColor:'#ececec'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 2,
    marginTop:4,
    letterSpacing: 0.1,
    textAlign:'center'
  },
  value: {
    fontWeight: 'bold',
    fontSize: 23,
    color: Colors.primary,
    marginTop:4,
    textAlign:'center'
  },
});
