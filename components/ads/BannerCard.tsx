import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;      // Wider card
const CARD_HEIGHT = 160;            // Taller card

export default function BannerCard({ type, title, desc, image, tag }) {
  let colors = ['#FFA34F', '#FF6AAE'];
  let icon = <Ionicons name="star-outline" size={26} color="#fff" />;
  let tagLabel = "HOT";
  let tagIcon = <Ionicons name="flame" size={17} color="#fff"/>;

  if (type === "bonus") {
    colors = ["#C86DD7", "#FF6AAE"];
    icon = <Ionicons name="gift-outline" size={26} color="#fff" />;
    tagLabel = "NEW";
    tagIcon = <Ionicons name="git-network-outline" size={17} color="#fff" />;
  }
  if (type === "trend") {
    colors = ["#37e199","#39b7a8"];
    icon = <Ionicons name="trending-up-outline" size={26} color="#fff" />;
    tagLabel = "TOP";
    tagIcon = <Ionicons name="arrow-up" size={17} color="#fff" />;
  }
  if (tag) tagLabel = tag;

  return (
    <LinearGradient colors={colors} style={styles.card}>
      {/* Big faded image */}
      {image && (
        <Image source={image} style={styles.bgImg} resizeMode="cover" />
      )}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          {icon}
          <Text style={styles.title}>{title}</Text>
          <View style={styles.badgeTag}>{tagIcon}<Text style={styles.badgeTxt}>{tagLabel}</Text></View>
        </View>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 26,
    padding: 26,
    marginRight: 18,
    marginVertical: 7,
    shadowColor: '#FF57CB',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bgImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    opacity: 0.14,     // Fade the image more!
  },
  content: { flex: 1, justifyContent: 'center', zIndex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 21, marginLeft: 8 },
  badgeTag: { flexDirection:'row', alignItems:'center', backgroundColor:'rgba(0,0,0,0.10)', borderRadius:11, paddingHorizontal:13, marginLeft:17 },
  badgeTxt: { color:'#fff', fontWeight:'bold', fontSize:16, marginLeft:3 },
  desc: { color:'#fff', fontSize:16, marginTop:14, fontWeight: '500' },
});
