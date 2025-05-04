import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function SearchHeader({
  back = false,
  initial = "",
}: {
  back?: boolean;
  initial?: string;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initial);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (back) router.replace(`/search?q=${encodeURIComponent(searchQuery)}`);
      else router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <View className="flex-row items-center bg-white px-4 py-2 ">
      {back && (
        <TouchableOpacity className="px-3" onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={20} color="gray" />
        </TouchableOpacity>
      )}
      <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
        <TextInput
          placeholder="Search products..."
          className="flex-1 text-base"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
