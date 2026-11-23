import { ImageSourcePropType } from 'react-native';

export type Kategori = 'Makanan Utama' | 'Minuman' | 'Snack';

export interface Makanan {
  id: string;
  nama: string;
  kategori: Kategori;
  harga: number;
  deskripsi: string;
  gambar: ImageSourcePropType;
  rekomendasi?: boolean;
}

export interface ItemKeranjang {
  makanan: Makanan;
  jumlah: number;
}
