import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const session = false;
  if (session) return <Redirect href="./(tabs)/index" />;
  return (
    <Stack screenOptions={{ animation: "fade", headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
