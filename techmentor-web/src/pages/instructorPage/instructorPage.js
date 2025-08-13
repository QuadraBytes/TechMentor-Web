
// import "./instructorStyle.css";

// import Navbar from "../../components/navbar/navbar";
// import circle1 from "../../assets/circle1.png";
// import circle2 from "../../assets/circle2.png";
// import Footer from "../../components/footer/footer";
// import InstructorCard from "../../components/courseCard/instructorCard";
// import Button from '../../components/buttons/button';


// export const InstructorPage = () => {
//     return (
//         <div>
//             <Navbar />
//             <div className="course-page">
//                 <img className="circle1" src={circle1} alt="Circle 1" />
//                 <img className="circle2" src={circle2} alt="Circle 2" />
//                 <img className="circle3" src={circle2} alt="Circle 2" />
//                 <img className="circle4" src={circle1} alt="Circle 2" />
//                 <img className="circle5" src={circle1} alt="Circle 2" />
//             </div>
//             <div className="course-list">
//                 <div className="course-header">
//                     <h1>My Courses</h1>
//                     <Button text="Add course" />
//                 </div>

//                 <InstructorCard
//                     title="Course 1"
//                     description="Description for Course 1"
//                 />
//                 <InstructorCard
//                     title="Course 2"
//                     description="Description for Course 2"
//                 />
//                 <InstructorCard
//                     title="Course 3"
//                     description="Description for Course 3"
//                 />

//             </div>

//             {/* <Footer /> */}
//         </div>
//     );
// };


import "./instructorStyle.css";
import Navbar from "../../components/navbar/navbar";
import circle1 from "../../assets/circle1.png";
import circle2 from "../../assets/circle2.png";
import Footer from "../../components/footer/footer";
import InstructorCard from "../../components/courseCard/instructorCard";
import Button from '../../components/buttons/button';
import Modal from "../../components/model/model";
import { useState } from "react";

export const InstructorPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: "", description: "" });

    const handleAddCourse = (e) => {
        e.preventDefault();
        console.log("New course:", newCourse);
        setIsModalOpen(false);
        // TODO: Save to backend
    };

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

            <div className="course-list">
                <div className="course-header">
                    <h1>My Courses</h1>
                    <Button text="Add course" onClick={() => setIsModalOpen(true)} />
                </div>

                <InstructorCard title="Course 1" description="Description for Course 1" />
                <InstructorCard title="Course 2" description="Description for Course 2" />
                <InstructorCard title="Course 3" description="Description for Course 3" />
            </div>

            {/* Add Course Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Add New Course</h2>
                <form onSubmit={handleAddCourse}>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            value={newCourse.title}
                            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            value={newCourse.description}
                            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                            required
                        />
                    </div>
                    <Button text="Save Course" type="submit" />
                </form>
            </Modal>
        </div>
    );
};

