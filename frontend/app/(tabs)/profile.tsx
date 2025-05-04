import { useAuthStore } from "@/stores/authStore";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const authStore = useAuthStore();
  return (
    <View className="flex-1 items-center mt-24">
      <Image
        source={require("@/assets/images/profile.png")}
        className="w-32 h-32 mb-4"
      />
      <Text className="text-xl font-bold mb-4">{authStore.user!.name}</Text>
      <Text className="text-xl mb-4">{authStore.user!.position}</Text>
      <Text className="text-xl mb-4">{authStore.user!.username}</Text>

      <TouchableOpacity
        onPress={authStore.clearAuth}
        className="flex-1 justify-end mb-24"
      >
        <Text className="text-white rounded bg-black font-bold px-4 py-2">
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
