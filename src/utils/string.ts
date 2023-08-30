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

export const getStrTimesIndex = (str: string, cha: string, num: number) => {
  let x = str.indexOf(cha);

  for (let i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }

  return x;
};

export const getFirstPathCode = (path: string) => {
  const index0 = getStrTimesIndex(path, "/", 0);
  const index1 = getStrTimesIndex(path, "/", 1);

  const activeKey = path.slice(index0 + 1, index1 > 0 ? index1 : path.length);

  return activeKey;
};

export function getPathExceptLast(path: string) {
  const parts = path.split("/");
  const result = [];

  if (parts.length > 1) {
    parts.pop();
  }

  result.push(parts.join("/"));

  return result;
}
