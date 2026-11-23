import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../src/context/CartContext';
import { COLORS, formatRupiah } from '../../src/theme';

export default function KeranjangScreen() {
  const router = useRouter();
  const { items, tambah, kurang, hapus, totalHarga, totalItem } = useCart();

  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.safe, styles.center]} edges={['bottom']}>
        <Ionicons name="cart-outline" size={64} color={COLORS.muted} />
        <Text style={styles.kosongJudul}>Keranjang masih kosong</Text>
        <Text style={styles.kosongSub}>Yuk pilih makanan favoritmu dulu.</Text>
        <TouchableOpacity style={styles.btnKatalog} onPress={() => router.push('/katalog')}>
          <Text style={styles.btnKatalogText}>Lihat Katalog</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.makanan.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.makanan.gambar} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.nama} numberOfLines={1}>
                {item.makanan.nama}
              </Text>
              <Text style={styles.harga}>{formatRupiah(item.makanan.harga)}</Text>
              <Text style={styles.subtotal}>
                Subtotal: {formatRupiah(item.makanan.harga * item.jumlah)}
              </Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => kurang(item.makanan.id)}>
                  <Ionicons name="remove" size={18} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.jumlah}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => tambah(item.makanan)}>
                  <Ionicons name="add" size={18} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.hapusBtn} onPress={() => hapus(item.makanan.id)}>
                  <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Ringkasan + checkout */}
      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <Text style={styles.totalLabel}>Total ({totalItem} item)</Text>
          <Text style={styles.totalNilai}>{formatRupiah(totalHarga)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout')}>
          <Text style={styles.checkoutText}>Checkout Sekarang</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  center: { justifyContent: 'center', alignItems: 'center', padding: 24 },
  kosongJudul: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginTop: 16 },
  kosongSub: { color: COLORS.muted, marginTop: 6 },
  btnKatalog: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
    marginTop: 20,
  },
  btnKatalogText: { color: '#fff', fontWeight: 'bold' },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: { width: 90, height: 90, borderRadius: 10, backgroundColor: COLORS.border },
  info: { flex: 1, marginLeft: 12 },
  nama: { fontWeight: 'bold', fontSize: 15, color: COLORS.text },
  harga: { color: COLORS.muted, fontSize: 13, marginTop: 2 },
  subtotal: { color: COLORS.primary, fontWeight: '600', fontSize: 13, marginTop: 4 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: { marginHorizontal: 14, fontWeight: 'bold', fontSize: 15, color: COLORS.text },
  hapusBtn: {
    marginLeft: 'auto',
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { color: COLORS.muted, fontSize: 15 },
  totalNilai: { color: COLORS.text, fontWeight: 'bold', fontSize: 18 },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
