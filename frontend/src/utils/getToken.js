export const getToken = () => {
  return document.cookie
    .split(";")
    .find((x) => x.trim().startsWith("jwt="))
    .split("=")[1];
};
