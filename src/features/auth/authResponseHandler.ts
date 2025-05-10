import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../../types/types";
import Cookies from "js-cookie";

interface authResponse {
  _id: string;
  token: string;
  username: string;
}
const authResponseHandler = (res: authResponse) => {
  const token = res?.token;
  const decodedToken = jwtDecode<DecodedToken>(token);
  const expiresInMs = decodedToken.exp * 1000 - Date.now();
  const expiresInDays = expiresInMs / (1000 * 60 * 60 * 24);
  const username = res?.username;
  Cookies.set("token", token, { expires: expiresInDays });
  Cookies.set("username", username, { expires: expiresInDays });
};

export default authResponseHandler;
