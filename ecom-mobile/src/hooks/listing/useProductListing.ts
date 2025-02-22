import { useState, useEffect } from "react";
import { Category } from "../../models/CategoriesModel";
import { Endpoints } from "@/constants/Endpoints";
import { fetchWrapper } from "@/services/fetchWrapper";

export const useProductListing = () => {
  const [products, setProducts] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetchWrapper.get(Endpoints.PRODUCTS);

        setProducts(response);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
  };
};
