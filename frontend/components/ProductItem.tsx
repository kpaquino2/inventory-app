import { Product } from "@/types/product";
import { Image, Text, View } from "react-native";

export default function ProductItem({ item }: { item: Product }) {
  return (
    <View className="flex-row" style={{ padding: 12 }}>
      <Image
        source={require("../assets/images/placeholder.jpg")}
        style={{
          width: 48,
          height: 48,
          resizeMode: "contain",
          marginTop: 8,
          marginEnd: 12,
        }}
      />

      <View className="flex-1" style={{ marginEnd: 12 }}>
        <Text className="font-bold">{item.name}</Text>
        <Text className="text-gray-500">{item.desc}</Text>
      </View>
      <View className="h-full justify-center">
        <Text>{`₱${item.price}`}</Text>
      </View>
    </View>
  );
}
