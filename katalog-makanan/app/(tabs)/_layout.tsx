import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';
import { COLORS } from '../../src/theme';

export default function TabLayout() {
  const { totalItem } = useCart();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#adb5bd',
        tabBarStyle: { height: 58, paddingBottom: 6, paddingTop: 6 },
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="katalog"
        options={{
          title: 'Katalog',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="keranjang"
        options={{
          title: 'Keranjang',
          tabBarBadge: totalItem > 0 ? totalItem : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
