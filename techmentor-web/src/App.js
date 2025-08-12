import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';
import { InstructorSignupPage } from './pages/auth/instructorSignUp';
import { StudentSignupPage } from './pages/auth/studentSignUp';
import { ContactPage } from './pages/contact/contactPage';
import { CoursePage } from './pages/coursePage.js/coursePage';
import  HomePage  from './pages/home/homePage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/student-signup" element={<StudentSignupPage />} />
            <Route
              path="/instructor-signup"
              element={<InstructorSignupPage />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
