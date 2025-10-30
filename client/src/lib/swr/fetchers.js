import axios from "axios";

export const storiesFetcher = async (path) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/stories${path}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_INTERNAL_API_KEY}`,
      },
    }
  );
  return res.data.data;
};
