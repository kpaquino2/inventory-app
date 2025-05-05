import api from "@/api/axios";
import CategoryItem from "@/components/CategoryItem";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function Index() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    api
      .get("/category")
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>
      {loading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => <CategoryItem item={item} />}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          ListFooterComponent={() => <View className="mb-4" />}
          className="p-4"
        />
      )}
    </View>
  );
}
