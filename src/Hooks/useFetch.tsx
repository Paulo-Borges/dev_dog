import { useState, useCallback } from "react";
const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url: string, options: RequestInit) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setData(json);
      setError(null);
      if (response.ok === false)
        throw new Error(json.message || "Network response was not ok");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
};

export default useFetch;
