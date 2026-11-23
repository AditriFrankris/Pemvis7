import { Kategori, Makanan } from '../types';

export const DAFTAR_MAKANAN: Makanan[] = [
  {
    id: '1',
    nama: 'Nasi Goreng Spesial',
    kategori: 'Makanan Utama',
    harga: 25000,
    deskripsi:
      'Nasi goreng dengan telur, ayam suwir, bakso, dan sayuran. Disajikan dengan kerupuk dan acar segar.',
    gambar: require('../../assets/images/nasi-goreng.jpg'),
    rekomendasi: true,
  },
  {
    id: '2',
    nama: 'Mie Ayam Bakso',
    kategori: 'Makanan Utama',
    harga: 20000,
    deskripsi:
      'Mie kenyal dengan topping ayam kecap, bakso sapi, sawi hijau, dan kuah kaldu gurih.',
    gambar: require('../../assets/images/mie-ayam.jpg'),
    rekomendasi: true,
  },
  {
    id: '3',
    nama: 'Ayam Geprek Sambal',
    kategori: 'Makanan Utama',
    harga: 22000,
    deskripsi:
      'Ayam goreng crispy yang digeprek dengan sambal bawang pedas. Dilengkapi nasi hangat dan lalapan.',
    gambar: require('../../assets/images/ayam-geprek.png'),
    rekomendasi: true,
  },
  {
    id: '4',
    nama: 'Sate Ayam Madura',
    kategori: 'Makanan Utama',
    harga: 28000,
    deskripsi:
      'Sepuluh tusuk sate ayam dengan bumbu kacang khas Madura, lontong, dan taburan bawang goreng.',
    gambar: require('../../assets/images/sate-ayam.jpg'),
    rekomendasi: true,
  },
  {
    id: '5',
    nama: 'Rendang Daging Sapi',
    kategori: 'Makanan Utama',
    harga: 35000,
    deskripsi:
      'Daging sapi empuk dimasak lama dengan santan dan rempah Padang hingga bumbu meresap sempurna.',
    gambar: require('../../assets/images/rendang.jpg'),
    rekomendasi: true,
  },
  {
    id: '6',
    nama: 'Es Teh Manis',
    kategori: 'Minuman',
    harga: 5000,
    deskripsi: 'Teh hitam segar dengan gula dan es batu. Minuman pendamping yang pas untuk semua menu.',
    gambar: require('../../assets/images/es-teh.jpg'),
  },
  {
    id: '7',
    nama: 'Es Jeruk Segar',
    kategori: 'Minuman',
    harga: 8000,
    deskripsi: 'Perasan jeruk peras asli tanpa pemanis buatan, disajikan dingin dengan es batu.',
    gambar: require('../../assets/images/es-jeruk.jpg'),
    rekomendasi: true,
  },
  {
    id: '8',
    nama: 'Kopi Susu Gula Aren',
    kategori: 'Minuman',
    harga: 18000,
    deskripsi: 'Espresso dengan susu segar dan gula aren cair. Nikmat diminum panas maupun dingin.',
    gambar: require('../../assets/images/kopi-susu.jpg'),
    rekomendasi: true,
  },
  {
    id: '9',
    nama: 'Jus Alpukat',
    kategori: 'Minuman',
    harga: 15000,
    deskripsi: 'Alpukat matang diblender halus dengan susu dan topping cokelat. Creamy dan mengenyangkan.',
    gambar: require('../../assets/images/jus-alpukat.jpg'),
  },
  {
    id: '10',
    nama: 'Kentang Goreng',
    kategori: 'Snack',
    harga: 15000,
    deskripsi: 'Kentang goreng renyah di luar lembut di dalam, ditaburi bumbu dan saus sambal mayo.',
    gambar: require('../../assets/images/kentang-goreng.jpg'),
    rekomendasi: true,
  },
  {
    id: '11',
    nama: 'Pisang Goreng Keju',
    kategori: 'Snack',
    harga: 12000,
    deskripsi: 'Pisang goreng tepung crispy dengan parutan keju dan susu kental manis di atasnya.',
    gambar: require('../../assets/images/pisang-goreng.jpg'),
  },
  {
    id: '12',
    nama: 'Dimsum Ayam',
    kategori: 'Snack',
    harga: 20000,
    deskripsi: 'Empat potong dimsum ayam udang kukus lembut, disajikan dengan saus sambal spesial.',
    gambar: require('../../assets/images/dimsum.jpg'),
    rekomendasi: true,
  },
];

export const KATEGORI: ('Semua' | Kategori)[] = [
  'Semua',
  'Makanan Utama',
  'Minuman',
  'Snack',
];

export function cariMakanan(id: string): Makanan | undefined {
  return DAFTAR_MAKANAN.find((m) => m.id === id);
}
