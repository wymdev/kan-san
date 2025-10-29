// components/ads/BannerAd.tsx
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BannerCard from './BannerCard';

const bannerData = [
  {
    type: 'hot',
    title: 'Win Big This Week!',
    desc: 'Jackpot Prize ฿6,000,000',
    image: require('../../assets/images/piggy.jpg'),
    tag: 'HOT',
  },
  {
    type: 'bonus',
    title: 'Special Bonus Offer',
    desc: 'Get 10% Extra Credit',
    image: require('../../assets/images/discount.jpg'),
    tag: 'NEW',
  },
  {
    type: 'trend',
    title: 'Most Winning Combinations',
    desc: 'These combos have hit most draws.',
    image: require('../../assets/images/lucky.jpg'),
    tag: 'TOP',
  },
  {
    type: 'gift',
    title: 'Lucky Gift for You',
    desc: 'Surprise gifts for active buyers.',
    image: require('../../assets/images/lucky.jpg'),
    tag: 'GIFT',
  },
];

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index);
  });

  return (
    <View>
      <FlatList
        data={bannerData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, idx) => item.title+idx}
        renderItem={({ item }) => (
          <BannerCard {...item} />
        )}
        snapToAlignment="start"
        pagingEnabled
        decelerationRate="fast"
        style={{ minHeight: 160, marginBottom: 3 }}
        contentContainerStyle={{ paddingLeft: 6, paddingRight: 16 }}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.dotsRow}>
        {bannerData.map((_, i) => (
          <View 
            key={i}
            style={[
              styles.dot,
              activeIndex === i ? styles.dotActive : null
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dotsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  dot: {
    width: 16,    // dash width
    height: 5,    // dash height
    borderRadius: 3,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    opacity: 0.38,
  },
  dotActive: {
    width: 28,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D13DFA', // purple accent
    opacity: 1,
    // Optional slight shadow
    shadowColor: '#D13DFA',
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
});
