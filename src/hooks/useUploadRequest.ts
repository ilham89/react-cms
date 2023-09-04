import * as React from "react";

import { RcFile } from "antd/es/upload";
import Cookies from "js-cookie";

import useNotification from "./useNotification";
import { imageServices } from "@/services/image/image.api";

type File = {
  file_name: string;
  preview: string;
};

export const useUploadRequest = () => {
  const [file, setFile] = React.useState({} as File);

  const { addError } = useNotification();
  const onCustomRequest = (file: string | Blob | RcFile) => {
    const preview = URL.createObjectURL(file as Blob);
    const formData = new FormData();
    formData.append("file", file);

    imageServices
      .postImage(formData)
      .then((res) =>
        setFile({
          file_name: res.data.file_name,
          preview,
        }),
      )
      .catch((error) => {
        if (error.response?.status === 401) {
          Cookies.remove("user_ct");
          addError("Your session is expired!");
          setTimeout(() => {
            location.replace("/login");
          }, 1000);
        }
      });
  };

  return {
    file,
    setFile,
    onCustomRequest,
  };
};
