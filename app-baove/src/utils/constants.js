import { Platform } from 'react-native';

export const COLORS = {
  background: '#f4f1e9', surface: '#fffdf7', ink: '#151817', muted: '#68706c',
  line: '#d9d7cf', primary: '#f04b18', primaryDark: '#a92d0d', primarySoft: '#fff0e8',
  graphite: '#171a19', graphiteSoft: '#242827', danger: '#b62f2a', dangerSoft: '#fff0ed',
  success: '#207044', successSoft: '#e6f3e9', warning: '#9b5a12', warningSoft: '#fff0d7', camera: '#090b0b'
};

export const API_URL = process.env.EXPO_PUBLIC_API_URL || Platform.select({
  android: 'http://10.0.2.2:4000/api/v1', ios: 'http://localhost:4000/api/v1', default: 'http://localhost:4000/api/v1'
});
export const ACCESS_TOKEN_KEY = 'parkhub_mobile_access';
export const REFRESH_TOKEN_KEY = 'parkhub_mobile_refresh';
export const USER_KEY = 'parkhub_mobile_user';
export const MOBILE_ROLES = ['RESIDENT', 'GUARD'];
export const VEHICLE_TYPES = { MOTORBIKE: 'Xe máy', CAR: 'Ô tô', BICYCLE: 'Xe đạp', ELECTRIC_BIKE: 'Xe điện' };
export const STATUS_LABELS = {
  PENDING: 'Đang chờ', APPROVED: 'Đã duyệt', REJECTED: 'Bị từ chối', CANCELLED: 'Đã hủy',
  PAID: 'Đã thanh toán', FAILED: 'Thất bại', ACTIVE: 'Đang hoạt động', INACTIVE: 'Ngừng hoạt động',
  EXPIRED: 'Đã hết hạn', LOCKED: 'Đã khóa', REVOKED: 'Đã thu hồi', PARKING: 'Trong bãi', COMPLETED: 'Đã rời bãi',
  ABNORMAL: 'Bất thường', OPEN: 'Chưa xử lý', RESOLVED: 'Đã xử lý'
};
export const VIOLATION_TYPES = [
  ['INVALID_QR', 'QR không hợp lệ'], ['EXPIRED_TICKET', 'Vé hết hạn'], ['WRONG_VEHICLE', 'Không đúng xe'],
  ['UNAUTHORIZED_VEHICLE', 'Xe chưa đăng ký'], ['OTHER', 'Khác']
];
