import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

// Built-in icon configurations
const MODAL_TYPES = {
  info: { name: 'information-circle-outline', color: '#2196F3' },
  warning: { name: 'warning-outline', color: '#FF9800' },
  success: { name: 'checkmark-circle-outline', color: '#4CAF50' },
  danger: { name: 'close-circle-outline', color: '#F44336' },
  error: { name: 'alert-circle-outline', color: '#F44336' },
};

export default function BottomSheetModal({ 
  visible, 
  onClose, 
  title,
  children,
  buttonLabel,
  buttonOnPress,
  color,
  icon,
  iconColor,
  type, // 'info' | 'warning' | 'success' | 'danger' | 'error'
  secondaryButtonLabel,
  secondaryButtonOnPress,
  secondaryButtonColor,
  swipeToClose = true,
}) {
  // Use type to get icon and color, or fall back to custom values
  const modalType = type ? MODAL_TYPES[type] : null;
  const finalIcon = icon || modalType?.name;
  const finalIconColor = iconColor || modalType?.color;
  const finalColor = color || modalType?.color || "#AB4EFF";

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={swipeToClose ? ['down'] : undefined}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={350}
      animationOutTiming={250}
      backdropTransitionInTiming={350}
      backdropTransitionOutTiming={250}
      backdropOpacity={0.5}
      style={styles.modal}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      propagateSwipe={true}
      swipeThreshold={80}
    >
      <View style={styles.sheet}>
        {/* Drag indicator bar - visual cue for swipe */}
        <View style={styles.dragHandle}>
          <View style={styles.bar} />
        </View>
        
        {/* Close button top right */}
        <TouchableOpacity 
          style={styles.closeBtn} 
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color="#9E9E9E" />
        </TouchableOpacity>

        {/* Icon (optional) */}
        {finalIcon && (
          <View style={[styles.iconContainer, { backgroundColor: finalIconColor }]}>
            <Ionicons name={finalIcon} size={32} color="#fff" />
          </View>
        )}
        
        {/* Title */}
        {title && <Text style={styles.title}>{title}</Text>}
        
        {/* Body content */}
        <View style={styles.content}>
          {children}
        </View>
        
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {secondaryButtonLabel && (
            <TouchableOpacity 
              style={[
                styles.actionBtn, 
                secondaryButtonColor ? styles.primaryBtn : styles.secondaryBtn,
                secondaryButtonColor && { backgroundColor: secondaryButtonColor },
                buttonLabel && styles.flexButton
              ]} 
              onPress={secondaryButtonOnPress}
              activeOpacity={0.85}
            >
              <Text style={secondaryButtonColor ? styles.actionBtnText : styles.secondaryBtnText}>
                {secondaryButtonLabel}
              </Text>
            </TouchableOpacity>
          )}
          
          {buttonLabel && (
            <TouchableOpacity 
              style={[
                styles.actionBtn, 
                styles.primaryBtn,
                { backgroundColor: finalColor },
                secondaryButtonLabel && styles.flexButton
              ]} 
              onPress={buttonOnPress}
              activeOpacity={0.85}
            >
              <Text style={styles.actionBtnText}>{buttonLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 40,
    paddingHorizontal: 24,
    paddingTop: 0,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 15,
    minHeight: 200,
    alignItems: "center",
    position: "relative",
  },
  dragHandle: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingTop: 8,
    marginBottom: 8,
  },
  bar: {
    height: 5,
    width: 40,
    backgroundColor: "#DADCE0",
    borderRadius: 3,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 10,
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center", 
    color: "#1A1A1A",
    marginBottom: 12,
    paddingHorizontal: 20,
    lineHeight: 28,
  },
  content: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  primaryBtn: {
    width: "100%",
  },
  secondaryBtn: {
    backgroundColor: "#F5F5F5",
    shadowOpacity: 0.05,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "100%",
  },
  flexButton: {
    flex: 1,
    width: 'auto',
  },
  actionBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.3,
  },
  secondaryBtnText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.3,
  },
});