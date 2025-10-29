import Ionicons from '@expo/vector-icons/Ionicons';
import { Barcode } from 'expo-barcode-generator';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

// Helper: to spell out digits for number text
const spellDigits = (nums) =>
  nums.map((n) => ({
    digit: n,
    word:
      n === "0" ? "zero"
      : n === "1" ? "one"
      : n === "2" ? "two"
      : n === "3" ? "three"
      : n === "4" ? "four"
      : n === "5" ? "five"
      : n === "6" ? "six"
      : n === "7" ? "seven"
      : n === "8" ? "eight"
      : n === "9" ? "nine"
      : n
  }));

export default function TicketCard({
  numbers = ["9", "9", "9", "9", "9", "9"],
  price = 100,
  ticketName = "THAI GOVERNMENT LOTTERY",
  signature = "Ken San",
  date = "1 FEBRUARY 2022",
  barCode = "9040001355040000007",
  period = 9,
  bigNum = 123214,
  setNo = 99,
  leftIcon = require('../../assets/images/piggy.jpg')
}) {
  const convertedNumbers = spellDigits(numbers);
  
  return (
    <View style={styles.cardWrap}>
      {/* ROW 1: Thai Lottery Government + Numbers */}
      <View style={styles.row1}>
        <View style={styles.govRow}>
          <Ionicons name="ribbon-outline" size={16} color="#00B4D8" />
          <Text style={styles.govText}>{ticketName}</Text>
        </View>
        <View style={styles.mainNums}>
          {convertedNumbers.map(({ digit, word }, idx) => (
            <View style={styles.numberBox} key={idx}>
              <Text style={styles.numberDigit}>{digit}</Text>
              <Text style={styles.numberWord}>{word}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ROW 2: Left Icon + Date/BigNum/Period/SetNo Group */}
      <View style={styles.row2}>
        <View style={styles.leftIconSection}>
          <Image source={leftIcon} style={styles.iconImg} />
        </View>

        <View style={styles.rightInfoSection}>
          <Text style={styles.drawDate}>{date}</Text>
          <Text style={styles.bigNum}>{bigNum}</Text>
          <View style={styles.tagsRow}>
            <View style={styles.periodTag}>
              <Text style={styles.tagsLabel}>Period</Text>
              <Text style={styles.tagsVal}>{period}</Text>
            </View>
            <View style={styles.setTag}>
              <Text style={styles.tagsLabel}>Set No.</Text>
              <Text style={styles.tagsVal}>{setNo}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ROW 3: Amount/Signature + Barcode */}
      <View style={styles.row3}>
        <View style={styles.leftBottomSection}>
          <View style={styles.priceSection}>
            <Text style={styles.priceBaht}>{price}</Text>
            <Text style={styles.bahtLabel}>BAHT</Text>
          </View>
        </View>
        <View style={styles.signatureBox}>
            <Text style={styles.signatureName}>{signature}</Text>
            <Text style={styles.signatureLabel}>authorized</Text>
        </View>

        <View style={styles.barcodeSection}>
          <Barcode
            value={barCode}
            options={{
              format: 'CODE128',
              width: 1.2,
              height: 30,
              displayValue: true,
              fontSize: 10,
              textMargin: 2,
              background: '#FFFFFF',
              lineColor: '#030f2aff',
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    width: width - 36,
    borderRadius: 8,
    backgroundColor: '#FEFEFE',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  
  // ROW 1 Styles
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  govRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  govText: {
    fontSize: 6,
    fontWeight: "700",
    color: "#1565C0",
    letterSpacing: 0.3,
  },
   mainNums: {
    flexDirection: "row",
    alignItems: 'flex-end',
    gap: 20,
    backgroundColor: 'rgba(249, 236, 121, 0.15)',
    borderRadius: 6,
  },
  numberBox: {
    alignItems: 'center',
    gap: 2,
  },
  numberDigit: {
    fontSize: 20,
    fontWeight: "900",
    color: "#212121",
  },
  numberWord: {
    fontSize: 9,
    color: "#757575",
    fontWeight: "600",
  },

  // ROW 2 Styles
  row2: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 12,
  },
  leftIconSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    resizeMode: 'cover',
    opacity:0.7,
  },
  rightInfoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingLeft:20,
  },
  drawDate: {
    color: "#1976D2",
    fontWeight: "800",
    fontSize: 12,
    textAlign: 'center',
  },
  bigNum: {
    color: "#FFA726",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 2,
    textAlign: 'center',
  },
  tagsRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  periodTag: {
    backgroundColor: "#FCE4EC",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: "center",
  },
  setTag: {
    backgroundColor: "#F8BBD0",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: "center",
  },
  tagsLabel: {
    color: "#880E4F",
    fontWeight: "700",
    fontSize: 9,
  },
  tagsVal: {
    color: "#212121",
    fontWeight: "900",
    fontSize: 11,
  },

  // ROW 3 Styles
  row3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    gap: 18,
  },
  leftBottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceSection: {
    alignItems: 'center',
    justifyContent:'center'
  },
  priceBaht: {
    color: "#E91E63",
    fontWeight: "bold",
    fontSize: 20,
  },
  bahtLabel: {
    color: "#E91E63",
    fontWeight: "200",
    alignSelf:'center',
    fontSize: 9,
  },
  signatureBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 1,
  },
  signatureName: {
    color: "#085594ff",
    fontWeight: "bold",
    fontSize: 10,
  },
  signatureLabel: {
    color: "#9E9E9E",
    fontSize: 9,
    fontWeight: "bold",
  },

  // Barcode Section
  barcodeSection: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});