import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
export function useLoading() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let base_url = "http://localhost:5000";
  if (process.env.NODE_ENV === "production"){
    base_url = process.env.REACT_APP_API_URL;
  } 
  else if (process.env.NODE_ENV === "development"){
    base_url = base_url;
  }
  const api = axios.create({
    withCredentials:true,
    baseURL: base_url,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(
          `${base_url}/api/refresh`,
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
