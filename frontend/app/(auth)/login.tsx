import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const router = useRouter();
  return (
    <View className="mx-8 flex-1 justify-center">
      <Text className="text-4xl font-bold">Welcome back...</Text>
      <Text className="text-2xl mb-4">Sign in to continue</Text>
      <TextInput
        placeholder="Username"
        className="border-[1px] px-4 rounded mb-4"
      />
      <TextInput
        placeholder="Password"
        className="border-[1px] px-4 rounded mb-4"
        secureTextEntry
      />
      <TouchableOpacity className="bg-black p-3 rounded mb-2">
        <Text className="text-white font-bold text-center text-lg">Log In</Text>
      </TouchableOpacity>
      <View className="flex-row justify-center">
        <Text>Don&apos;t have an account?</Text>
        <TouchableOpacity
          onPress={() => router.replace("/register")}
          className="ml-1"
        >
          <Text className=" underline text-cyan-700">Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
