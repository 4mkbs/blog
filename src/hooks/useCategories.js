import { useState, useEffect } from "react";
import { categoriesAPI } from "../services/api";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await categoriesAPI.getAll();
        setCategories(res.data || []);
      } catch {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { categories, loading };
}
