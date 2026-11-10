import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { Field } from '../components/UI';
import { useAuth } from '../store/AuthContext';
import { COLORS } from '../utils/constants';
import parkingHero from '../../assets/visuals/mobile-parking-hero.webp';

export default function LoginScreen() {
  const insets = useSafeAreaInsets(); const { login } = useAuth();
  const [email, setEmail] = useState('resident1@parking.local'); const [password, setPassword] = useState('Parking@123');
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false); const [show, setShow] = useState(false);
  const submit = async () => { if (!email.trim() || !password) return setError('Vui lòng nhập email và mật khẩu.'); setLoading(true); setError(''); try { await login(email, password); } catch (e) { setError(e.message); } finally { setLoading(false); } };
  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
    <StatusBar style="light" />
    <View style={styles.brand}><View style={styles.mark}><Ionicons name="business" size={24} color="#fff" /></View><Text style={styles.brandName}>PARKING / 01</Text><Text style={styles.brandSub}>VẬN HÀNH BÃI XE CHUNG CƯ</Text><Image source={parkingHero} style={styles.hero} resizeMode="contain" /></View>
    <View style={styles.panel}><Text style={styles.kicker}>TRUY CẬP HỆ THỐNG</Text><Text style={styles.title}>Bắt đầu an toàn.</Text><Text style={styles.subtitle}>Một ứng dụng cho cư dân và bảo vệ. Hệ thống sẽ mở đúng không gian theo vai trò của bạn.</Text>
      {error ? <View style={styles.error}><Ionicons name="alert-circle" size={18} color={COLORS.danger} /><Text style={styles.errorText}>{error}</Text></View> : null}
      <Field label="EMAIL" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
      <View><Field label="MẬT KHẨU" value={password} onChangeText={setPassword} secureTextEntry={!show} autoComplete="current-password" /><Text onPress={() => setShow(!show)} style={styles.show}>{show ? 'Ẩn' : 'Hiện'}</Text></View>
      <Button title="Đăng nhập" icon="arrow-forward" loading={loading} onPress={submit} />
      <Text style={styles.demo}>Demo: resident1@parking.local hoặc guard1@parking.local · Parking@123</Text>
    </View><Text style={styles.footer}>QR được xác thực tại máy chủ · Không lưu mật khẩu trên thiết bị</Text>
  </KeyboardAvoidingView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 20, backgroundColor: COLORS.graphite }, brand: { minHeight: 178, marginTop: 24, overflow: 'hidden' }, mark: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: COLORS.primary }, brandName: { marginTop: 14, color: '#fffdf7', fontSize: 20, fontWeight: '900', letterSpacing: 1.4 }, brandSub: { marginTop: 5, maxWidth: 170, color: '#929a96', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 }, hero: { position: 'absolute', right: -18, bottom: -14, width: 210, height: 180 },
  panel: { gap: 16, padding: 22, borderRadius: 22, backgroundColor: COLORS.background }, kicker: { color: COLORS.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1.4 }, title: { color: COLORS.ink, fontSize: 34, lineHeight: 38, fontWeight: '900', letterSpacing: -1.3 }, subtitle: { color: COLORS.muted, fontSize: 13, lineHeight: 20 }, error: { flexDirection: 'row', gap: 8, padding: 12, borderRadius: 12, borderLeftWidth: 3, borderLeftColor: COLORS.danger, backgroundColor: COLORS.dangerSoft }, errorText: { flex: 1, color: COLORS.danger, fontSize: 12 }, show: { position: 'absolute', right: 14, bottom: 19, color: COLORS.primary, fontSize: 12, fontWeight: '900' }, demo: { color: COLORS.muted, fontSize: 10, lineHeight: 16, textAlign: 'center' }, footer: { marginBottom: 14, color: '#8f9692', fontSize: 10, textAlign: 'center' }
});
