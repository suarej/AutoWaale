import { Stack } from "expo-router/stack";
import { AppProvider } from "../context";

export default function Layout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AppProvider>
  );
}
