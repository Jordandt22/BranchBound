export const getWebURL = () => {
  const { NODE_ENV, WEB_URL } = process.env;
  return NODE_ENV === "development" ? "http://localhost:3000" : WEB_URL;
};
