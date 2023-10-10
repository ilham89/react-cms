export const env = {
  mode: import.meta.env.MODE,
  baseUrl: import.meta.env.VITE_BASE_URL,
  services: {
    cms: import.meta.env.VITE_CMS_PATH,
  },
};
