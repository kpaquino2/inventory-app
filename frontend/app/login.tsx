import api from "@/api/axios";
import { useAuthStore } from "@/stores/authStore";
import { Redirect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const authStore = useAuthStore();

  const session = authStore.user;

  if (session) return <Redirect href="/(tabs)" />;

  const handleLogin = async () => {
    if (!username || !password || !(isLogin || name)) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response = await api.post(
        isLogin ? "/auth/login" : "/auth/register",
        {
          name: name,
          username: username,
          password: password,
        }
      );
      if (!isLogin) {
        response = await api.post("/auth/login", {
          username: username,
          password: password,
        });
      }
      await SecureStore.setItem("access-token", response.data.access_token);
      await authStore.setAuth(response.data.user);
      router.replace("/(tabs)");
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiError = (error: any) => {
    console.error("Login error:", error);
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
        case 404:
          setError("Invalid username or password");
          break;
        case 400:
          setError("Invalid request format");
          break;
        case 409:
          setError("Username already taken");
          break;
        case 500:
          setError("Server error - please try later");
          break;
        default:
          setError("Login failed - please try again");
      }
    } else if (error.request) {
      // Request was made but no response
      setError("Network error - check your connection");
    } else {
      // Other errors
      setError("An unexpected error occurred");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-8 flex-1 justify-center ">
          <Text className="text-4xl font-bold">
            {isLogin ? "Welcome back!" : "Register"}
          </Text>
          <Text className="text-2xl mb-4">
            {isLogin ? "Sign in to continue" : "Create an account"}
          </Text>
          {isLogin || (
            <TextInput
              placeholder="Name"
              className="border-[1px] px-4 rounded mb-4"
              onChangeText={(newText) => setName(newText)}
            />
          )}
          <TextInput
            placeholder={"Username" + (!isLogin ? " (at least 8 chars)" : "")}
            className="border-[1px] px-4 rounded mb-4"
            onChangeText={(newText) => setUsername(newText)}
          />
          <TextInput
            placeholder={"Password" + (!isLogin ? " (at least 8 chars)" : "")}
            className="border-[1px] px-4 rounded mb-4"
            onChangeText={(newText) => setPassword(newText)}
            secureTextEntry
          />
          {error && (
            <View className="bg-red-100 p-3 rounded mb-4 border border-red-400">
              <Text className="text-red-700 text-center">{error}</Text>
            </View>
          )}
          <TouchableOpacity
            className="bg-black p-3 rounded mb-2 items-center justify-center"
            onPress={handleLogin}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">
                {isLogin ? "Log In" : "Submit"}
              </Text>
            )}
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text>
              {isLogin
                ? "Don&apos;t have an account?"
                : "Already have an account?"}{" "}
            </Text>
            <TouchableOpacity
              onPress={() => setIsLogin(!isLogin)}
              className="ml-1"
            >
              <Text className=" underline text-cyan-700">
                {isLogin ? "Create account" : "Log in"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
