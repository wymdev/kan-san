// app/(tabs)/index.tsx
import TicketStatusCards from '@/components/tickets/TicketStatusCards';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Animated, ImageBackground, ScrollView, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import BannerCarousel from '../../components/ads/BannerAd';
import ActionButtons from '../../components/common/ActionButtons';
import AlertCard from '../../components/common/AlertCard';
import DrawInfoCard from '../../components/common/DrawInfoCard';
import HeaderGreeting from '../../components/common/Header';
import MainMenu from '../../components/common/MainMenu';
import TicketCard from '../../components/tickets/TicketCard';

const user = { name: 'John Smith' };
const tickets = [
  { 
    id: '1', 
    numbers: ['8', '4', '2', '9', '1', '5'],
    price: 100,
    ticketName: 'THAI GOVERNMENT LOTTERY',
    signature: 'Somchai P.',
    date: '16 NOVEMBER 2025',
    barCode: '40139890524738567890214',
    period: 24,
    bigNum: '401398',
    setNo: 45,
    leftIcon: require('../../assets/images/piggy.jpg')
  },
  { 
    id: '2', 
    numbers: ['3', '7', '6', '0', '4', '8'],
    price: 100,
    ticketName: 'THAI GOVERNMENT LOTTERY',
    signature: 'Nong Mint',
    date: '1 DECEMBER 2025',
    barCode: '82604434442027463705004',
    period: 25,
    bigNum: '905247',
    setNo: 67,
    leftIcon: require('../../assets/images/piggy.jpg')
  },
  { 
    id: '3', 
    numbers: ['5', '2', '9', '3', '7', '1'],
    price: 100,
    ticketName: 'THAI GOVERNMENT LOTTERY',
    signature: 'Lek W.',
    date: '16 DECEMBER 2025',
    barCode: '61425491033439920438209',
    period: 26,
    bigNum: '385641',
    setNo: 82,
    leftIcon: require('../../assets/images/piggy.jpg')
  },
  { 
    id: '4', 
    numbers: ['1', '6', '8', '4', '0', '2'],
    price: 100,
    ticketName: 'THAI GOVERNMENT LOTTERY',
    signature: 'Pim S.',
    date: '1 JANUARY 2026',
    barCode: '69078305818787591630209',
    period: 1,
    bigNum: '054082',
    setNo: 93,
    leftIcon: require('../../assets/images/piggy.jpg')
  },
  { 
    id: '5', 
    numbers: ['9', '3', '5', '7', '2', '6'],
    price: 100,
    ticketName: 'THAI GOVERNMENT LOTTERY',
    signature: 'Arm K.',
    date: '16 JANUARY 2026',
    barCode: '72451680073367041923815',
    period: 2,
    bigNum: '604434',
    setNo: 51,
    leftIcon: require('../../assets/images/piggy.jpg')
  },
];



export default function HomeScreen() {
  const [iconAnim] = useState(new Animated.Value(0));
  const animateIcon = () => {
    Animated.sequence([
      Animated.timing(iconAnim, { toValue: 1, duration: 650, useNativeDriver: true }),
      Animated.timing(iconAnim, { toValue: 0, duration: 650, useNativeDriver: true }),
    ]).start();
  };
  return (
    <ImageBackground
      source={require('../../assets/images/gradient-bg.jpeg')}
      style={styles.gradientBg}
      resizeMode="cover"
    >
      <BlurView intensity={18} tint="light" style={StyleSheet.absoluteFill} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Animatable.View animation="fadeInDown" duration={600}>
            <HeaderGreeting name={user?.name} iconAnim={iconAnim} animateIcon={animateIcon} />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={700} delay={100}>
            <BannerCarousel />
          </Animatable.View>
          <Animatable.View animation="fadeInRight" duration={700} delay={200}>
            <ActionButtons />
          </Animatable.View>
          <Animatable.View animation="fadeInLeft" duration={700} delay={250}>
            <AlertCard />
          </Animatable.View>
          <Animatable.View animation="fadeInRight" duration={700} delay={200}>
            <Text style={styles.ticketsHeader}>Your Tickets</Text>
            <TicketStatusCards />
          </Animatable.View>
          <Animatable.View animation="fadeIn" duration={700} delay={320}>
            <Text style={styles.ticketsHeader}>Main Menu</Text>
            <MainMenu />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={700} delay={400}>
            <Text style={styles.ticketsHeader}>My Tickets</Text>
            {tickets.map(t => 
              <TicketCard 
                key={t.id}
                numbers={t.numbers}
                price={t.price}
                ticketName={t.ticketName}
                signature={t.signature}
                date={t.date}
                barCode={t.barCode}
                period={t.period}
                bigNum={t.bigNum}
                setNo={t.setNo}
                leftIcon={t.leftIcon}
              />
            )}
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={700} delay={480}>
            <DrawInfoCard />
          </Animatable.View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  gradientBg: { flex: 1, width: '100%', height: '100%' },
  container: { padding: 18, paddingBottom: 85, },
  ticketsHeader: { fontWeight: 'bold', fontSize: 18, color: '#fff', marginTop: 18, marginBottom: 6, letterSpacing: 0.4 },
});
