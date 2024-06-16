import cookies from "js-cookie";
export const useCookie = (name) => {
  return cookies.get(name);
};
