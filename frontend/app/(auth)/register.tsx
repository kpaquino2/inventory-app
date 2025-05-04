import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
  const router = useRouter();
  return (
    <View className="mx-8 flex-1 justify-center">
      <Text className="text-4xl font-bold">Register</Text>
      <Text className="text-2xl mb-4">Create an account</Text>
      <TextInput
        placeholder="Name"
        className="border-[1px] px-4 rounded mb-4"
      />
      <TextInput
        placeholder="Username"
        className="border-[1px] px-4 rounded mb-4"
      />
      <TextInput
        placeholder="Password"
        className="border-[1px] px-4 rounded mb-4"
      />
      <TouchableOpacity className="bg-black p-3 rounded mb-2">
        <Text className="text-white font-bold text-center text-lg">Submit</Text>
      </TouchableOpacity>
      <View className="flex-row justify-center">
        <Text>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => router.replace("/login")}
          className="ml-1"
        >
          <Text className=" underline text-cyan-700">Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
