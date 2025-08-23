import ApiClient from "../services/apiService";

const apiClient = ApiClient;

const getRecommendations = async (prompt) => {
  const payload = {
    body: JSON.stringify({ prompt }),
  };
  const res = await apiClient.post("/ai/", payload);
  console.log(res.data);
  return res.data;
};

export { getRecommendations };
