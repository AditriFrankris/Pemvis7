import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../src/context/CartContext';
import { COLORS, formatRupiah } from '../src/theme';

const BIAYA_LAYANAN = 2000;
const ONGKIR = 10000;

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, totalHarga, totalItem, kosongkan } = useCart();

  const totalBayar = totalHarga + BIAYA_LAYANAN + (items.length > 0 ? ONGKIR : 0);

  const prosesCheckout = () => {
    // Simulasi checkout: kosongkan keranjang lalu pindah ke halaman konfirmasi
    kosongkan();
    router.replace(`/konfirmasi?total=${totalBayar}&jumlah=${totalItem}`);
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.safe, styles.center]} edges={['bottom']}>
        <Ionicons name="bag-handle-outline" size={56} color={COLORS.muted} />
        <Text style={styles.kosong}>Tidak ada pesanan untuk di-checkout.</Text>
        <TouchableOpacity style={styles.btnKembali} onPress={() => router.back()}>
          <Text style={styles.btnKembaliText}>Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.makanan.id}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.qty}>{item.jumlah}x</Text>
            <Text style={styles.nama} numberOfLines={1}>
              {item.makanan.nama}
            </Text>
            <Text style={styles.harga}>{formatRupiah(item.makanan.harga * item.jumlah)}</Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.rincian}>
            <Baris label="Subtotal" nilai={formatRupiah(totalHarga)} />
            <Baris label="Biaya layanan" nilai={formatRupiah(BIAYA_LAYANAN)} />
            <Baris label="Ongkos kirim" nilai={formatRupiah(ONGKIR)} />
            <View style={styles.garis} />
            <Baris label="Total Pembayaran" nilai={formatRupiah(totalBayar)} tebal />
          </View>
        }
      />

      <View style={styles.footer}>
        <View style={styles.metodeRow}>
          <Ionicons name="wallet-outline" size={20} color={COLORS.primary} />
          <Text style={styles.metodeText}>Pembayaran: Tunai (COD)</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={prosesCheckout}>
          <Text style={styles.checkoutText}>Buat Pesanan • {formatRupiah(totalBayar)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Baris({ label, nilai, tebal }: { label: string; nilai: string; tebal?: boolean }) {
  return (
    <View style={styles.barisRow}>
      <Text style={[styles.barisLabel, tebal && styles.barisTebal]}>{label}</Text>
      <Text style={[styles.barisNilai, tebal && styles.barisTebal]}>{nilai}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  center: { justifyContent: 'center', alignItems: 'center', padding: 24 },
  kosong: { color: COLORS.muted, marginTop: 14, textAlign: 'center' },
  btnKembali: {
    marginTop: 18,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  btnKembaliText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  qty: { fontWeight: 'bold', color: COLORS.primary, width: 32 },
  nama: { flex: 1, color: COLORS.text },
  harga: { fontWeight: '600', color: COLORS.text },
  rincian: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  barisRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  barisLabel: { color: COLORS.muted },
  barisNilai: { color: COLORS.text },
  barisTebal: { fontWeight: 'bold', color: COLORS.text, fontSize: 16 },
  garis: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  footer: { backgroundColor: COLORS.card, padding: 16, borderTopWidth: 1, borderTopColor: COLORS.border },
  metodeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  metodeText: { color: COLORS.text, fontWeight: '600' },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
