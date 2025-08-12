import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';
import SignupPage from './pages/auth/signUp';
import LoginPage from './pages/auth/loginPage';
import { ContactPage } from './pages/contact/contactPage';
import { CoursePage } from './pages/coursePage.js/coursePage';
import  HomePage  from './pages/home/homePage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
