import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { GlobalContex } from "../context/contex";
function useFetchData(url = "") {
  const { TOKEN } = useContext(GlobalContex);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (url) fetchData(url);
  }, []);

  async function fetchData(url) {
    setLoading(true);
    try {
      const response = await axios({
        methode: "get",
        url: url,
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + TOKEN.token
        }
      });
      if (response.data.success) {
        setData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }
  return { error, loading, data, fetchData };
}

export default useFetchData;
