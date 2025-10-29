// app/ticket/TicketPurchaseScreen.tsx

import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheetModal from '../../components/common/BottomSheetModal';
import TicketCard from '../../components/tickets/TicketCard';

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

export const options = { headerShown: false };

export default function TicketPurchaseScreen() {

  const getNextDrawDate = () => {
    const now = new Date();
    const futureTickets = tickets.filter(t => new Date(t.date) > now);
    if (!futureTickets.length) return null;
    // Sort by soonest date
    const sorted = futureTickets.sort((a, b) => new Date(a.date) - new Date(b.date));
    return sorted[0].date;
  };

  const nextDraw = getNextDrawDate();

  const router = useRouter();
  const [cart, setCart] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentImage, setPaymentImage] = useState<string | null>(null);

  // Handler for add to cart
  const handleAddToCart = (id: string) => {
    setCart(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  // Handler for remove from cart
  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(cid => cid !== id));
  };

  // Image picker handler
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Please allow access to your photo library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPaymentImage(result.assets[0].uri);
    }
  };

  // Handle payment submission
  const handlePayment = () => {
    if (!paymentImage) {
      Alert.alert('Payment Screenshot Required', 'Please upload your payment screenshot to proceed');
      return;
    }

    // Implement your payment logic here
    Alert.alert(
      'Payment Submitted!',
      'Your payment is being verified. You will receive confirmation shortly.',
      [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            setPaymentImage(null);
            setCart([]);
          }
        }
      ]
    );
  };

  // Tickets chosen
  const selectedTickets = tickets.filter(t => cart.includes(t.id));
  const totalAmount = selectedTickets.reduce((sum, t) => sum + t.price, 0);

  return (
    <ImageBackground source={require('../../assets/images/gradient-bg.jpeg')} style={styles.gradientBg}>
      <StatusBar barStyle="light-content" />

      {/* Enhanced Header with Gradient Overlay */}
      <View style={styles.headerBg}>
        <SafeAreaView>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerBackBtn}>
              <View style={styles.backBtnCircle}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Buy Lottery Tickets</Text>
              <Text style={styles.headerSubtitle}>{tickets.length} Available</Text>
              {!nextDraw && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                  {/* <Ionicons name="calendar" size={14} color="#8B5CF6" style={{ marginRight: 4 }} /> */}
                  <Text style={styles.headerNextDrawText}>
                    Next Draw: 1 Nov 2025
                  </Text>
                </View>
              )}
            </View>
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Ionicons name="cart" size={16} color="#fff" style={{ marginRight: 2 }} />
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>

      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Available Tickets Section */}
          <Animatable.View animation="fadeInUp" duration={600}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconWrap}>
                <Ionicons name="ticket" size={20} color="#f4f4f4ff" />
              </View>
              <Text style={styles.sectionTitle}>Available Tickets</Text>
            </View>

            {tickets.map((t, idx) => (
              <Animatable.View
                animation="fadeInUp"
                delay={idx * 100}
                key={t.id}
                style={styles.ticketCardOverlayWrap}
              >
                <TicketCard {...t} />
                {!cart.includes(t.id) ? (
                  <TouchableOpacity
                    style={styles.addToCartBtn}
                    onPress={() => handleAddToCart(t.id)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#8B5CF6', '#7C3AED']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.addToCartGradient}
                    >
                      <Ionicons name="bag-add" size={20} color="#fff" style={{ marginRight: 8 }} />
                      <Text style={styles.addToCartBtnText}>Add to Cart</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.addedBadge}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.addedBadgeText}>Added</Text>
                  </View>
                )}
              </Animatable.View>
            ))}
          </Animatable.View>

          {/* Enhanced Cart Section */}
          <Animatable.View animation="fadeInUp" duration={700} delay={200}>
            <View style={styles.cartContainer}>
              <View style={styles.cartHeader}>
                <View style={styles.cartHeaderLeft}>
                  <View style={styles.cartIconCircle}>
                    <Ionicons name="cart" size={22} color="#8B5CF6" />
                  </View>
                  <View>
                    <Text style={styles.cartTitle}>Shopping Cart</Text>
                    <Text style={styles.cartSubtitle}>
                      {selectedTickets.length} {selectedTickets.length === 1 ? 'ticket' : 'tickets'} selected
                    </Text>
                  </View>
                </View>
              </View>

              {selectedTickets.length === 0 ? (
                <View style={styles.emptyCart}>
                  <Ionicons name="basket-outline" size={56} color="#D1D5DB" />
                  <Text style={styles.emptyCartText}>Your cart is empty</Text>
                  <Text style={styles.emptyCartSubtext}>Add tickets to get started</Text>
                </View>
              ) : (
                <>
                  <View style={styles.cartItems}>
                    {selectedTickets.map((t, idx) => (
                      <Swipeable
                        key={t.id}
                        renderRightActions={() => (
                          <TouchableOpacity
                            onPress={() => handleRemoveFromCart(t.id)}
                            activeOpacity={0.8}
                            style={styles.cartSwipeRemoveWrap}
                          >
                            <Ionicons name="trash-bin" size={22} color="#fff" />
                            <Text style={styles.cartSwipeRemoveText}>Delete</Text>
                          </TouchableOpacity>
                        )}
                      >
                        <Animatable.View
                          animation="fadeInRight"
                          delay={idx * 80}
                          style={styles.cartTicketRow}
                        >
                          <View style={styles.ticketIconCircle}>
                            <Ionicons name="ticket" size={18} color="#8B5CF6" />
                          </View>
                          <View style={styles.cartTicketInfo}>
                            <Text style={styles.cartTicketNum}>{t.numbers.join(' ')}</Text>
                            <Text style={styles.cartTicketDate}>{t.date}</Text>
                          </View>
                          <View style={styles.cartTicketRight}>
                            <Text style={styles.cartTicketPrice}>฿{t.price}</Text>
                            <TouchableOpacity
                              onPress={() => handleRemoveFromCart(t.id)}
                              style={styles.cartRemoveBtn}
                              activeOpacity={0.7}
                            >
                              <Ionicons name="close-circle" size={24} color="#EF4444" />
                            </TouchableOpacity>
                          </View>
                        </Animatable.View>
                      </Swipeable>
                    ))}
                  </View>

                  <View style={styles.cartDivider} />

                  <View style={styles.cartSummary}>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Subtotal</Text>
                      <Text style={styles.summaryValue}>฿{totalAmount}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Service Fee</Text>
                      <Text style={styles.summaryValue}>฿0</Text>
                    </View>
                    <View style={styles.cartTotalRow}>
                      <Text style={styles.cartTotalText}>Total Amount</Text>
                      <Text style={styles.cartTotalValue}>฿{totalAmount}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.cartPurchaseBtn}
                    disabled={selectedTickets.length === 0}
                    onPress={() => setModalVisible(true)}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={['#8B5CF6', '#7C3AED']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.purchaseBtnGradient}
                    >
                      <Ionicons name="card" size={22} color="#fff" style={{ marginRight: 10 }} />
                      <Text style={styles.cartPurchaseText}>Proceed to Payment</Text>
                      <Ionicons name="arrow-forward" size={22} color="#fff" style={{ marginLeft: 10 }} />
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </Animatable.View>

          {/* Enhanced Purchase Modal */}
          <BottomSheetModal
            visible={modalVisible}
            onClose={() => {
              setModalVisible(false);
              setPaymentImage(null);
            }}
            title="Payment Confirmation"
            buttonLabel="Confirm Payment"
            buttonOnPress={handlePayment}
            type="success"
            secondaryButtonLabel="Cancel"
            secondaryButtonOnPress={() => {
              setModalVisible(false);
              setPaymentImage(null);
            }}
          >
            <View style={styles.modalContent}>
              {/* Selected Tickets */}
              <View style={styles.modalTicketsContainer}>
                <View style={styles.modalSectionHeader}>
                  <Ionicons name="ticket" size={18} color="#8B5CF6" style={{ marginRight: 8 }} />
                  <Text style={styles.modalSectionLabel}>Selected Tickets ({selectedTickets.length})</Text>
                </View>
                {selectedTickets.map((t, idx) => (
                  <View key={t.id} style={styles.modalTicketCard}>
                    <View style={styles.modalTicketLeft}>
                      <View style={styles.modalTicketIconWrap}>
                        <Ionicons name="ticket" size={20} color="#8B5CF6" />
                      </View>
                      <View style={styles.modalTicketDetails}>
                        <Text style={styles.modalTicketNumber}>{t.numbers.join(' ')}</Text>
                        <Text style={styles.modalTicketDate}>{t.date}</Text>
                        <Text style={styles.modalTicketPeriod}>Period {t.period}</Text>
                      </View>
                    </View>
                    <View style={styles.modalTicketPriceWrap}>
                      <Text style={styles.modalTicketPrice}>฿{t.price}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Total Amount Section */}
              <View style={styles.modalTotalSection}>
                <View style={styles.modalTotalRow}>
                  <Text style={styles.modalTotalLabel}>Subtotal</Text>
                  <Text style={styles.modalTotalAmount}>฿{totalAmount}</Text>
                </View>
                <View style={styles.modalTotalRow}>
                  <Text style={styles.modalTotalLabel}>Service Fee</Text>
                  <Text style={styles.modalTotalAmount}>฿0</Text>
                </View>
                <View style={styles.modalDivider} />
                <View style={styles.modalFinalTotal}>
                  <Text style={styles.modalFinalTotalLabel}>Total Payment</Text>
                  <Text style={styles.modalFinalTotalValue}>฿{totalAmount}</Text>
                </View>
              </View>

              {/* Payment Screenshot Upload */}
              <View style={styles.modalPaymentSection}>
                <View style={styles.modalPaymentHeader}>
                  <Ionicons name="image" size={18} color="#8B5CF6" style={{ marginRight: 8 }} />
                  <Text style={styles.modalSectionLabel}>Payment Screenshot</Text>
                  <View style={styles.requiredBadge}>
                    <Text style={styles.requiredBadgeText}>Required</Text>
                  </View>
                </View>

                <Text style={styles.modalPaymentInstructions}>
                  Upload a screenshot of your payment confirmation to complete the purchase.
                </Text>

                {paymentImage ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: paymentImage }} style={styles.imagePreview} />
                    <TouchableOpacity
                      style={styles.removeImageBtn}
                      onPress={() => setPaymentImage(null)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="close-circle" size={32} color="#EF4444" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.changeImageBtn}
                      onPress={pickImage}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="swap-horizontal" size={18} color="#8B5CF6" />
                      <Text style={styles.changeImageText}>Change Image</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickImage}
                    activeOpacity={0.8}
                  >
                    <View style={styles.uploadIconCircle}>
                      <Ionicons name="cloud-upload" size={32} color="#8B5CF6" />
                    </View>
                    <Text style={styles.uploadButtonText}>Tap to Upload Screenshot</Text>
                    <Text style={styles.uploadButtonSubtext}>JPG, PNG (Max 10MB)</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Payment Note */}
              <View style={styles.modalNote}>
                <Ionicons name="information-circle" size={20} color="#3B82F6" />
                <Text style={styles.modalNoteText}>
                  Your order will be processed after payment verification. This usually takes 5-10 minutes.
                </Text>
              </View>
            </View>
          </BottomSheetModal>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  // Header Styles
  headerBg: {
    width: '100%',
    paddingBottom: 16,
    // backgroundColor: 'rgba(0,0,0,0.25)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  headerBackBtn: {
    marginRight: 12,
  },
  backBtnCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  headerNextDrawText: {
    fontSize: 12,
    color: '#ffffffff',
    fontWeight: '600',
  },
  cartBadge: {
    flexDirection: 'row',
    backgroundColor: '#EF4444',
    borderRadius: 12,
    minWidth: 28,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  // Container
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 80,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffffff',
    letterSpacing: 0.2,
  },

  // Ticket Card
  ticketCardOverlayWrap: {
    marginBottom: 20,
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  addToCartBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  addToCartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  addToCartBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  addedBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#D1FAE5',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#6EE7B7',
  },
  addedBadgeText: {
    color: '#059669',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },

  // Cart Container
  cartContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cartHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  cartSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },

  // Empty Cart
  emptyCart: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 6,
  },

  // Cart Items
  cartItems: {
    marginBottom: 16,
  },
  cartTicketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  ticketIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cartTicketInfo: {
    flex: 1,
  },
  cartTicketNum: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  cartTicketDate: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9CA3AF',
    letterSpacing: 0.3,
  },
  cartTicketRight: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  cartTicketPrice: {
    fontWeight: '800',
    fontSize: 17,
    color: '#8B5CF6',
    marginRight: 12,
  },
  cartRemoveBtn: {
    padding: 4,
  },

  // Swipe to Delete
  cartSwipeRemoveWrap: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 8,
  },
  cartSwipeRemoveText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  // Cart Summary
  cartDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  cartSummary: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  cartTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cartTotalText: {
    fontSize: 17,
    color: '#1F2937',
    fontWeight: '700',
  },
  cartTotalValue: {
    fontWeight: '800',
    fontSize: 24,
    color: '#8B5CF6',
  },

  // Purchase Button
  cartPurchaseBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  purchaseBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  cartPurchaseText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
    letterSpacing: 0.5,
  },

  // Modal Styles
  modalContent: {
    paddingBottom: 16,
  },
  modalSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalSectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },

  // Ticket Cards in Modal
  modalTicketsContainer: {
    marginBottom: 20,
  },
  modalTicketCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modalTicketLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalTicketIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalTicketDetails: {
    flex: 1,
  },
  modalTicketNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 2,
    marginBottom: 4,
  },
  modalTicketDate: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 2,
  },
  modalTicketPeriod: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  modalTicketPriceWrap: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  modalTicketPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#8B5CF6',
  },

  // Total Section in Modal
  modalTotalSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modalTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTotalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  modalTotalAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  modalFinalTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalFinalTotalLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalFinalTotalValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#8B5CF6',
  },

  // Payment Screenshot Section
  modalPaymentSection: {
    marginBottom: 20,
  },
  modalPaymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requiredBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 8,
  },
  requiredBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  modalPaymentInstructions: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  uploadButtonSubtext: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF',
  },

  // Image Preview
  imagePreviewContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  imagePreview: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  removeImageBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  changeImageBtn: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  changeImageText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8B5CF6',
    marginLeft: 8,
  },

  // Modal Note
  modalNote: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  modalNoteText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#1E40AF',
    lineHeight: 18,
    marginLeft: 10,
  },
});