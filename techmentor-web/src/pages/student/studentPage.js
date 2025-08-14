import "./studentStyle.css";
import { useState, useContext, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import StudentCard from "../../components/courseCard/studentCard";
import Modal from "../../components/model/model";
import { AuthContext } from "../../contexts/authContext";
import { useStudentCourses } from "../../hooks/useStudentApi";

export const StudentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { authData } = useContext(AuthContext);

  const handleCourseClick = (course) => {
    console.log("Course clicked:", course);
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    console.log("Courses fetched successfully:");
  };

  const handleError = (error) => {
    console.error("Error fetching courses:", error);
    window.alert("Failed to fetch courses. Please try again later.");
  };

  const { data, isLoading, isError } = useStudentCourses(
    authData?.userId,
    handleSuccess,
    handleError
  );

  useEffect(() => {
    if (data) {
      setCourses(data.enrolledCourses);
    }
  }, [data]);

  return (
    <div>
      <Navbar />
      <div className="student-page">
        <h1>My Courses</h1>
        {isLoading && <p>Loading courses...</p>}
        {isError && <p>Error loading courses. Please try again later.</p>}
        {!isLoading && !isError && courses.length === 0 && (
          <p>No courses available at the moment.</p>
        )}
        {!isLoading &&
          !isError &&
          courses.map((course, index) => (
            <StudentCard
              key={index}
              title={course.title}
              description={course.description}
              instructor={course.instructor_name}
              content={course.content}
              onClick={() => handleCourseClick(course)}
            />
          ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCourse && (
          <>
            <h2 className="course-modal-title">{selectedCourse.title}</h2>
            <p>
              <strong>Instructor:</strong> {selectedCourse.instructor_name}
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
          </>
        )}
      </Modal>

      <Footer />
    </div>
  );
};
