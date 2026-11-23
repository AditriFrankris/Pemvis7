import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, formatRupiah } from '../src/theme';

export default function KonfirmasiScreen() {
  const router = useRouter();
  const { total, jumlah } = useLocalSearchParams<{ total: string; jumlah: string }>();
  const nomorPesanan = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={56} color="#fff" />
        </View>
        <Text style={styles.judul}>Pesanan Berhasil!</Text>
        <Text style={styles.sub}>
          Terima kasih, pesananmu sedang kami proses dan akan segera diantar.
        </Text>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Nomor Pesanan</Text>
            <Text style={styles.cardNilai}>{nomorPesanan}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Jumlah Item</Text>
            <Text style={styles.cardNilai}>{jumlah ?? '-'} item</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Total Bayar</Text>
            <Text style={[styles.cardNilai, { color: COLORS.primary }]}>
              {total ? formatRupiah(Number(total)) : '-'}
            </Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Diproses</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => router.replace('/(tabs)')}
        >
          <Ionicons name="home" size={18} color="#fff" />
          <Text style={styles.btnPrimaryText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  judul: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginTop: 20 },
  sub: { color: COLORS.muted, textAlign: 'center', marginTop: 8, lineHeight: 20 },
  card: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 18,
    marginTop: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
  },
  cardLabel: { color: COLORS.muted },
  cardNilai: { color: COLORS.text, fontWeight: '600' },
  statusBadge: {
    backgroundColor: '#fff3bf',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  statusText: { color: '#e67700', fontWeight: '600', fontSize: 12 },
  footer: { padding: 16, backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border },
  btnPrimary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnPrimaryText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
