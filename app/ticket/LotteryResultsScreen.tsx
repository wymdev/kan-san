import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';


// Complete Lottery Result Structure
const resultData = {
    drawDate: 'Nov 1, 2025',
    drawPeriod: '16 Nov 2025 - Period 23/2025',
    prizes: {
        // Main Prizes
        first: '123456',
        nearFirst: ['123455', '123457'], // ± 1 from first prize
        second: ['234567', '345678', '456789', '567890', '678901'],
        third: ['789012', '890123', '901234', '012345', '123457', '234568', '345679', '456780', '567891', '678902'],
        fourth: [
            '901235', '012346', '123458', '234569', '345670', '456781', '567892', '678903', '789014', '890125',
            '901236', '012347', '123459', '234560', '345671', '456782', '567893', '678904', '789015', '890126',
            '901237', '012348', '123450', '234561', '345672', '456783', '567894', '678905', '789016', '890127',
            '901238', '012349', '123451', '234562', '345673', '456784', '567895', '678906', '789017', '890128',
            '901239', '012340', '123452', '234563', '345674', '456785', '567896', '678907', '789018', '890129',
            // 50 numbers total for demo
        ],
        fifth: [
            '345675', '456786', '567897', '678908', '789019', '890120', '901230', '012341', '123453', '234564',
            // ... would contain 100 numbers in real lottery
        ],
        // Special Prizes
        front3: ['123', '456', '789', '012'],
        back3: ['456', '890', '234', '678'],
        back2: '56'
    },
    payouts: {
        first: 6000000,
        nearFirst: 100000,
        second: 200000,
        third: 80000,
        fourth: 40000,
        fifth: 20000,
        front3: 4000,
        back3: 4000,
        back2: 2000
    }
};


const myTickets = ['123456', '789012', '234567', '456890'];


