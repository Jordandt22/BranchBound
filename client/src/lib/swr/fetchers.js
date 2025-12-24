import axios from "axios";

export const storiesFetcher = async (path) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/stories${path}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Client-Name": process.env.NEXT_PUBLIC_CLIENT_NAME,
        "X-Auth-Key": process.env.NEXT_PUBLIC_AUTH_KEY,
        "X-API-Key": process.env.NEXT_PUBLIC_INTERNAL_API_KEY,
      },
    }
  );
  return res.data.data;
};
