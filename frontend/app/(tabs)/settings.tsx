import { useSettingsStore } from "@/stores/settingsStore";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const settingsStore = useSettingsStore();
  const [limit, setLimit] = useState(`${settingsStore.limit}`);
  const [error, setError] = useState<string | null>(null);

  const handleLimitChange = (text: string) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, "");

    // Convert to number and validate
    const num = parseInt(numericValue || "0", 10);

    if (numericValue === "") {
      setLimit("");
      setError(null);
    } else if (num < 1) {
      setLimit(numericValue);
      setError("Minimum value is 1");
    } else {
      setLimit(numericValue);
      setError(null);
      // settingsStore.setLimit(num); // Update store only when valid
    }
  };

  return (
    <View className="mt-20 mx-12">
      <Text className="mb-2 text-lg font-bold">Records per page</Text>

      <TextInput
        placeholder="records per page"
        className="border-[1px] px-4 rounded mb-4"
        onChangeText={handleLimitChange}
        keyboardType="numeric"
        maxLength={3}
        value={limit}
      />
      {error && (
        <View className="bg-red-100 p-3 rounded mb-4 border border-red-400">
          <Text className="text-red-700 text-center">{error}</Text>
        </View>
      )}
      <TouchableOpacity
        className="disabled:opacity-50 bg-black p-3 rounded mb-2 items-center justify-center"
        disabled={!limit || !!error || parseInt(limit) === settingsStore.limit}
        onPress={() => settingsStore.setLimit(parseInt(limit))}
      >
        <Text className="text-white font-bold text-lg">Save</Text>
      </TouchableOpacity>
    </View>
  );
}
