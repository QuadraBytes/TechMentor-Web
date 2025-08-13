import "./instructorStyle.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import InstructorCard from "../../components/courseCard/instructorCard";
import Button from "../../components/buttons/button";
import Modal from "../../components/model/model";
import { useState } from "react";

export const InstructorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    contents: [""],
  });
  const [touched, setTouched] = useState({
    title: false,
    description: false,
  });

  // Sample student list (replace with real data later)
  const enrolledStudents = [
    { id: "S001", name: "Alice Johnson" },
    { id: "S002", name: "Bob Smith" },
    { id: "S003", name: "Charlie Brown" },
  ];

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const titleError = touched.title && newCourse.title.trim() === "";
  const descriptionError =
    touched.description && newCourse.description.trim() === "";

  const isFormValid =
    newCourse.title.trim() !== "" && newCourse.description.trim() !== "";

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    alert(
      `Course Title: ${newCourse.title}\nDescription: ${
        newCourse.description
      }\nContents: ${newCourse.contents.join(", ")}`
    );
    setIsModalOpen(false);
  };

  const handleAddContentBlock = () => {
    setNewCourse((prev) => ({
      ...prev,
      contents: [...prev.contents, ""],
    }));
  };

  const handleDeleteContentBlock = (index) => {
    setNewCourse((prev) => ({
      ...prev,
      contents: prev.contents.filter((_, i) => i !== index),
    }));
  };

  const handleContentChange = (index, value) => {
    const updated = [...newCourse.contents];
    updated[index] = value;
    setNewCourse({ ...newCourse, contents: updated });
  };

  return (
    <div>
      <Navbar />
      <div className="course-page">
        <h1>My Courses</h1>
        <InstructorCard
          title="Course 1"
          description="Description for Course 1"
          onEnrolledClick={() => setIsStudentsModalOpen(true)}
        />
        <InstructorCard
          title="Course 2"
          description="Description for Course 2"
          onEnrolledClick={() => setIsStudentsModalOpen(true)}
        />
        <InstructorCard
          title="Course 3"
          description="Description for Course 3"
          onEnrolledClick={() => setIsStudentsModalOpen(true)}
        />
      </div>

      <div className="add-button-container">
        <Button
          text="Add course"
          variant="secondary"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Add Course Modal */}
      <Modal
        isOpen={isModalOpen}
        className="add-modal"
        onClose={() => setIsModalOpen(false)}
      >
        <form className="form" onSubmit={handleAddCourse} noValidate>
          <h4>Add New Course</h4>
          <p>Please fill in the details to add your new course.</p>

          {/* Title */}
          <label htmlFor="courseTitle">Title</label>
          <input
            id="courseTitle"
            type="text"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
            onBlur={() => handleBlur("title")}
            placeholder="Enter course title"
            required
            className={titleError ? "input-error" : ""}
          />
          {titleError && (
            <div className="error">Course title cannot be empty</div>
          )}

          {/* Description */}
          <label htmlFor="courseDescription">Description</label>
          <input
            id="courseDescription"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
            onBlur={() => handleBlur("description")}
            placeholder="Enter course description"
            required
            className={descriptionError ? "input-error" : ""}
          />
          {descriptionError && (
            <div className="error">Description cannot be empty</div>
          )}

          <label>Course Content</label>
          {newCourse.contents.map((content, index) => (
            <div
              key={index}
              style={{ marginBottom: "10px", display: "flex", gap: "8px" }}
            >
              <input
                type="text"
                value={content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                onBlur={() => handleBlur("contents", index)}
                placeholder={`Content ${index + 1}`}
                style={{ flex: 1 }}
              />
              {newCourse.contents.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteContentBlock(index)}
                  className="delete-button"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <Button
            type="button"
            text="Add Content Block"
            variant="secondary"
            onClick={handleAddContentBlock}
          />

          {/* Submit */}
          <div className="button-container">
            <Button
              text="Save Course"
              type="submit"
              size="large"
              variant="primary"
              disabled={!isFormValid}
            />
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isStudentsModalOpen}
        className="enroll-modal"
        onClose={() => setIsStudentsModalOpen(false)}
      >
        <h2>Enrolled Students</h2>
        {enrolledStudents.length > 0 ? (
          <table className="students-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {enrolledStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students enrolled yet.</p>
        )}
      </Modal>

      <Footer />
    </div>
  );
};
