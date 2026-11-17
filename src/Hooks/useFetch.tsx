import { useState, useCallback } from "react";
const useFetch = () => {
  // @CLAUDE: adicionei os tipos. Sem eles, useState(null) só aceita null para sempre.
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // @CLAUDE: "request" agora RETORNA { response, json }. Antes retornava void,
  // e por isso "const { response } = await request(...)" dava erro no LoginCreate.
  const request = useCallback(async (url: string, options: RequestInit) => {
    let response: Response | null = null;
    let json: unknown = null;
    setLoading(true);
    try {
      setError(null);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) {
        const message = (json as { message?: string })?.message;
        throw new Error(message || "Network response was not ok");
      }
    } catch (err) {
      // @CLAUDE: no TS, "err" é unknown; é preciso checar se é Error antes de usar .message
      json = null;
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setData(json);
      setLoading(false);
    }
    return { response, json };
  }, []);

  return { data, error, loading, request };
};

export default useFetch;
