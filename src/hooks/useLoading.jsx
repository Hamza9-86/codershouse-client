import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
export function useLoading() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/refresh`,
          {
            withCredentials: true,
          }
        );
        dispatch(setAuth(data));
        setLoading(false);
      } catch (err) {
        console.log(`useloading error`,err);
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
}
