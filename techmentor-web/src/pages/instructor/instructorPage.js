import "./instructorStyle.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import InstructorCard from "../../components/courseCard/instructorCard";
import Button from "../../components/buttons/button";
import Modal from "../../components/model/model";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useInstructorCourses } from "../../hooks/useInstructorApi";
import {
  useDeleteCourse,
  useEditCourse,
  useAddCourse,
} from "../../hooks/useCourseApi";

export const InstructorPage = () => {
  const { authData } = useContext(AuthContext);
  const [modalMode, setModalMode] = useState("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    contents: [""],
  });
  const [touched, setTouched] = useState({
    title: false,
    description: false,
  });
  const [courses, setCourses] = useState([]);

  const handleFetchSuccess = () => {
    console.log("Courses fetched successfully:");
  };

  const handleFetchError = (error) => {
    console.error("Error fetching courses:", error);
    window.alert("Failed to fetch courses. Please try again later.");
  };

  const { data, isLoading, isError, refetch } = useInstructorCourses(
    authData?.userId,
    handleFetchSuccess,
    handleFetchError
  );

  useEffect(() => {
    if (data) {
      setCourses(data.courses);
    }
  }, [data]);

  const handleDeleteSuccess = () => {
    window.alert("Course has been deleted successfully");
    refetch();
  };

  const handleDeleteError = () => {
    window.alert("Failed to delete course");
  };

  const { mutate: deleteCourse, status: deleteStatus } = useDeleteCourse(
    handleDeleteSuccess,
    handleDeleteError
  );

  const handleDelete = (course) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (confirmDelete) {
      deleteCourse({ courseId: course.id });
    }
  };

  const handleSuccess = () => {
    window.alert("Course has been added successfully");
    setNewCourse({
      title: "",
      description: "",
      contents: [""],
    });
    setIsModalOpen(false);
    refetch();
  };

  const handleError = () => {
    window.alert("Failed to submit course. Please try again.");
  };

  const { mutate, status } = useAddCourse(handleSuccess, handleError);

  const handleUpdateSuccess = () => {
    window.alert("Course updated successfully");
  };

  const handleUpdateError = () => {
    window.alert("Failed to update course");
  };

  const { mutate: updateCourse, status: updateStatus } = useEditCourse(
    handleUpdateSuccess,
    handleUpdateError
  );

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
    console.log("Adding course:", newCourse);
    mutate({
      title: newCourse.title,
      description: newCourse.description,
      instructor_id: authData?.userId,
      instructor_name: authData?.userName,
      instructor_email: authData?.userEmail,
      content: newCourse.contents,
    });
    setIsModalOpen(false);
  };

  const handleEdit = (course) => {
    setModalMode("edit");
    setSelectedCourse(course);
    setNewCourse({
      title: course.title,
      description: course.description,
      contents: course.content || [""],
    });
    setIsModalOpen(true);
  };

  const handleUpdateModal = () => {
    if (!isFormValid) return;
    console.log("Updating course:", newCourse);
    updateCourse({
      courseId: selectedCourse.id,
      data: {
        title: newCourse.title,
        description: newCourse.description,
        content: newCourse.contents,
      },
    });
    setIsModalOpen(false);
    setModalMode("add");
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
        {isLoading && <p>Loading courses...</p>}
        {isError && <p>Error loading courses. Please try again later.</p>}
        {!isLoading && !isError && courses.length === 0 && (
          <p>No courses available at the moment.</p>
        )}
        {!isLoading &&
          !isError &&
          courses.map((course, index) => (
            <InstructorCard
              key={index}
              title={course.title}
              description={course.description}
              onClick={() => {
                setSelectedCourse(course);
                setIsStudentsModalOpen(true);
              }}
              onEdit={() => handleEdit(course)}
              onDelete={() => handleDelete(course)}
            />
          ))}
      </div>

      <div className="add-button-container">
        <Button
          text="Add course"
          variant="secondary"
          onClick={() => {
            setModalMode("add");
            setIsModalOpen(true);
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        className="add-modal"
        onClose={() => setIsModalOpen(false)}
      >
        <form
          className="form"
          onSubmit={modalMode === "add" ? handleAddCourse : handleUpdateModal}
          noValidate
        >
          <h4 style={{textAlign:"center"}}>{modalMode === "add" ? "Add New Course" : "Edit Course"}</h4>
          <p>
            {modalMode === "add"
              ? "Please fill in the details to add your new course."
              : "Update the details of your course."}
          </p>

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
          {status === "pending" ? (
            <div className="button-container">
              <Button
                type="button"
                text="Saving Course..."
                size="large"
                variant="secondary"
                disabled={true}
              />
            </div>
          ) : (
            <div className="button-container">
              <Button
                text="Save Course"
                type="submit"
                size="large"
                variant="primary"
                disabled={!isFormValid}
              />
            </div>
          )}
        </form>
      </Modal>

      <Modal
        isOpen={isStudentsModalOpen}
        className="enroll-modal"
        onClose={() => setIsStudentsModalOpen(false)}
      >
        <h2>Enrolled Students</h2>
        <p style={{ fontWeight: "bold" }}>
          Course: <span>{selectedCourse?.title}</span>
        </p>
        {selectedCourse?.students?.length > 0 ? (
          <table className="students-table">
            <thead>
              <tr>
                <th style={{ textDecoration: "underline" }}>Student ID</th>
                <th style={{ textDecoration: "underline" }}>Name</th>
              </tr>
            </thead>
            <tbody>
              {selectedCourse?.students?.map((student) => (
                <tr key={student.id}>
                  <td>{student.studentId}</td>
                  <td>{student.studentName}</td>
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
