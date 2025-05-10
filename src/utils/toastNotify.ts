import { Bounce, toast } from "react-toastify";

type ToastTypes = "info" | "success" | "warning" | "error";

const notify = (str: string, type: ToastTypes) => {
  toast[type](str, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export default notify;
