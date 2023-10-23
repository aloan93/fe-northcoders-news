import axios from "axios";

const api = axios.create({
  baseURL: "https://northcoders-news-3948.onrender.com/api/",
});

export default api;
