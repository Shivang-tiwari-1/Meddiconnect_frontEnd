import { axiosPrivate } from "../Api/Axios.Api";

const useSanatizeAxiosData = () => {
  axiosPrivate?.interceptors?.request.use(
    (config) => {
      if (config?.method === "post" && config?.data) {
        const { password, ...sanitizeData } = config.data;
        config.data = sanitizeData;
      }
      return config;
    },
    (error) => {
      return Promise?.reject(error);
    }
  );
};

export default useSanatizeAxiosData;
