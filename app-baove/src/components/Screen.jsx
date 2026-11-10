import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../utils/constants';

export default function Screen({ title, eyebrow, children, navigation, scroll = true, refreshing = false, onRefresh, right, dark = false }) {
  const insets = useSafeAreaInsets();
  const content = <View style={styles.content}>{children}</View>;
  return <View style={[styles.safe, dark && styles.dark, { paddingTop: insets.top }]}> 
    <StatusBar style={dark ? 'light' : 'dark'} />
    <View style={styles.header}>
      {navigation?.canGoBack() ? <Pressable onPress={() => navigation.goBack()} style={[styles.back, dark && styles.darkBack]}><Ionicons name="arrow-back" size={21} color={dark ? '#fff' : COLORS.ink} /></Pressable> : null}
      <View style={styles.titleWrap}>{eyebrow ? <Text style={[styles.eyebrow, dark && styles.darkMuted]}>{eyebrow}</Text> : null}<Text style={[styles.title, dark && styles.darkText]} numberOfLines={2}>{title}</Text></View>{right}
    </View>
    {scroll ? <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll} refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} /> : undefined}>{content}</ScrollView> : content}
  </View>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background }, dark: { backgroundColor: COLORS.graphite },
  header: { minHeight: 82, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 18, paddingVertical: 12 },
  back: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.line, borderRadius: 14, backgroundColor: COLORS.surface }, darkBack: { borderColor: '#3d4240', backgroundColor: COLORS.graphiteSoft },
  titleWrap: { flex: 1 }, eyebrow: { color: COLORS.primary, fontSize: 10, lineHeight: 15, fontWeight: '900', letterSpacing: 1.3, textTransform: 'uppercase' }, title: { color: COLORS.ink, fontSize: 27, lineHeight: 31, fontWeight: '900', letterSpacing: -1 }, darkText: { color: '#fffdf7' }, darkMuted: { color: '#ff7a50' },
  scroll: { paddingBottom: 48 }, content: { flexGrow: 1, gap: 16, paddingHorizontal: 18 }
});
