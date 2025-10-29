import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  buttonLabel?: string;
  buttonOnPress?: () => void;
  secondaryButtonLabel?: string;
  secondaryButtonOnPress?: () => void;
  type?: 'default' | 'success' | 'warning' | 'danger';
}

export default function BottomSheetModal({
  visible,
  onClose,
  title,
  children,
  buttonLabel,
  buttonOnPress,
  secondaryButtonLabel,
  secondaryButtonOnPress,
  type = 'default',
}: BottomSheetModalProps) {
  const backdropOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const getTypeColors = () => {
    switch (type) {
      case 'success':
        return ['#10B981', '#059669'];
      case 'warning':
        return ['#F59E0B', '#D97706'];
      case 'danger':
        return ['#EF4444', '#DC2626'];
      default:
        return ['#8B5CF6', '#7C3AED'];
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        {/* Animated Backdrop with smooth fade */}
        <Animated.View
          style={[
            styles.modalBackdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={onClose}
          >
            <BlurView intensity={15} tint="dark" style={StyleSheet.absoluteFill} />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Drag Handle Indicator */}
            <View style={styles.dragIndicatorContainer}>
              <View style={styles.dragIndicator} />
            </View>

            {/* Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderLeft}>
                <View style={[styles.modalIconCircle, { backgroundColor: `${getTypeColors()[0]}15` }]}>
                  <Ionicons 
                    name={type === 'success' ? 'checkmark-circle' : 'information-circle'} 
                    size={24} 
                    color={getTypeColors()[0]} 
                  />
                </View>
                <Text style={styles.modalTitle}>{title || 'Confirmation'}</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={28} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalDivider} />

            {/* Scrollable Content */}
            <ScrollView
              style={styles.modalScrollView}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={true}
              bounces={true}
              nestedScrollEnabled={true}
            >
              <TouchableOpacity activeOpacity={1}>
                {children}
              </TouchableOpacity>
            </ScrollView>

            {/* Footer Buttons */}
            {(buttonLabel || secondaryButtonLabel) && (
              <View style={styles.modalFooter}>
                {secondaryButtonLabel && secondaryButtonOnPress && (
                  <TouchableOpacity
                    style={styles.modalSecondaryButton}
                    onPress={secondaryButtonOnPress}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.modalSecondaryButtonText}>
                      {secondaryButtonLabel}
                    </Text>
                  </TouchableOpacity>
                )}
                {buttonLabel && buttonOnPress && (
                  <TouchableOpacity
                    style={[styles.modalButton, secondaryButtonLabel && { flex: 1 }]}
                    onPress={buttonOnPress}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={getTypeColors()}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.modalButtonGradient}
                    >
                      <Text style={styles.modalButtonText}>{buttonLabel}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    maxHeight: SCREEN_HEIGHT * 0.85,
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
    overflow: 'hidden',
  },
  dragIndicatorContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  modalScrollView: {
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
  modalScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexGrow: 1,
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
  },

  modalSecondaryButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 12, // Add this to ensure spacing between buttons
    minWidth: 120   // Ensure minimum width
  },
  modalSecondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  modalButton: {
    flex: 1,         // Add this for equal distribution
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    minWidth: 120,   // Ensure minimum width
  },
  modalButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
