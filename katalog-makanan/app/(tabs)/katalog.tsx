import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DAFTAR_MAKANAN, KATEGORI } from '../../src/data/makanan';
import { Kategori, Makanan } from '../../src/types';
import { COLORS, formatRupiah } from '../../src/theme';

export default function KatalogScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ kategori?: string }>();
  const [query, setQuery] = useState('');
  const [kategoriAktif, setKategoriAktif] = useState<'Semua' | Kategori>(
    (params.kategori as Kategori) || 'Semua'
  );

  const hasil = useMemo(() => {
    return DAFTAR_MAKANAN.filter((m) => {
      const cocokKategori = kategoriAktif === 'Semua' || m.kategori === kategoriAktif;
      const cocokNama = m.nama.toLowerCase().includes(query.trim().toLowerCase());
      return cocokKategori && cocokNama;
    });
  }, [query, kategoriAktif]);

  const renderItem = ({ item }: { item: Makanan }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/detail/${item.id}`)}>
      <Image source={item.gambar} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.nama} numberOfLines={1}>
          {item.nama}
        </Text>
        <Text style={styles.kategori}>{item.kategori}</Text>
        <Text style={styles.deskripsi} numberOfLines={2}>
          {item.deskripsi}
        </Text>
        <Text style={styles.harga}>{formatRupiah(item.harga)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      {/* Search bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={COLORS.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari makanan..."
          placeholderTextColor={COLORS.muted}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={COLORS.muted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter kategori */}
      <FlatList
        data={KATEGORI}
        horizontal
        keyExtractor={(k) => k}
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => {
          const aktif = item === kategoriAktif;
          return (
            <TouchableOpacity
              style={[styles.filterChip, aktif && styles.filterChipAktif]}
              onPress={() => setKategoriAktif(item)}
            >
              <Text style={[styles.filterText, aktif && styles.filterTextAktif]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Daftar makanan */}
      <FlatList
        data={hasil}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingTop: 4 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="sad-outline" size={40} color={COLORS.muted} />
            <Text style={styles.emptyText}>Makanan tidak ditemukan</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: { flex: 1, paddingVertical: 12, marginLeft: 8, color: COLORS.text },
  filterList: { maxHeight: 44, marginBottom: 4 },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipAktif: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  filterTextAktif: { color: '#fff' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: { width: 84, height: 84, borderRadius: 10, backgroundColor: COLORS.border },
  body: { flex: 1, marginLeft: 12 },
  nama: { fontWeight: 'bold', fontSize: 15, color: COLORS.text },
  kategori: { color: COLORS.primary, fontSize: 12, marginTop: 2, fontWeight: '600' },
  deskripsi: { color: COLORS.muted, fontSize: 12, marginTop: 4, lineHeight: 16 },
  harga: { color: COLORS.text, fontWeight: 'bold', marginTop: 6 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: COLORS.muted, marginTop: 10 },
});
