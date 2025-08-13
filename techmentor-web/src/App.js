import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
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
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
