import ApiClient from "../services/apiService";

const apiClient = ApiClient;

const signIn = async (data) => {
  const res = await apiClient.post("/signin", data);
  console.log(res.data);
  return res.data;
};
 
const googleSignIn = async (data) => {
  const res = await apiClient.post("/google-signin", data);
  console.log(res.data);
  return res.data;
};

const register = async (data) => {
  const res = await apiClient.post("/register", data);
  console.log(res.data);
  return res.data;
};

const fetchProfile = async ({ queryKey }) => {
  const [_, userId] = queryKey;
  const res = await apiClient.get(`/profile/${userId}`);
  console.log(res.data);
  return res.data;
};

export { signIn, googleSignIn, register, fetchProfile };
