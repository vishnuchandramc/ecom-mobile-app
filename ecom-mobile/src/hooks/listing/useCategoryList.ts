import { useState, useEffect } from "react";
import { Category } from "../../models/CategoriesModel";
import { Endpoints } from "@/constants/Endpoints";
import { fetchWrapper } from "@/services/fetchWrapper";

export const useCategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetchWrapper.get(Endpoints.CATEGORIES);

        setCategories(response);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
  };
};
