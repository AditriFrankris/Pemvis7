import { useRouter } from 'expo-router';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DAFTAR_MAKANAN } from '../../src/data/makanan';
import { Makanan } from '../../src/types';
import { COLORS, formatRupiah } from '../../src/theme';

const KATEGORI = ['Makanan Utama', 'Minuman', 'Snack'] as const;

export default function BerandaScreen() {
  const router = useRouter();
  const rekomendasi = DAFTAR_MAKANAN.filter((m) => m.rekomendasi);

  const bukaDetail = (id: string) => router.push(`/detail/${id}`);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header aplikasi */}
        <View style={styles.header}>
          <Text style={styles.appName}>🍽️ Katalog Rasa</Text>
          <Text style={styles.appInfo}>
            Pesan makanan favoritmu dengan mudah. Temukan menu terbaik, lihat detail, lalu checkout
            dalam hitungan detik.
          </Text>
        </View>

        {/* Kategori */}
        <Text style={styles.sectionTitle}>Kategori</Text>
        <View style={styles.kategoriRow}>
          {KATEGORI.map((k) => (
            <TouchableOpacity
              key={k}
              style={styles.kategoriChip}
              onPress={() => router.push(`/katalog?kategori=${encodeURIComponent(k)}`)}
            >
              <Text style={styles.kategoriText}>{k}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rekomendasi */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Rekomendasi Untukmu</Text>
          <TouchableOpacity onPress={() => router.push('/katalog')}>
            <Text style={styles.lihatSemua}>Lihat semua</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={rekomendasi}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
          renderItem={({ item }: { item: Makanan }) => (
            <TouchableOpacity style={styles.cardH} onPress={() => bukaDetail(item.id)}>
              <Image source={item.gambar} style={styles.cardHImage} />
              <View style={styles.cardHBody}>
                <Text style={styles.cardHNama} numberOfLines={1}>
                  {item.nama}
                </Text>
                <Text style={styles.cardHKategori}>{item.kategori}</Text>
                <Text style={styles.cardHHarga}>{formatRupiah(item.harga)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Menu lainnya (grid vertikal sederhana) */}
        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Menu Pilihan</Text>
        <View style={styles.grid}>
          {DAFTAR_MAKANAN.slice(0, 6).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.cardV}
              onPress={() => bukaDetail(item.id)}
            >
              <Image source={item.gambar} style={styles.cardVImage} />
              <Text style={styles.cardVNama} numberOfLines={1}>
                {item.nama}
              </Text>
              <Text style={styles.cardVHarga}>{formatRupiah(item.harga)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: { backgroundColor: COLORS.primary, padding: 20, paddingTop: 24 },
  appName: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  appInfo: { color: '#ffe8d9', marginTop: 8, lineHeight: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 16,
  },
  lihatSemua: { color: COLORS.primary, fontWeight: '600', marginTop: 8 },
  kategoriRow: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12 },
  kategoriChip: {
    backgroundColor: COLORS.chip,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ffd8b5',
  },
  kategoriText: { color: COLORS.primaryDark, fontWeight: '600' },
  cardH: {
    width: 160,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHImage: { width: '100%', height: 110, backgroundColor: COLORS.border },
  cardHBody: { padding: 10 },
  cardHNama: { fontWeight: 'bold', color: COLORS.text, fontSize: 14 },
  cardHKategori: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  cardHHarga: { color: COLORS.primary, fontWeight: 'bold', marginTop: 6 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  cardV: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingBottom: 10,
  },
  cardVImage: { width: '100%', height: 100, backgroundColor: COLORS.border },
  cardVNama: { fontWeight: 'bold', color: COLORS.text, marginTop: 8, marginHorizontal: 10 },
  cardVHarga: { color: COLORS.primary, fontWeight: 'bold', marginHorizontal: 10, marginTop: 4 },
});
