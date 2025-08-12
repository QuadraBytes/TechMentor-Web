
import "./courseStyle.css";

import Navbar from "../../components/navbar/navbar";
import circle1 from "../../assets/circle1.png";
import circle2 from "../../assets/circle2.png";
import Footer from "../../components/footer/footer";
import StudentCard from "../../components/courseCard/studentCard";

export const CoursePage = () => {
    return (
        <div>
            <Navbar />
            <div className="course-page">
                <img className="circle1" src={circle1} alt="Circle 1" />
                <img className="circle2" src={circle2} alt="Circle 2" />
                <img className="circle3" src={circle2} alt="Circle 2" />
                <img className="circle4" src={circle1} alt="Circle 2" />
                <img className="circle5" src={circle1} alt="Circle 2" />
            </div>
            <h1>Courses</h1>
            <StudentCard
                title="Course 1"
                description="Description for Course 1"
                instructor="Instructor 1"
                isEnrolled={true}
            />
            <StudentCard
                title="Course 2"
                description="Description for Course 2"
                instructor="Instructor 2"
                isEnrolled={false}
            />
            <StudentCard
                title="Course 3"
                description="Description for Course 3"
                instructor="Instructor 3"
                isEnrolled={true}
            />
            <p>Explore our wide range of courses designed to help you succeed.</p>
            {/* <Footer /> */}
        </div>
    );
};
