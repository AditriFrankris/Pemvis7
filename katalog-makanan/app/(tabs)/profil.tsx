import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../src/theme';

const MENU = [
  { icon: 'receipt-outline', label: 'Riwayat Pesanan' },
  { icon: 'location-outline', label: 'Alamat Pengiriman' },
  { icon: 'card-outline', label: 'Metode Pembayaran' },
  { icon: 'notifications-outline', label: 'Notifikasi' },
  { icon: 'help-circle-outline', label: 'Pusat Bantuan' },
  { icon: 'information-circle-outline', label: 'Tentang Aplikasi' },
] as const;

export default function ProfilScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView>
        {/* Kartu profil */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AF</Text>
          </View>
          <Text style={styles.nama}>Aditri Frankris</Text>
          <Text style={styles.email}>aditrifrankris@email.com</Text>
          <Text style={styles.bio}>Pecinta kuliner nusantara. Member sejak 2024.</Text>
        </View>

        {/* Statistik sederhana */}
        <View style={styles.statRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNilai}>12</Text>
            <Text style={styles.statLabel}>Pesanan</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNilai}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNilai}>320</Text>
            <Text style={styles.statLabel}>Poin</Text>
          </View>
        </View>

        {/* Menu pengaturan */}
        <Text style={styles.sectionTitle}>Pengaturan</Text>
        <View style={styles.menuCard}>
          {MENU.map((m, idx) => (
            <TouchableOpacity
              key={m.label}
              style={[styles.menuItem, idx < MENU.length - 1 && styles.menuBorder]}
            >
              <Ionicons name={m.icon} size={20} color={COLORS.primary} />
              <Text style={styles.menuLabel}>{m.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>

        <Text style={styles.versi}>Katalog Rasa v1.0.0</Text>
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: { backgroundColor: COLORS.primary, alignItems: 'center', padding: 24 },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary },
  nama: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginTop: 12 },
  email: { color: '#ffe8d9', marginTop: 4 },
  bio: { color: '#ffe8d9', marginTop: 8, textAlign: 'center', fontSize: 13 },
  statRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    margin: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  statNilai: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  statLabel: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  menuCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuLabel: { flex: 1, color: COLORS.text, fontSize: 15 },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    margin: 16,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  logoutText: { color: COLORS.danger, fontWeight: 'bold', fontSize: 15 },
  versi: { textAlign: 'center', color: COLORS.muted, fontSize: 12 },
});
