import { useAuthStore } from "@/stores/authStore";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const authStore = useAuthStore();
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={authStore.clearAuth}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
