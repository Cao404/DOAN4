import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { COLORS } from '../utils/constants';

export default function QRScanner({ active = true, locked = false, onScanned }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  if (!permission) return <View style={styles.permission}><Text style={styles.permissionText}>Đang kiểm tra quyền camera...</Text></View>;
  if (!permission.granted) return <View style={styles.permission}><Ionicons name="camera-outline" size={38} color={COLORS.primary} /><Text style={styles.permissionTitle}>Cần quyền truy cập camera</Text><Text style={styles.permissionText}>Ứng dụng dùng camera để đọc mã QR trên vé tháng.</Text><Button title="Cho phép camera" onPress={requestPermission} /></View>;
  return <View style={styles.container}>{active && <CameraView style={StyleSheet.absoluteFill} facing="back" active={active} enableTorch={torch} barcodeScannerSettings={{ barcodeTypes: ['qr'] }} onBarcodeScanned={locked ? undefined : ({ data }) => onScanned(data)} />}<View pointerEvents="none" style={styles.shade}><View style={styles.scanBox}><View style={[styles.corner, styles.tl]} /><View style={[styles.corner, styles.tr]} /><View style={[styles.corner, styles.bl]} /><View style={[styles.corner, styles.br]} /></View><Text style={styles.hint}>{locked ? 'Đang kiểm tra vé...' : 'Đưa mã QR vào giữa khung'}</Text></View><Pressable accessibilityRole="button" accessibilityLabel={torch ? 'Tắt đèn pin' : 'Bật đèn pin'} onPress={() => setTorch((value) => !value)} style={styles.torch}><Ionicons name={torch ? 'flash' : 'flash-outline'} size={22} color="#fff" /></Pressable></View>;
}

const styles = StyleSheet.create({
  container: { minHeight: 340, flex: 1, overflow: 'hidden', borderRadius: 22, backgroundColor: COLORS.camera },
  shade: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(5,16,12,.23)' },
  scanBox: { width: 224, height: 224, position: 'relative' }, corner: { position: 'absolute', width: 34, height: 34, borderColor: '#d6fff0' },
  tl: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 5 }, tr: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 5 }, bl: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 5 }, br: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 5 },
  hint: { marginTop: 28, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, overflow: 'hidden', backgroundColor: 'rgba(8,23,18,.78)', color: '#eefbf6', fontSize: 13, fontWeight: '600' },
  torch: { position: 'absolute', top: 18, right: 18, width: 46, height: 46, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: 'rgba(8,23,18,.72)' },
  permission: { flex: 1, minHeight: 365, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 26, borderRadius: 22, backgroundColor: COLORS.surface }, permissionTitle: { color: COLORS.ink, fontSize: 18, fontWeight: '800' }, permissionText: { color: COLORS.muted, fontSize: 13, lineHeight: 20, textAlign: 'center' }
});
