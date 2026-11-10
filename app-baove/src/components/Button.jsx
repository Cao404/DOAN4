import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';

export default function Button({ title, onPress, variant = 'primary', icon, loading = false, disabled = false, style }) {
  return <Pressable accessibilityRole="button" onPress={onPress} disabled={disabled || loading} style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, (disabled || loading) && styles.disabled, style]}>{loading ? <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? '#fff' : COLORS.primary} /> : <>{icon && <Ionicons name={icon} size={20} color={variant === 'primary' || variant === 'danger' ? '#fff' : COLORS.primaryDark} />}<Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text></>}</Pressable>;
}

const styles = StyleSheet.create({
  base: { minHeight: 54, borderRadius: 14, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  primary: { backgroundColor: COLORS.primary }, secondary: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.line }, ghost: { backgroundColor: 'transparent' }, danger: { backgroundColor: COLORS.danger },
  text: { fontSize: 15, fontWeight: '700' }, primaryText: { color: '#fff' }, secondaryText: { color: COLORS.primaryDark }, ghostText: { color: COLORS.primaryDark }, dangerText: { color: '#fff' },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.88 }, disabled: { opacity: 0.55 }
});
