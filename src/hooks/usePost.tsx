import { useState } from "react";
import showToast from "../utils/showToast";
import Cookies from "js-cookie";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const postData = async (url: `/${string}`, body: any) => {
    setLoading(true);
    try {
      const usertoken = Cookies.get("user-token");
      console.log(`${import.meta.env.VITE_BASE_URL}${url}`)
      const resp = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
        },
        body: body,
      });
      const result = (await resp.json());

      if (!resp.ok) {
        console.log(result);
        showToast.error(result.msg);
        throw new Error(result.msg)
      }
      return result;
    } catch (error) {
      if (error instanceof Error) {
        showToast.error(error.message);
        throw new Error(error.message)
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading };
};

export default usePost;
