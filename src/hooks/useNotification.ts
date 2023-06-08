import { notification } from "antd";

const useNotification = () => {
  const addError = (label?: string) =>
    notification.error({
      message: label || "Something went wrong!",
      placement: "topRight",
    });

  const addSuccess = (label?: string) =>
    notification.success({
      message: label || "Success!",
      placement: "topRight",
    });

  return { addError, addSuccess };
};

export default useNotification;
