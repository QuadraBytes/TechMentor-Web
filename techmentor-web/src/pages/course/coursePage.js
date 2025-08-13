import "./courseStyle.css";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import circle1 from "../../assets/circle1.png";
import circle2 from "../../assets/circle2.png";
import Footer from "../../components/footer/footer";
import Modal from "../../components/model/model";
import CourseCard from "../../components/courseCard/courseCard";
import Button from "../../components/buttons/button";
import { useFetchCourses } from "../../hooks/useCourseApi";

export const CoursePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    console.log("Courses fetched successfully:");
  };

  const handleError = (error) => {
    console.error("Error fetching courses:", error);
    window.alert("Error", "Failed to fetch courses. Please try again later.");
  };

  const { data, isLoading, isError } = useFetchCourses(
    handleSuccess,
    handleError
  );

  useEffect(() => {
    if (data) {
      setCourses(data.courses);
    }
  }, [data]);

  return (
    <div>
      <Navbar />
      <div className="course-page">
        {/* <img className="circle1" src={circle1} alt="Circle 1" />
        <img className="circle2" src={circle2} alt="Circle 2" />
        <img className="circle3" src={circle2} alt="Circle 2" />
        <img className="circle4" src={circle1} alt="Circle 2" />
        <img className="circle5" src={circle1} alt="Circle 2" /> */}
        <h1>Available Courses</h1>
        <div className="course-grid">
          {isLoading && <p>Loading courses...</p>}
          {isError && <p>Error loading courses. Please try again later.</p>}
          {!isLoading && !isError && courses.length === 0 && (
            <p>No courses available at the moment.</p>
          )}
          {!isLoading && !isError && courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              instructor={course.instructor_name}
              isEnrolled={course.enrolled}
              onClick={() => handleCourseClick(course)}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCourse && (
          <>
            <h2 className="course-modal-title">{selectedCourse.title}</h2>
            <p>
              <strong>Instructor:</strong> {selectedCourse.instructor}
            </p>
            <p>
              <strong>Description:</strong> {selectedCourse.description}
            </p>
            <p>
              <strong>Content:</strong>
            </p>
            <ul>
              {selectedCourse.content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div className="course-modal-actions">
              {selectedCourse.enrolled ? (
                <p style={{ color: "green" }}>
                  You are enrolled in this course.
                </p>
              ) : (
                <Button text="Enroll" onClick={() => {}} />
              )}
            </div>
          </>
        )}
      </Modal>

      <Footer />
    </div>
  );
};
