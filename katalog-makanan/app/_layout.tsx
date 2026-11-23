import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from '../src/context/CartContext';
import { COLORS } from '../src/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#ffffff',
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: COLORS.bg },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="detail/[id]" options={{ title: 'Detail Makanan' }} />
          <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
          <Stack.Screen
            name="konfirmasi"
            options={{ title: 'Pesanan Berhasil', headerBackVisible: false }}
          />
        </Stack>
      </CartProvider>
    </SafeAreaProvider>
  );
}
