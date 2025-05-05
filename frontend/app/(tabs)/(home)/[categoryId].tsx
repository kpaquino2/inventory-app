import api from "@/api/axios";
import Pagination from "@/components/Pagination";
import ProductItem from "@/components/ProductItem";
import { useSettingsStore } from "@/stores/settingsStore";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CategorProducts() {
  const { categoryId } = useLocalSearchParams();
  const [category, setCategory] = useState<Category>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const router = useRouter();
  const settingsStore = useSettingsStore();

  useEffect(() => {
    setLoading(true);
    setHasMore(false);
    api.get(`/category/${categoryId}`).then((res) => setCategory(res.data));

    api
      .get(
        `/product?categoryId=${categoryId}&page=${page}&limit=${settingsStore.limit}`
      )
      .then((res) => {
        setProducts(res.data);
        api
          .get(
            `/product?categoryId=${categoryId}&page=${page + 1}&limit=${
              settingsStore.limit
            }`
          )
          .then((res) => {
            setHasMore(res.data.length > 0);
          });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryId, page, settingsStore.limit]);

  return (
    <View className="flex-1">
      {loading ? (
        <View className="flex-1 justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <FlatList
            data={products}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => <ProductItem item={item} />}
            ListHeaderComponent={() => (
              <View className="flex-row items-center mt-4 ml-4 mb-2">
                <TouchableOpacity
                  className="mr-4"
                  onPress={() => router.back()}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={32}
                    color="gray"
                  />
                </TouchableOpacity>
                <Text className="text-2xl font-bold">{category?.name}</Text>
              </View>
            )}
            ListFooterComponent={() => (
              <Pagination page={page} setPage={setPage} hasMore={hasMore} />
            )}
          />
        </>
      )}
    </View>
  );
}
