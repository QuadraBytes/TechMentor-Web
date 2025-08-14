import axios from "axios";
import { aiBaseUrl } from "../utils/baseUrl";

const AiClient = axios.create({
  baseURL: aiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const aiSuggestions = async (prompt) => {
  const payload = {
    body: JSON.stringify({ prompt }),
  };
  console.log("Sending AI request with payload:", payload);
  const res = await AiClient.post("/", payload);
  console.log("Received AI response:", res.data);
  return res.data;
};

export { aiSuggestions };
