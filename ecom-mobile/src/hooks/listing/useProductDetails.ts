import { useState, useEffect } from "react";
import { Product } from "../../models/ProductModel";
import { Endpoints } from "@/constants/Endpoints";
import { fetchWrapper } from "@/services/fetchWrapper";

export const useProductDetails = (categoryId: string) => {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetchWrapper.get(
          `${Endpoints.PRODUCTS}/${categoryId}`
        );

        setProduct(response);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
        setProduct(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  return {
    product,
    isLoading,
    error,
  };
};
