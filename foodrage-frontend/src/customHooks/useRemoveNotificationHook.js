import { useState, useContext } from "react";
import axios from "axios";
import { GlobalContex } from "../context/contex";

function useRemoveNotificationHook() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { TOKEN } = useContext(GlobalContex);
  const URL = process.env.REACT_APP_URL;
  async function removeNotification(notificationId) {
    setLoading(true);
    try {
      const response = await axios({
        method: "delete",
        url: URL + "/api/notification/" + notificationId,
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + TOKEN.token
        }
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.respnose.data.message);
    }
  }
  return { error, loading, data, removeNotification };
}

export default useRemoveNotificationHook;
