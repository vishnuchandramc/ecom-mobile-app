import { useState, useEffect, useCallback } from "react";
import { Endpoints } from "@/constants/Endpoints";
import { fetchWrapper } from "@/services/fetchWrapper";
import { Product } from "@/models/ProductModel";

const LIMIT = 10;

interface ProductListingParams {
  categoryId?: number;
  keyword?: string;
}

export const useProductListing = (params?: ProductListingParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchProducts = useCallback(
    async (currentOffset: number, append = false) => {
      try {
        const categoryFilter = params?.categoryId
          ? `&categoryId=${params.categoryId}`
          : "";
        const keywordFilter = params?.keyword ? `&title=${params.keyword}` : "";

        const response = await fetchWrapper.get(
          `${Endpoints.PRODUCTS}?offset=${currentOffset}&limit=${LIMIT}${categoryFilter}${keywordFilter}`
        );

        if (response.length < LIMIT) {
          setHasMore(false);
        }

        setProducts((prev) => (append ? [...prev, ...response] : response));
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
        if (!append) {
          setProducts([]);
        }
      }
    },
    [params?.categoryId, params?.keyword]
  );

  useEffect(() => {
    setIsLoading(true);
    // Call fetchProducts with initial offset of 0 to load first page
    // When the fetch completes (whether successful or failed), set loading to false
    fetchProducts(0).finally(() => setIsLoading(false));
  }, [params?.categoryId, params?.keyword]);

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextOffset = offset + LIMIT;
    setOffset(nextOffset);

    await fetchProducts(nextOffset, true);
    setIsLoadingMore(false);
  };

  const refresh = async () => {
    setIsRefreshing(true);
    setOffset(0);
    setHasMore(true);
    await fetchProducts(0);
    setIsRefreshing(false);
  };

  return {
    products,
    isLoading,
    error,
    loadMore,
    isLoadingMore,
    refresh,
    isRefreshing,
  };
};
