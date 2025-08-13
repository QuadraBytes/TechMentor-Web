import React from "react";
import "./homeStyle.css";

import studentImg from "../../assets/student.png";
import instructorImg from "../../assets/instructor.png";
import jsIcon from "../../assets/js.png";
import cssIcon from "../../assets/css.png";
import flutterIcon from "../../assets/flutter.png";
import reactIcon from "../../assets/react.png";
import htmlIcon from "../../assets/html.png";
import cIcon from "../../assets/c.png";
import pythonIcon from "../../assets/python.png";
import circle1 from "../../assets/circle1.png";
import circle2 from "../../assets/circle2.png";

import HeroSection from "../../components/hero/heroSection";
import SkillsSection from "../../components/skillsSection/skillsSection";
import StudentRoleCard from "../../components/roleCard/studentRoleCard";
import InstructorRoleCard from "../../components/roleCard/instructorRoleCard";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import ReviewCard from "../../components/reviewCard/reviewCard";

export default function HomePage() {
  const skills = [
    jsIcon,
    cssIcon,
    flutterIcon,
    reactIcon,
    htmlIcon,
    cIcon,
    pythonIcon,
  ];

  return (
    <>
      <Navbar />
      <div className="home-page">
        <img className="circle1" src={circle1} alt="Circle 1" />
        <img className="circle2" src={circle2} alt="Circle 2" />
        <img className="circle3" src={circle2} alt="Circle 2" />
        <img className="circle4" src={circle1} alt="Circle 2" />
        <img className="circle5" src={circle1} alt="Circle 2" />

        <HeroSection />

        <section id='role-section' className="role-section">
          <StudentRoleCard
            title="As a Student"
            description="Unlock your potential—learn anytime, anywhere with TechMentor’s expert-led courses. Unlock your potential—learn anytime, anywhere with TechMentor’s expert-led courses. Unlock your potential—learn anytime, anywhere with TechMentor’s expert-led courses."
            buttonText="Sign up as a Student"
            img={studentImg}
          />
          <InstructorRoleCard
            title="As an Instructor"
            description="Share your knowledge. Inspire learners worldwide. Become a TechMentor instructor today! Share your knowledge. Inspire learners worldwide. Become a TechMentor instructor today! Share your knowledge. Inspire learners worldwide. Become a TechMentor instructor today!"
            buttonText="Sign up as an Instructor"
            img={instructorImg}
          />
        </section>

        <SkillsSection skills={skills} />

        <section className="reviews">
          <h1>What Our Students Say</h1>
          <div className="reviews-container">
            <ReviewCard
              name="John William"
              text="TechMentor made learning so easy and fun! The courses are clear and well-structured."
            />
            <ReviewCard
              name="Smith Rogers"
              text="I love how flexible the platform is. I could study at my own pace and still get help when needed."
            />
            <ReviewCard
              name="Sarah Ridge"
              text="TechMentor made learning so easy and fun! The courses are clear and well-structured."
            />
            <ReviewCard
              name="Willey Brown"
              text="Great variety of courses and amazing instructors. I feel more confident in my skills now!"
            />
            <ReviewCard
              name="Natasha Silver"
              text="TechMentor made learning so easy and fun! The courses are clear and well-structured."
            />
            <ReviewCard
              name="Tom Carder"
              text="Teaching on TechMentor has been a rewarding experience. The support team is fantastic too!"
            />
            <ReviewCard
              name="Kelly White"
              text="TechMentor made learning so easy and fun! The courses are clear and well-structured."
            />
            <ReviewCard
              name="Edward Morty"
              text="I love how flexible the platform is. I could study at my own pace and still get help when needed."
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
