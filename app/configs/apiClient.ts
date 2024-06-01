import axios from "axios";

export default axios.create({
  baseURL: "https://api.stg.cyberconnect.dev/cybermon",
  headers: {
    "Content-type": "application/json",
  },
});
