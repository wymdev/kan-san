import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function MainMenu() {
  return (
    <View style={styles.menuRow}>
      <TouchableOpacity style={styles.menuCard}>
        <LinearGradient colors={['#D15DFF','#FF57CB']} style={styles.iconCircle}>
          <Ionicons name="ticket-outline" size={36} color="#fff" />
        </LinearGradient>
        <Text style={styles.menuText}>Buy Lottery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuCard}>
        <LinearGradient colors={['#39A7FA','#15E5B5']} style={styles.iconCircle}>
          <Ionicons name="search-outline" size={36} color="#fff" />
        </LinearGradient>
        <Text style={styles.menuText}>Check Lottery</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 12,
    gap: 17,
  },
  menuCard: {
    flex:1,
    backgroundColor: Colors.white,
    borderRadius:22,
    alignItems:'center',
    paddingVertical:29,
    marginHorizontal: 0,
    elevation:0,
    borderWidth:1.5,
    borderColor:'#f4f4fc',
    shadowColor:'#E1007C',
    shadowOpacity:0.06,
    shadowRadius:6,
  },
  iconCircle: {
    width:64, height:64,
    borderRadius:22,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:12,
  },
  menuText: { 
    marginTop:3, 
    fontWeight: '600', 
    fontSize:15, 
    color: Colors.text,
    letterSpacing: 0.1,
    textAlign:'center'
  }
});
