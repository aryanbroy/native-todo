import { ThemeProvider } from '@/hooks/useTheme';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import '@/global.css';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider>
        <ConvexProvider client={convex}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ConvexProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
