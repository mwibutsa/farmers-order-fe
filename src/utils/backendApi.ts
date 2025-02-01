import axios from "axios";

console.log(
  "process.env.NEXT_PUBLIC_API_BASE",
  process.env.NEXT_PUBLIC_API_BASE
);
const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

export default backendApi;
