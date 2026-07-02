export function generateId(items: { id: number }[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((i) => i.id)) + 1;
}

export function formatRowIndex(index: number): string {
  return index < 9 ? `0${index + 1}` : String(index + 1);
}

export function formatDate(dateStr: string): string {
  return dateStr.slice(0, 10);
}

export function isToday(dateStr: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return dateStr.slice(0, 10) === today;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatTripDate(startDate: string, endDate: string): string {
  const startDay = parseInt(startDate.slice(8, 10), 10);
  const endDay = parseInt(endDate.slice(8, 10), 10);
  const monthIndex = parseInt(endDate.slice(5, 7), 10) - 1;
  return `${startDay} - ${endDay} / ${MONTHS[monthIndex] ?? ''}`;
}

export function renderStars(rate: number): number {
  const parsed = parseFloat(String(rate));
  if (isNaN(parsed)) return 0;
  if (parsed === 0) return 1;
  return Math.min(Math.max(Math.floor(parsed), 0), 5);
}

export const DEMO_CREDENTIALS = {
  superAdmin: { email: 'admin@voyago.com', password: 'admin12345', code: '123456' },
  admin: { email: 'manager@voyago.com', password: 'manager123' },
} as const;

export { uploadImg as DEFAULT_UPLOAD_IMAGE } from '@/shared/assets/images';
