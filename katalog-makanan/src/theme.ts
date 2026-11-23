export const COLORS = {
  primary: '#e8590c',
  primaryDark: '#d9480f',
  bg: '#f8f9fa',
  card: '#ffffff',
  text: '#212529',
  muted: '#868e96',
  border: '#e9ecef',
  success: '#2f9e44',
  danger: '#e03131',
  chip: '#fff3e6',
};

export function formatRupiah(nominal: number): string {
  return 'Rp ' + nominal.toLocaleString('id-ID');
}
