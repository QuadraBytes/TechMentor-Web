import "./courseStyle.css";
import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/navbar/navbar";
import circle1 from "../../assets/circle1.png";
import circle2 from "../../assets/circle2.png";
import Footer from "../../components/footer/footer";
import Modal from "../../components/model/model";
import CourseCard from "../../components/courseCard/courseCard";
import Button from "../../components/buttons/button";
import { useEnrollInCourse, useFetchCourses } from "../../hooks/useCourseApi";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

export const CoursePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const { authData } = useContext(AuthContext);
  const navigation = useNavigate();

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    console.log("Selected course:", course);
    console.log("Auth Data:", authData);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    console.log("Courses fetched successfully:");
  };

  const handleError = () => {
    console.error("Error fetching courses");
    window.alert("Failed to fetch courses. Please try again later.");
  };

  const handleEnrollSuccess = () => {
    window.alert(
      "You have successfully enrolled to this course"
    );
    navigation("/student");
  };

  const handleEnrollError = () => {
    console.error("Error enrolling in course");
    window.alert("There was an error enrolling in the course");
  };

  const { data, isLoading, isError, refetch } = useFetchCourses(
    handleSuccess,
    handleError
  );

  const { mutate, status } = useEnrollInCourse(handleEnrollSuccess, handleEnrollError);

  const handleEnroll = () => {
    if (!authData || authData.userRole == "instructor") {
      window.alert("Sign up or login as a student to enroll in courses!");
      return;
    }
    mutate({ courseId: selectedCourse.id, userId: authData.userId, userName: authData.userName });
  };

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
          {!isLoading &&
            !isError &&
            courses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                instructor={course.instructor_name}
                image={course.image}
                isEnrolled={
                  course.students?.some(
                    (student) =>
                      student.studentId?.toString() == authData.userId
                  ) ?? false
                }
                onClick={() => handleCourseClick(course)}
              />
            ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCourse && (
          <div className="course-modal-content">
            <div className="course-modal-image">
              <img src={selectedCourse.image} alt={selectedCourse.title} />
            </div>

            <div className="course-modal-details">
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

              <div className="course-modal-actions">
                {selectedCourse.students?.some(
                  (student) => student.studentId?.toString() == authData.userId
                ) ? (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    You are enrolled in this course.
                  </p>
                ) : (
                  <>
                    {status === "pending" ? (
                      <Button
                        type="button"
                        text="Enrolling..."
                        size="large"
                        variant="secondary"
                        disabled
                      />
                    ) : (
                      <Button text="Enroll" onClick={handleEnroll} />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
};
