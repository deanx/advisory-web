import { useEffect, useState } from "react";
import axios from "axios";

const useDataFetch = (url) => {
  const [data, setData] = useState([null]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, error, isLoading, refetch };
};

export default useDataFetch;