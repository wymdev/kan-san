import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import TicketCard from '../../components/tickets/TicketCard';

const { width } = Dimensions.get('window');

const tickets = [
  { 
    id: '1', 
    numbers: ['8', '4', '2', '9', '1', '5'],
    price: 100,
    ticketName: 'THAI GOVERNMENT LOTTERY',
    signature: 'Ken San',
    date: '16 NOVEMBER 2025',
    barCode: '40139890524738567890214',
    period: 24,
    bigNum: '401398',
    setNo: 45,
    leftIcon: require('../../assets/images/piggy.jpg'),
    status: 'Approved',
    won: true
  },
  { 
    id: '2', 
    numbers: ['3', '7', '6', '0', '4', '8'],
    price: 100,
    ticketName: 'THAI GOVERNMENT LOTTERY',
    signature: 'Ken San',
    date: '1 DECEMBER 2025',
    barCode: '82604434442027463705004',
    period: 25,
    bigNum: '905247',
    setNo: 67,
    leftIcon: require('../../assets/images/piggy.jpg'),
    status: 'Approved',
    won: false
  },
  { 
    id: '3', 
    numbers: ['5', '2', '9', '3', '7', '1'],
    price: 100,
    ticketName: 'THAI GOVERNMENT LOTTERY',
    signature: 'Ken San',
    date: '16 DECEMBER 2025',
    barCode: '61425491033439920438209',
    period: 26,
    bigNum: '385641',
    setNo: 82,
    leftIcon: require('../../assets/images/piggy.jpg'),
    status: 'Approved',
    won: false
  },
  { 
    id: '4', 
    numbers: ['1', '6', '8', '4', '0', '2'],
    price: 100,
    ticketName: 'THAI GOVERNMENT LOTTERY',
    signature: 'Ken San',
    date: '1 JANUARY 2026',
    barCode: '69078305818787591630209',
    period: 1,
    bigNum: '054082',
    setNo: 93,
    leftIcon: require('../../assets/images/piggy.jpg'),
    status: 'Pending',
    won: false
  },
  { 
    id: '5', 
    numbers: ['9', '3', '5', '7', '2', '6'],
    price: 100,
    ticketName: 'THAI GOVERNMENT LOTTERY',
    signature: 'Ken San',
    date: '16 JANUARY 2026',
    barCode: '72451680073367041923815',
    period: 2,
    bigNum: '604434',
    setNo: 51,
    leftIcon: require('../../assets/images/piggy.jpg'),
    status: 'Pending',
    won: false
  },
];

export default function OrdersScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Statistics
  const totalTickets = tickets.length;
  const wonTickets = tickets.filter(t => t.won).length;
  const totalPrize = tickets
    .filter(t => t.won)
    .reduce((sum, t) => sum + (t.prize || 1000), 0);

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Pending') return ticket.status === 'Pending';
    if (activeFilter === 'Won') return ticket.won === true;
    if (activeFilter === 'Not Won') return ticket.won === false && ticket.status !== 'Pending';
    return true;
  });

  return (
    <ImageBackground
      source={require('../../assets/images/gradient-bg.jpeg')}
      style={styles.gradientBg}
      resizeMode="cover"
    >
      <BlurView intensity={18} tint="light" style={StyleSheet.absoluteFill} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.container} 
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animatable.View animation="fadeInDown" duration={600}>
            <Text style={styles.title}>My Tickets</Text>
            <Text style={styles.subtitle}>Purchase History</Text>
          </Animatable.View>

          {/* Statistics Cards */}
          <Animatable.View 
              animation="fadeInUp" 
              duration={700} 
              delay={100}
              style={styles.statsContainer}
            >
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalTickets}</Text>
              <Text style={styles.statLabel}>All</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNumber, styles.statNumberOrange]}>{wonTickets}</Text>
              <Text style={styles.statLabel}>Won</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNumber, styles.statNumberGreen]}>฿{totalPrize}</Text>
              <Text style={styles.statLabel}>Prize Amount</Text>
            </View>
          </Animatable.View>


          {/* Filter Tabs */}
          <Animatable.View 
            animation="fadeIn" 
            duration={700} 
            delay={200}
            style={styles.filterContainer}
          >
            {['All', 'Pending', 'Won', 'Not Won'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  activeFilter === filter && styles.filterTabActive
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </Animatable.View>

          {/* Tickets List */}
          <Animatable.View animation="fadeInUp" duration={700} delay={300}>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TicketCard key={ticket.id} {...ticket} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No tickets found</Text>
              </View>
            )}
          </Animatable.View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  gradientBg: { 
    flex: 1, 
    width: '100%', 
    height: '100%' 
  },
  container: { 
    padding: 18 ,
    paddingBottom: 85,
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 4,
    letterSpacing: 0.5
  },
  subtitle: { 
    fontSize: 16, 
    color: 'rgba(255, 255, 255, 0.8)', 
    marginBottom: 20,
    fontWeight: '500'
  },
  
  // Statistics Cards
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#7C4DFF',
    marginBottom: 4,
  },
  statNumberOrange: {
    color: '#FF9800',
  },
  statNumberGreen: {
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12.5,
    color: '#616161',
    fontWeight: '600',
  },

  // Filter Tabs
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 50,
    padding: 6,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#7C4DFF',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#757575',
  },
  filterTextActive: {
    color: '#212121',
    fontWeight: 'bold',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
});
