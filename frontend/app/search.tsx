import api from "@/api/axios";
import Pagination from "@/components/Pagination";
import ProductItem from "@/components/ProductItem";
import SearchHeader from "@/components/SearchHeader";
import { Product } from "@/types/product";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchResults() {
  const { q } = useLocalSearchParams();
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!q) return;

    setLoading(true);
    setHasMore(false);

    api
      .get(`/product?search=${q}&page=${page}`)
      .then((res) => {
        setResults(res.data);
        api.get(`/product?search=${q}&page=${page + 1}`).then((res) => {
          setHasMore(res.data.length > 0);
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [q, page]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <SearchHeader back initial={typeof q === "string" ? q : q[0]} />
      {loading ? (
        <View className="flex-1 justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => <ProductItem item={item} />}
          ListFooterComponent={() => (
            <Pagination page={page} setPage={setPage} hasMore={hasMore} />
          )}
        />
      ) : (
        <Text className="p-4 text-gray-500">
          No results found for &quot;{q}&quot;
        </Text>
      )}
    </SafeAreaView>
  );
}
