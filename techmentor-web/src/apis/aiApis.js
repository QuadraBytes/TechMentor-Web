import ApiClient from "../services/apiService";

const apiClient = ApiClient;

const getRecommendations = async (prompt) => {
  const res = await apiClient.post("/ai", { prompt });
  console.log(res.data);
  return res.data;
};

export { getRecommendations };
