import {
  memo,
  useEffect,
  useState,
  type FC,
  type ReactElement,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import axiosInstance from "../lib/axiosInstance";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const WithAxios: FC<Props> = ({ children }): ReactElement => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const token = Cookies.get("token");

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (request) => {
        if (request.headers) {
          request.headers.Authorization = token ? `Bearer ${token}` : " ";
        }

        return request;
      },
      (error) => Promise.reject(error.response)
    );

    setIsSet(true);

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{isSet && children}</>;
};

export default memo(WithAxios);
