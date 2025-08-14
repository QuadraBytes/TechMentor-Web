import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/authContext";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import SignupPage from "./pages/auth/signUp";
import LoginPage from "./pages/auth/loginPage";
import { CoursePage } from "./pages/course/coursePage";
import HomePage from "./pages/home/homePage";
import { InstructorPage } from "./pages/instructor/instructorPage";
import { StudentPage } from "./pages/student/studentPage";
import AboutPage from "./pages/about/aboutPage";
import AiAssistant from "./components/aiAssistant/aiAssistant";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClientId } from "./utils/baseUrl";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursePage />} />
              <Route path="/instructor" element={<InstructorPage />} />
              <Route path="/student" element={<StudentPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
            <AiAssistant />
          </main>
        </QueryClientProvider>
      </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  );
};

export default App;
