import { RcFile } from "antd/es/upload";

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const thousandFormat = (x: string | number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const rupiahCurrency = (x: string | number) => `Rp ${thousandFormat(x)}`;
