import { useState } from "react";
const useRequest = (configReq, getReqData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(configReq.url);
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
  };
  return {
    isLoading,
    error,
    request,
  };
};

export default useRequest;
