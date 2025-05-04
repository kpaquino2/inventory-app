import { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Pagination({
  page,
  setPage,
  hasMore,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
}) {
  return (
    <View className="justify-center flex-row mb-4">
      {page > 1 && (
        <TouchableOpacity
          className="bg-gray-300 rounded"
          style={{
            paddingVertical: 4,
            paddingHorizontal: 8,
            backgroundColor: "#d1d5db",
          }}
          onPress={() => setPage(page - 1)}
        >
          <Text className="text-lg">{page - 1}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        className="rounded"
        style={{
          marginHorizontal: 8,
          paddingVertical: 4,
          paddingHorizontal: 8,
          backgroundColor: "black",
        }}
        disabled
      >
        <Text className="text-lg text-white">{page}</Text>
      </TouchableOpacity>
      {hasMore && (
        <TouchableOpacity
          className="bg-gray-300 rounded"
          style={{
            paddingVertical: 4,
            paddingHorizontal: 8,
            backgroundColor: "#d1d5db",
          }}
          onPress={() => setPage(page + 1)}
        >
          <Text className="text-lg">{page + 1}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
