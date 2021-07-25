import axios from "axios";

const axiosClient = axios.create({
  baseURL:'https://601014b66c21e1001704fe27.mockapi.io/api/'
})
export default axiosClient;