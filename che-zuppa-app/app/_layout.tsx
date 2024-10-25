
import { Stack } from 'expo-router';
import 'react-native-reanimated';


export default function RootLayout() {

  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="recipeDetail" options={{ headerShown: false }} />
      </Stack>
  );
}
