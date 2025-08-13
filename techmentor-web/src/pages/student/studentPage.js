import "./studentStyle.css";
import { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import StudentCard from "../../components/courseCard/studentCard";
import Modal from "../../components/model/model";

export const StudentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    console.log("Course clicked:", course);
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const courses = [
    {
      title: "Course 1",
      description: "Description for Course 1",
      instructor: "Instructor 1",
      content: [
        "Content for Course 1",
        "Additional content for Course 1",
        "Additional content for Course 1",
      ],
    },
    {
      title: "Course 2",
      description: "Description for Course 2",
      instructor: "Instructor 2",
      content: [
        "Content for Course 2",
        "Additional content for Course 2",
        "Additional content for Course 2",
      ],
    },
    {
      title: "Course 3",
      description: "Description for Course 3",
      instructor: "Instructor 3",
      content: [
        "Content for Course 3",
        "Additional content for Course 3",
        "Additional content for Course 3",
      ],
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="student-page">
        <h1>My Courses</h1>
        {courses.map((course, index) => (
          <StudentCard
            key={index}
            title={course.title}
            description={course.description}
            instructor={course.instructor}
            content={course.content}
            onClick={() => handleCourseClick(course)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedCourse && (
          <>
            <h2 className="course-modal-title">{selectedCourse.title}</h2>
            <p>
              <strong>Instructor:</strong> {selectedCourse.instructor}
            </p>
            <p>
              <strong>Description:</strong> {selectedCourse.description}
            </p>
            <p><strong>Content:</strong></p>
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
