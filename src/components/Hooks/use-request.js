import { useState, useCallback } from "react";
const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (configReq, getReqData) => {
    console.log(configReq.body);
    console.log(configReq.url);
    console.log(configReq.headers);
    console.log(configReq.method);

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(configReq.url, {
        method: configReq.method ? configReq.method : "GET",
        headers: configReq.headers ? configReq.headers : {},
        body: JSON.stringify(configReq.body)
          ? JSON.stringify(configReq.body)
          : null,
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      console.log(data);
      getReqData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    request,
  };
};

export default useRequest;
