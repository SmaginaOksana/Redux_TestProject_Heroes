import { useCallback } from "react";

export const useHttp = () => {
  // const [process, setProcess] = useState('waiting'); // (не мое)

  //   const request = useCallback(
  const request = async (
    url,
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    // setProcess('loading'); // (не мое)

    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      // setProcess('error'); // (не мое)
      throw e;
    }
  };
  //      []
  //   );

  // const clearError = useCallback(() => { // (не мое)
  // setProcess('loading');
  // }, []);

  return {
    request,
    // clearError, // (не мое)
    // process, // (не мое)
    // setProcess // (не мое)
  };
};