export default function LotteryResultsScreen() {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [checking, setChecking] = useState(false);
    const [checkResult, setCheckResult] = useState<null | {
        isWin: boolean;
        prize?: string;
        amount?: number;
    }>(null);


    const handleCheck = (number?: string) => {
        const ticket = number ?? input.trim();
        if (ticket.length !== 6) return;


        setChecking(true);
        setTimeout(() => {
            let result = { isWin: false, prize: '', amount: 0 };


            // Check First Prize
            if (ticket === resultData.prizes.first) {
                result = { isWin: true, prize: 'First Prize 🏆', amount: resultData.payouts.first };
            }
            // Check Near First Prize (±1)
            else if (resultData.prizes.nearFirst.includes(ticket)) {
                result = { isWin: true, prize: 'Near First Prize', amount: resultData.payouts.nearFirst };
            }
            // Check Second Prize
            else if (resultData.prizes.second.includes(ticket)) {
                result = { isWin: true, prize: 'Second Prize 🥈', amount: resultData.payouts.second };
            }
            // Check Third Prize
            else if (resultData.prizes.third.includes(ticket)) {
                result = { isWin: true, prize: 'Third Prize 🥉', amount: resultData.payouts.third };
            }
            // Check Fourth Prize
            else if (resultData.prizes.fourth.includes(ticket)) {
                result = { isWin: true, prize: 'Fourth Prize', amount: resultData.payouts.fourth };
            }
            // Check Fifth Prize
            else if (resultData.prizes.fifth.includes(ticket)) {
                result = { isWin: true, prize: 'Fifth Prize', amount: resultData.payouts.fifth };
            }
            // Check Front 3 Digits
            else if (resultData.prizes.front3.includes(ticket.substring(0, 3))) {
                result = { isWin: true, prize: 'Front 3-Digit Match', amount: resultData.payouts.front3 };
            }
            // Check Back 3 Digits
            else if (resultData.prizes.back3.includes(ticket.substring(3, 6))) {
                result = { isWin: true, prize: 'Back 3-Digit Match', amount: resultData.payouts.back3 };
            }
            // Check Back 2 Digits
            else if (ticket.slice(-2) === resultData.prizes.back2) {
                result = { isWin: true, prize: 'Back 2-Digit Match', amount: resultData.payouts.back2 };
            }


            setCheckResult(result.isWin ? result : { isWin: false });
            setChecking(false);
        }, 1000);
    };


    const resetResult = () => {
        setCheckResult(null);
        setInput('');
    };


    const formatCurrency = (amount: number): string => {
        try {
            const formatted = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(amount);
            return `฿${formatted}`;
        } catch (error) {
            return `฿${amount.toLocaleString()}`;
        }
    };


    return (
        <ImageBackground
            source={require('../../assets/images/gradient-bg.jpeg')}
            style={styles.bg}
            imageStyle={{ opacity: 0.95 }}
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Elegant Header */}
                <View style={styles.headerWrap}>
                    <TouchableOpacity onPress={router.back} style={styles.backBtn} activeOpacity={0.7}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerTextWrap}>
                        <Text style={styles.headerTitle}>Check Lottery</Text>
                        <Text style={styles.headerSubtitle}>Draw Date: {resultData.drawDate}</Text>
                        <View style={styles.liveBadge}>
                            <View style={styles.liveDot} />
                            <Text style={styles.liveText}>LIVE</Text>
                        </View>
                    </View>
                </View>


                {/* Premium Check Card */}
                <Animatable.View animation="fadeInUp" duration={600} style={styles.checkCard}>
                    <View style={styles.checkHeader}>
                        <Ionicons name="search-circle" size={28} color="#0EA5E9" />
                        <Text style={styles.checkLabel}>Check Number</Text>
                    </View>
                    <Text style={styles.checkDescription}>Enter 6-digit number to check prizes</Text>


                    <View style={styles.numberInputContainer}>
                        <TextInput
                            style={styles.numberInput}
                            placeholder="Enter 6-digit number"
                            placeholderTextColor="#94A3B8"
                            keyboardType="numeric"
                            maxLength={6}
                            value={input}
                            onChangeText={setInput}
                        />
                        <TouchableOpacity
                            style={[styles.searchBtn, (!input || checking) && styles.searchBtnDisabled]}
                            onPress={() => handleCheck()}
                            disabled={!input || checking}
                            activeOpacity={0.8}
                        >
                            {checking ? (
                                <Animatable.View animation="rotate" iterationCount="infinite" duration={1000}>
                                    <Ionicons name="sync" size={24} color="#fff" />
                                </Animatable.View>
                            ) : (
                                <Ionicons name="search" size={24} color="#fff" />
                            )}
                        </TouchableOpacity>
                    </View>


                    {checkResult && (
                        <Animatable.View
                            animation={checkResult.isWin ? 'bounceIn' : 'shake'}
                            duration={800}
                            style={[styles.resultBox, checkResult.isWin ? styles.resultWin : styles.resultLose]}
                        >
                            <View style={styles.resultIconWrap}>
                                <Ionicons
                                    name={checkResult.isWin ? 'trophy' : 'sad-outline'}
                                    size={48}
                                    color={checkResult.isWin ? '#F59E0B' : '#EF4444'}
                                />
                            </View>
                            <Text style={styles.resultTitle}>
                                {checkResult.isWin ? 'Congratulations! You won! 🎉' : 'Sorry, not a winner'}
                            </Text>
                            {checkResult.isWin && (
                                <>
                                    <Text style={styles.resultPrize}>{checkResult.prize}</Text>
                                    <Text style={styles.resultAmount}>{formatCurrency(checkResult.amount!)}</Text>
                                </>
                            )}
                            <TouchableOpacity onPress={resetResult} style={styles.tryAgainBtn} activeOpacity={0.7}>
                                <Ionicons name="refresh" size={16} color="#1E293B" style={{ marginRight: 6 }} />
                                <Text style={styles.tryAgainText}>Check Another Number</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    )}
                </Animatable.View>


                {/* My Tickets Section */}
                <Animatable.View animation="fadeInUp" delay={200} duration={600}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="ticket" size={24} color="#FFD700" />
                        <Text style={styles.sectionTitle}>My Tickets</Text>
                        <View style={styles.ticketBadge}>
                            <Text style={styles.ticketCount}>{myTickets.length}</Text>
                        </View>
                    </View>


                    <View style={styles.ticketsList}>
                        {myTickets.map((ticket, index) => (
                            <Animatable.View
                                key={ticket}
                                animation="fadeInRight"
                                delay={index * 100}
                                style={styles.ticketCard}
                            >
                                <View style={styles.ticketLeft}>
                                    <View style={styles.ticketIconWrap}>
                                        <Ionicons name="ticket-outline" size={28} color="#0EA5E9" />
                                    </View>
                                    <View>
                                        <Text style={styles.ticketLabel}>Number</Text>
                                        <Text style={styles.ticketNum}>{ticket}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.ticketCheckBtn}
                                    onPress={() => handleCheck(ticket)}
                                    disabled={checking}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons name="search-circle" size={20} color="#0EA5E9" />
                                    <Text style={styles.ticketCheckText}>Check</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        ))}
                    </View>
                </Animatable.View>


                {/* Complete Results Section */}
                <Animatable.View animation="fadeInUp" delay={400} duration={600} style={styles.resultsCard}>
                    <View style={styles.resultsHeader}>
                        <Ionicons name="trophy" size={28} color="#F59E0B" />
                        <Text style={styles.winningTitle}>All Prize Results</Text>
                    </View>


                    {/* First Prize - Premium Display */}
                    <Animatable.View animation="pulse" delay={600} style={styles.firstPrizeWrap}>
                        <LinearGradient
                            colors={['#FFD700', '#FFA500', '#FF8C00']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.firstPrizeGradient}
                        >
                            <View style={styles.firstPrizeContent}>
                                <Ionicons name="trophy" size={32} color="#fff" style={{ marginBottom: 8 }} />
                                <Text style={styles.firstPrizeLabel}>1st Prize</Text>
                                <Text style={styles.firstPrizeNumber}>{resultData.prizes.first}</Text>
                                <Text style={styles.firstPrizeAmount}>{formatCurrency(resultData.payouts.first)}</Text>
                            </View>
                        </LinearGradient>
                    </Animatable.View>


                    {/* Near First Prize */}
                    <View style={styles.prizeSection}>
                        <View style={styles.prizeSectionHeader}>
                            <Text style={styles.prizeSectionTitle}>Near 1st Prize</Text>
                            <Text style={styles.prizeSectionAmount}>{formatCurrency(resultData.payouts.nearFirst)}</Text>
                        </View>
                        <View style={styles.prizeNumbersRow}>
                            {resultData.prizes.nearFirst.map((num, idx) => (
                                <View key={idx} style={styles.prizeChip}>
                                    <Text style={styles.prizeChipText}>{num}</Text>
                                </View>
                            ))}
                        </View>
                    </View>


                    {/* Second Prize */}
                    <View style={styles.prizeSection}>
                        <View style={styles.prizeSectionHeader}>
                            <View style={styles.prizeTitleRow}>
                                <Ionicons name="medal" size={20} color="#C0C0C0" />
                                <Text style={styles.prizeSectionTitle}>2nd Prize (5 prizes)</Text>
                            </View>
                            <Text style={styles.prizeSectionAmount}>{formatCurrency(resultData.payouts.second)}</Text>
                        </View>
                        <View style={styles.prizeNumbersGrid}>
                            {resultData.prizes.second.map((num, idx) => (
                                <View key={idx} style={[styles.prizeBox, styles.prizeBoxSecond]}>
                                    <Text style={styles.prizeBoxNumber}>{num}</Text>
                                </View>
                            ))}
                        </View>
                    </View>


                    {/* Third Prize */}
                    <View style={styles.prizeSection}>
                        <View style={styles.prizeSectionHeader}>
                            <View style={styles.prizeTitleRow}>
                                <Ionicons name="medal" size={20} color="#CD7F32" />
                                <Text style={styles.prizeSectionTitle}>3rd Prize (10 prizes)</Text>
                            </View>
                            <Text style={styles.prizeSectionAmount}>{formatCurrency(resultData.payouts.third)}</Text>
                        </View>
                        <View style={styles.prizeNumbersGrid}>
                            {resultData.prizes.third.map((num, idx) => (
                                <View key={idx} style={[styles.prizeBox, styles.prizeBoxThird]}>
                                    <Text style={styles.prizeBoxNumber}>{num}</Text>
                                </View>
                            ))}
                        </View>
                    </View>


                    {/* Fourth Prize */}
                    <View style={styles.prizeSection}>
                        <View style={styles.prizeSectionHeader}>
                            <Text style={styles.prizeSectionTitle}>4th Prize (50 prizes)</Text>
                            <Text style={styles.prizeSectionAmount}>{formatCurrency(resultData.payouts.fourth)}</Text>
                        </View>
                        <View style={styles.prizeNumbersGrid}>
                            {resultData.prizes.fourth.slice(0, 10).map((num, idx) => (
                                <View key={idx} style={[styles.prizeBox, styles.prizeBoxFourth]}>
                                    <Text style={styles.prizeBoxNumberSmall}>{num}</Text>
                                </View>
                            ))}
                            <View style={styles.moreNumbersBox}>
                                <Text style={styles.moreNumbersText}>+40 more</Text>
                            </View>
                        </View>
                    </View>


                    {/* Fifth Prize */}
                    <View style={styles.prizeSection}>
                        <View style={styles.prizeSectionHeader}>
                            <Text style={styles.prizeSectionTitle}>5th Prize (100 prizes)</Text>
                            <Text style={styles.prizeSectionAmount}>{formatCurrency(resultData.payouts.fifth)}</Text>
                        </View>
                        <View style={styles.prizeNumbersGrid}>
                            {resultData.prizes.fifth.slice(0, 10).map((num, idx) => (
                                <View key={idx} style={[styles.prizeBox, styles.prizeBoxFifth]}>
                                    <Text style={styles.prizeBoxNumberSmall}>{num}</Text>
                                </View>
                            ))}
                            <View style={styles.moreNumbersBox}>
                                <Text style={styles.moreNumbersText}>+90 more</Text>
                            </View>
                        </View>
                    </View>


                    {/* Special Prizes Section */}
                    <View style={styles.specialPrizesWrap}>
                        <Text style={styles.specialPrizesTitle}>Special Prizes</Text>


                        {/* Front 3 Digits */}
                        <View style={styles.specialPrizeRow}>
                            <View style={styles.specialPrizeInfo}>
                                <Text style={styles.specialPrizeLabel}>Front 3-Digit</Text>
                                <Text style={styles.specialPrizeAmount}>{formatCurrency(resultData.payouts.front3)}</Text>
                            </View>
                            <View style={styles.specialNumbersRow}>
                                {resultData.prizes.front3.map((num, idx) => (
                                    <View key={idx} style={[styles.specialChip, styles.specialChipFront]}>
                                        <Text style={styles.specialChipText}>{num}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>


                        {/* Back 3 Digits */}
                        <View style={styles.specialPrizeRow}>
                            <View style={styles.specialPrizeInfo}>
                                <Text style={styles.specialPrizeLabel}>Back 3-Digit</Text>
                                <Text style={styles.specialPrizeAmount}>{formatCurrency(resultData.payouts.back3)}</Text>
                            </View>
                            <View style={styles.specialNumbersRow}>
                                {resultData.prizes.back3.map((num, idx) => (
                                    <View key={idx} style={[styles.specialChip, styles.specialChipBack]}>
                                        <Text style={styles.specialChipText}>{num}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>


                        {/* Back 2 Digits */}
                        <View style={styles.specialPrizeRow}>
                            <View style={styles.specialPrizeInfo}>
                                <Text style={styles.specialPrizeLabel}>Back 2-Digit</Text>
                                <Text style={styles.specialPrizeAmount}>{formatCurrency(resultData.payouts.back2)}</Text>
                            </View>
                            <View style={[styles.specialChip, styles.specialChipBack2]}>
                                <Text style={styles.specialChipTextLarge}>{resultData.prizes.back2}</Text>
                            </View>
                        </View>
                    </View>
                </Animatable.View>


                {/* Footer Info */}
                <View style={styles.footer}>
                    <Ionicons name="information-circle-outline" size={18} color="#fff" />
                    <Text style={styles.footerText}>
                        Results reference from Government Lottery Office
                    </Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    bg: { flex: 1 },
    scrollContent: { paddingBottom: 30 },


    // Header Styles
    headerWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    headerTextWrap: { flex: 1 },
    headerTitle: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '900',
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#E2E8F0',
        marginTop: 4,
        fontWeight: '500',
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(239,68,68,0.9)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginRight: 6,
    },
    liveText: { color: '#fff', fontSize: 12, fontWeight: '700' },


    // Check Card Styles
    checkCard: {
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#0EA5E9',
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },
    checkHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkLabel: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
        marginLeft: 10,
    },
    checkDescription: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 16,
    },
    numberInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    numberInput: {
        flex: 1,
        fontSize: 24,
        fontWeight: '700',
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        letterSpacing: 8,
        color: '#1E293B',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#E2E8F0',
    },
    searchBtn: {
        backgroundColor: '#10B981',
        borderRadius: 16,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#10B981',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    searchBtnDisabled: {
        backgroundColor: '#94A3B8',
        shadowOpacity: 0,
    },


    // Result Box Styles
    resultBox: {
        marginTop: 20,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 5,
    },
    resultWin: {
        backgroundColor: '#FEF3C7',
        borderWidth: 3,
        borderColor: '#F59E0B',
    },
    resultLose: {
        backgroundColor: '#FEE2E2',
        borderWidth: 3,
        borderColor: '#EF4444',
    },
    resultIconWrap: { marginBottom: 12 },
    resultTitle: {
        fontWeight: '800',
        fontSize: 18,
        color: '#1E293B',
        textAlign: 'center',
        marginBottom: 8,
    },
    resultPrize: {
        fontSize: 16,
        fontWeight: '700',
        color: '#F59E0B',
        marginBottom: 4,
    },
    resultAmount: {
        fontSize: 28,
        fontWeight: '900',
        color: '#EF6C00',
        marginBottom: 12,
    },
    tryAgainBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    tryAgainText: {
        color: '#1E293B',
        fontWeight: '700',
        fontSize: 15,
    },


    // Section Header
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
        marginLeft: 10,
        flex: 1,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    ticketBadge: {
        backgroundColor: '#EF4444',
        borderRadius: 12,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ticketCount: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '800',
    },


    // Tickets List Styles
    ticketsList: {
        marginHorizontal: 16,
        marginBottom: 24,
    },
    ticketCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#0EA5E9',
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    ticketLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    ticketIconWrap: {
        backgroundColor: '#E0F2FE',
        borderRadius: 14,
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    ticketLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
        marginBottom: 2,
    },
    ticketNum: {
        fontWeight: '900',
        fontSize: 22,
        color: '#0F172A',
        letterSpacing: 4,
    },
    ticketCheckBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0F2FE',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 6,
    },
    ticketCheckText: {
        fontWeight: '700',
        fontSize: 15,
        color: '#0EA5E9',
    },


    // Results Card Styles
    resultsCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 28,
        paddingVertical: 28,
        paddingHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#F59E0B',
        shadowOpacity: 0.2,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },
    resultsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    winningTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#F59E0B',
        marginLeft: 12,
    },


    // First Prize Styles
    firstPrizeWrap: {
        marginBottom: 24,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#F59E0B',
        shadowOpacity: 0.4,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
        elevation: 10,
    },
    firstPrizeGradient: {
        padding: 24,
        alignItems: 'center',
    },
    firstPrizeContent: {
        alignItems: 'center',
    },
    firstPrizeLabel: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '800',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    firstPrizeNumber: {
        fontSize: 48,
        color: '#fff',
        fontWeight: '900',
        letterSpacing: 6,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    firstPrizeAmount: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '800',
        marginTop: 8,
    },


    // Prize Section Styles
    prizeSection: {
        marginBottom: 20,
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 16,
    },
    prizeSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    prizeTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    prizeSectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1E293B',
    },
    prizeSectionAmount: {
        fontSize: 15,
        fontWeight: '700',
        color: '#10B981',
    },
    prizeNumbersRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    prizeNumbersGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    prizeChip: {
        backgroundColor: '#FEF3C7',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderColor: '#F59E0B',
    },
    prizeChipText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#EA580C',
        letterSpacing: 3,
    },
    prizeBox: {
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        minWidth: '30%',
        alignItems: 'center',
    },
    prizeBoxSecond: {
        backgroundColor: '#E0F2FE',
        borderWidth: 2,
        borderColor: '#0EA5E9',
    },
    prizeBoxThird: {
        backgroundColor: '#FEF3C7',
        borderWidth: 2,
        borderColor: '#F59E0B',
    },
    prizeBoxFourth: {
        backgroundColor: '#DBEAFE',
        borderWidth: 1,
        borderColor: '#3B82F6',
    },
    prizeBoxFifth: {
        backgroundColor: '#D1FAE5',
        borderWidth: 1,
        borderColor: '#10B981',
    },
    prizeBoxNumber: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: 3,
    },
    prizeBoxNumberSmall: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        letterSpacing: 2,
    },
    moreNumbersBox: {
        backgroundColor: '#E2E8F0',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        minWidth: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#CBD5E1',
        borderStyle: 'dashed',
    },
    moreNumbersText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
    },


    // Special Prizes Styles
    specialPrizesWrap: {
        marginTop: 8,
        backgroundColor: '#F0F9FF',
        borderRadius: 16,
        padding: 16,
    },
    specialPrizesTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0369A1',
        marginBottom: 16,
        textAlign: 'center',
    },
    specialPrizeRow: {
        marginBottom: 16,
    },
    specialPrizeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    specialPrizeLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#334155',
    },
    specialPrizeAmount: {
        fontSize: 14,
        fontWeight: '700',
        color: '#10B981',
    },
    specialNumbersRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    specialChip: {
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderWidth: 2,
    },
    specialChipFront: {
        backgroundColor: '#DBEAFE',
        borderColor: '#3B82F6',
    },
    specialChipBack: {
        backgroundColor: '#E9D5FF',
        borderColor: '#A855F7',
    },
    specialChipBack2: {
        backgroundColor: '#D1FAE5',
        borderColor: '#10B981',
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    specialChipText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1E293B',
        letterSpacing: 3,
    },
    specialChipTextLarge: {
        fontSize: 32,
        fontWeight: '900',
        color: '#059669',
        letterSpacing: 6,
    },


    // Footer
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        gap: 8,
    },
    footerText: {
        color: '#E2E8F0',
        fontSize: 13,
        fontWeight: '600',
    },
});
