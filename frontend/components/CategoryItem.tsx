import { Category } from "@/types/category";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function CategoryItem({ item }: { item: Category }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/(tabs)/(home)/${item.id}`)}
      style={{
        width: "30%",
        // height: "auto",
      }}
    >
      <View
        style={{
          // width: "100%",
          aspectRatio: 1,
          // height: "100%",
        }}
      >
        <Image
          source={require("../assets/images/placeholder.jpg")}
          style={{
            width: "100%",
            // aspectRatio: 1,
            height: "100%",
          }}
          resizeMode="cover"
        />
      </View>

      <Text className="text-lg">{item.name}</Text>
    </TouchableOpacity>
  );
}
