import Axios from "axios";

export const axios = () =>
  Axios.create({
    baseURL: "http://ec2-3-120-108-151.eu-central-1.compute.amazonaws.com/api",
  });
