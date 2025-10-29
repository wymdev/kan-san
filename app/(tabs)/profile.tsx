import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheetModal from '../../components/common/BottomSheetModal';

const LANGS = [
  { label: 'English', flag: '🇬🇧' },
  { label: 'ไทย (Thai)', flag: '🇹🇭' },
  { label: 'မြန်မာ (Myanmar)', flag: '🇲🇲' }
];

export default function ProfileScreen() {
  const [topUp, setTopUp] = useState('');
  const [lang, setLang] = useState(0);
  const [langDropdown, setLangDropdown] = useState(false);
  const [alert, setAlert] = useState(null);

  const [editing, setEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Smith',
    phone: '+1-234-567-8900',
    email: 'john@email.com',
  });
  const [draftInfo, setDraftInfo] = useState(personalInfo);

  // To reset edits
  const handleCancel = () => {
    setEditing(false);
    setDraftInfo(personalInfo);
  };

  // To save edits
  const handleSave = () => {
    setPersonalInfo(draftInfo);
    setEditing(false);
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
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your profile</Text>
          <View style={styles.avatarWrap}>
            <Ionicons name="person-circle-outline" color="#fff" size={98} style={styles.avatarIcon} />
          </View>

          {/* Balance Card */}
          <View style={styles.whiteCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.labelSmall}>Balance</Text>
                <Text style={styles.balanceValue}>฿5,000</Text>
              </View>
              {/* <View style={styles.iconBadge}>
                <Ionicons name="wallet-outline" color="#fff" size={36} />
              </View> */}
              <LinearGradient
                colors={['#A34AFF', '#F986F7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBadge}
              >
                <Ionicons name="wallet-outline" color="#fff" size={36} />
              </LinearGradient>
            </View>
            <View style={styles.hrLine} />
            <Text style={styles.topUpTitle}>Top Up</Text>
            <View style={styles.topUpInputRow}>
              <TextInput
                style={styles.topUpInput}
                value={topUp}
                onChangeText={setTopUp}
                keyboardType="numeric"
                placeholder="Amount"
                placeholderTextColor="#9E9E9E"
              />
              <TouchableOpacity 
                style={styles.topUpBtn}
                onPress={() => setAlert({
                  type: 'success',
                  message: `Successfully topped up ฿${topUp || '0'}`
                })}
              >
                <Text style={styles.topUpBtnText}>Top Up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.topUpRow}>
              {['฿100', '฿500', '฿1000', '฿5000'].map(amt => (
                <TouchableOpacity key={amt} style={styles.topUpBox} onPress={() => setTopUp(amt.replace('฿', ''))}>
                  <Text style={styles.topUpAmount}>{amt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Language Card */}
          <View style={styles.whiteCard}>
            <View style={styles.row}>
              <Ionicons name="language-outline" size={22} color="#893ED6" style={{ marginRight: 8 }} />
              <Text style={styles.sectionTitle}>Language</Text>
            </View>
            <TouchableOpacity
              style={styles.languageDropdown}
              onPress={() => setLangDropdown(!langDropdown)}
              activeOpacity={0.8}>
              <Text style={styles.languageItem}>{LANGS[lang].flag} {LANGS[lang].label}</Text>
              <Ionicons name={langDropdown ? 'chevron-up-outline' : 'chevron-down-outline'} size={16} color="#666" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
            {langDropdown && (
              <View style={styles.languageDropdownBox}>
                {LANGS.map((item, idx) => (
                  <TouchableOpacity key={item.label} style={styles.dropdownItem} onPress={() => { setLang(idx); setLangDropdown(false); }}>
                    <Text style={styles.languageItem}>{item.flag} {item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Personal Info Card */}
          <View style={styles.whiteCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              {editing ? (
                <View style={{flexDirection: 'row', gap: 10}}>
                  <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                    <Ionicons name="checkmark-outline" size={20} color="#fff" style={{marginRight: 5}} />
                    <Text style={styles.saveBtnText}>Save</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => setEditing(true)}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
              )}
            </View>
            {/* Name Field */}
            <View style={styles.infoField}>
              <Ionicons name="person-outline" size={18} color="#36395A" style={{ marginRight: 7, marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Name</Text>
                {editing ? (
                  <TextInput
                    style={styles.infoInput}
                    value={draftInfo.name}
                    onChangeText={val => setDraftInfo({...draftInfo, name: val})}
                  />
                ) : (
                  <Text style={styles.infoValue}>{personalInfo.name}</Text>
                )}
              </View>
            </View>
            {/* Phone Field */}
            <View style={styles.infoField}>
              <Ionicons name="call-outline" size={18} color="#36395A" style={{ marginRight: 7, marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Phone</Text>
                {editing ? (
                  <TextInput
                    style={styles.infoInput}
                    value={draftInfo.phone}
                    onChangeText={val => setDraftInfo({...draftInfo, phone: val})}
                  />
                ) : (
                  <Text style={styles.infoValue}>{personalInfo.phone}</Text>
                )}
              </View>
            </View>
            {/* Email Field */}
            <View style={styles.infoField}>
              <Ionicons name="mail-outline" size={18} color="#36395A" style={{ marginRight: 7, marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Email</Text>
                {editing ? (
                  <TextInput
                    style={styles.infoInput}
                    value={draftInfo.email}
                    onChangeText={val => setDraftInfo({...draftInfo, email: val})}
                  />
                ) : (
                  <Text style={styles.infoValue}>{personalInfo.email}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Account Section */}
          <View style={styles.whiteCard}>
            <TouchableOpacity 
              style={styles.actionRow}
              onPress={() => setAlert({
                type: 'warning',
                message: 'Password change feature coming soon!'
              })}
            >
              <Ionicons name="lock-closed-outline" size={22} color="#36395A" />
              <Text style={styles.actionLabel}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionRow}
              onPress={() => setAlert({
                type: 'info',
                message: 'Notification settings will be available in the next update.'
              })}
            >
              <Ionicons name="notifications-outline" size={22} color="#36395A" />
              <Text style={styles.actionLabel}>Notification Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => setAlert({
                type: 'info',
                message: "This app was developed by Ken San Admin.\nApplication version 1.0"
              })}
            >
              <Ionicons name="information-circle-outline" size={22} color="#893ED6" />
              <Text style={[styles.actionLabel, { color: "#893ED6" }]}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionRow}
              onPress={() => setAlert({
                type: 'danger',
                message: 'Are you sure you want to logout?',
                confirmAction: true
              })}
            >
              <Ionicons name="log-out-outline" size={22} color="#E44241" />
              <Text style={[styles.actionLabel, { color: "#E44241" }]}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Sheet Modal */}
          <BottomSheetModal
            visible={!!alert}
            onClose={() => setAlert(null)}
            type={alert?.type || 'info'}
            title={
              alert?.type === 'success' ? 'Success!' :
              alert?.type === 'warning' ? 'Notice' :
              alert?.type === 'danger' ? 'Confirm Logout' :
              'About This Application'
            }
            buttonLabel={alert?.confirmAction ? 'Logout' : 'Close'}
            buttonOnPress={() => {
              if (alert?.confirmAction) {
                // Handle logout action here
                console.log('Logging out...');
              }
              setAlert(null);
            }}
            secondaryButtonLabel={alert?.confirmAction ? 'Cancel' : undefined}
            secondaryButtonOnPress={() => setAlert(null)}
            secondaryButtonColor={alert?.confirmAction ? '#6B7280' : undefined}
          >
            <Text style={styles.modalMessage}>
              {alert?.message}
            </Text>
          </BottomSheetModal>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  gradientBg: { flex: 1, width: '100%', height: '100%' },
  container: { padding: 18, paddingBottom: 85 },

  // Header
  title: { fontSize: 30, color: '#fff', fontWeight: 'bold', marginTop: 10, marginBottom: 2 },
  subtitle: { fontSize: 15, color: '#f0deff', marginBottom: 24 },

  // Avatar
  avatarWrap: { alignItems: 'center', marginBottom: 10 },
  avatarIcon: { shadowColor: '#fff', shadowOpacity: 0.10, shadowRadius: 24 },

  // Card
  whiteCard: {
    backgroundColor: '#fff', borderRadius: 20,
    padding: 18, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.09, shadowRadius: 7, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },

  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },

  hrLine: { width: '100%', height: 1, borderRadius: 1, backgroundColor: '#EFEFEF', marginVertical: 13 },

  // Balance section
  labelSmall: { color: '#616161', fontSize: 14, fontWeight: '400' },
  balanceValue: { color: '#090211ff', fontWeight: '600', fontSize: 30, marginTop: 3 },
  iconBadge: { borderRadius: 18, padding: 7 },
  topUpTitle: { fontSize: 17, color: '#444', fontWeight: 'bold' },
  topUpInputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 9, marginBottom: 8, gap: 7 },
  topUpInput: { backgroundColor: '#F2F2F2', borderRadius: 8, fontSize: 15, paddingHorizontal: 16, paddingVertical: 8, flex: 1, color: '#444', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 5 },
  topUpBtn: { backgroundColor: '#A34AFF', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 22, marginLeft: 5 },
  topUpBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  topUpRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 4, flexWrap: 'wrap' },
  topUpBox: { backgroundColor: '#F7F7F9', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24, marginVertical: 4 },
  topUpAmount: { color: '#090211ff', fontWeight: 'bold', fontSize: 17 },

  // Language
  sectionTitle: { fontWeight: 'bold', color: '#22233A', fontSize: 17 },
  languageDropdown: { backgroundColor: '#F7F7F9', borderRadius: 10, marginTop: 10, padding: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  languageItem: { fontSize: 15, color: '#36395A', fontWeight: '600' },
  languageDropdownBox: { marginTop: 6, borderRadius: 10, backgroundColor: '#F7F7F9', overflow: 'hidden' },
  dropdownItem: { padding: 13, borderBottomWidth: 1, borderBottomColor: '#EFEFEF' },

  // Personal Info
  editText: { color: '#AB4EFF', fontWeight: '600', fontSize: 15 },
  infoField: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 7, gap: 4 },
  infoLabel: { fontSize: 13, color: '#757575', fontWeight: '600' },
  infoValue: { fontSize: 16, color: '#13132A', fontWeight: 'bold' },
  cancelBtn: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color:'#1e0b0bff',
    fontWeight:'500',
  },
  cancelBtnText: {
    color: '#1e0b0bff',
    fontWeight: '600',
    fontSize: 15,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A34AFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#AB4EFF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  saveBtnText: {
    color: '#ffffffff',
    fontWeight: '700',
    fontSize: 15,
  },

  // Account
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12 },
  actionLabel: { fontSize: 15, color: '#36395A', fontWeight: '600' },

  infoInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#444',
    marginTop: 4,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },

  // Modal content
  modalMessage: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 10,
    marginTop: 4,
  },
});