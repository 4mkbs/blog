import { useState, useEffect } from "react";
import { tagsAPI } from "../services/api";

export function useTags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tagsAPI.getAll();
        setTags(res.data || []);
      } catch {
        setTags([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { tags, loading };
}

export function useTagSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    const search = async () => {
      setLoading(true);
      try {
        const res = await tagsAPI.search(query);
        setResults(res.data || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(search, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return { results, loading };
}
