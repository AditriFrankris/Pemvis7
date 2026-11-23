import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cariMakanan } from '../../src/data/makanan';
import { useCart } from '../../src/context/CartContext';
import { COLORS, formatRupiah } from '../../src/theme';

export default function DetailScreen() {
  // Mengambil parameter "id" yang dikirim dari Beranda / Katalog
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tambah } = useCart();

  const makanan = cariMakanan(id);

  if (!makanan) {
    return (
      <SafeAreaView style={[styles.safe, styles.center]}>
        <Text style={styles.notFound}>Makanan tidak ditemukan.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.kembaliLink}>Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const tambahKeKeranjang = () => {
    tambah(makanan);
    router.push('/keranjang');
  };

  const pesanSekarang = () => {
    tambah(makanan);
    router.push('/checkout');
  };

  return (
    <View style={styles.safe}>
      <Stack.Screen options={{ title: makanan.nama }} />
      <ScrollView>
        <Image source={makanan.gambar} style={styles.image} />
        <View style={styles.body}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{makanan.kategori}</Text>
          </View>
          <Text style={styles.nama}>{makanan.nama}</Text>
          <Text style={styles.harga}>{formatRupiah(makanan.harga)}</Text>

          <Text style={styles.subJudul}>Deskripsi</Text>
          <Text style={styles.deskripsi}>{makanan.deskripsi}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>20-30 mnt</Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="star" size={20} color="#f59f00" />
              <Text style={styles.infoText}>4.8 / 5.0</Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="flame-outline" size={20} color={COLORS.danger} />
              <Text style={styles.infoText}>Favorit</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Tombol aksi */}
      <SafeAreaView edges={['bottom']} style={styles.actionBar}>
        <TouchableOpacity style={styles.btnOutline} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecondary} onPress={tambahKeKeranjang}>
          <Ionicons name="cart-outline" size={18} color={COLORS.primary} />
          <Text style={styles.btnSecondaryText}>Keranjang</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={pesanSekarang}>
          <Text style={styles.btnPrimaryText}>Pesan Sekarang</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  center: { justifyContent: 'center', alignItems: 'center' },
  notFound: { color: COLORS.text, fontSize: 16 },
  kembaliLink: { color: COLORS.primary, marginTop: 10, fontWeight: '600' },
  image: { width: '100%', height: 260, backgroundColor: COLORS.border },
  body: { padding: 20 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.chip,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  badgeText: { color: COLORS.primaryDark, fontWeight: '600', fontSize: 12 },
  nama: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  harga: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, marginTop: 8 },
  subJudul: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginTop: 20, marginBottom: 6 },
  deskripsi: { color: COLORS.muted, lineHeight: 22, fontSize: 14 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  infoBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 4,
  },
  infoText: { fontSize: 12, color: COLORS.text, fontWeight: '600' },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  btnOutline: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  btnSecondaryText: { color: COLORS.primary, fontWeight: 'bold' },
  btnPrimary: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimaryText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
