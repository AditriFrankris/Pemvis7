import React, { createContext, useContext, useMemo, useState } from 'react';
import { ItemKeranjang, Makanan } from '../types';

interface CartContextType {
  items: ItemKeranjang[];
  tambah: (makanan: Makanan) => void;
  kurang: (id: string) => void;
  hapus: (id: string) => void;
  kosongkan: () => void;
  totalItem: number;
  totalHarga: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemKeranjang[]>([]);

  const tambah = (makanan: Makanan) => {
    setItems((prev) => {
      const ada = prev.find((i) => i.makanan.id === makanan.id);
      if (ada) {
        return prev.map((i) =>
          i.makanan.id === makanan.id ? { ...i, jumlah: i.jumlah + 1 } : i
        );
      }
      return [...prev, { makanan, jumlah: 1 }];
    });
  };

  const kurang = (id: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.makanan.id === id ? { ...i, jumlah: i.jumlah - 1 } : i))
        .filter((i) => i.jumlah > 0)
    );
  };

  const hapus = (id: string) => {
    setItems((prev) => prev.filter((i) => i.makanan.id !== id));
  };

  const kosongkan = () => setItems([]);

  const totalItem = useMemo(
    () => items.reduce((total, i) => total + i.jumlah, 0),
    [items]
  );

  const totalHarga = useMemo(
    () => items.reduce((total, i) => total + i.jumlah * i.makanan.harga, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, tambah, kurang, hapus, kosongkan, totalItem, totalHarga }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart harus digunakan di dalam CartProvider');
  }
  return ctx;
}
