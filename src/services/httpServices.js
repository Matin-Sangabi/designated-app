import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http:localhost:3000/api"
    : "https://hardcore-murdock-2fl1zepsa.iran.liara.run/api";

const app = axios.create({
  baseURL,
});

const http = {
  get: app.get,
  post: app.post,
  put: app.put,
  delete: app.delete,
};

export default http;
