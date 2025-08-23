import ApiClient from "../services/apiService";

const apiClient = ApiClient;

const fetchStudentCourses = async ({ queryKey }) => {
  const [_, userId] = queryKey;
  const res = await apiClient.get(`/user/student/courses/${userId}`);
  console.log(res.data);
  return res.data;
};

export { fetchStudentCourses };
