import axios from "axios";

export const storiesFetcher = async (path) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/stories${path}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_INTERNAL_API_KEY}`,
        "X-Client-Name": process.env.NEXT_PUBLIC_CLIENT_NAME,
        "X-Auth-Key": process.env.NEXT_PUBLIC_AUTH_KEY,
      },
    }
  );
  return res.data.data;
};
