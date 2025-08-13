import React from "react";
import "./aboutStyle.css";

import circle1 from "../../assets/circle1.png";
import circle2 from "../../assets/circle2.png";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import ReviewCard from "../../components/reviewCard/reviewCard";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="about-page">
        <img className="circle1" src={circle1} alt="Circle 1" />
        <img className="circle2" src={circle2} alt="Circle 2" />

        <section className="about-hero">
          <h1>About Us</h1>
          <p>
            Welcome to TechMentor! We’re passionate about empowering students
            and instructors by connecting them through expert-led online
            courses. Our mission is to make learning accessible, flexible, and
            inspiring for everyone, everywhere.
          </p>
        </section>

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-cards">
            <div className="team-card">
              <h3>Jane Doe</h3>
              <p>Founder & CEO</p>
              <p>
                Jane leads TechMentor with a vision to revolutionize online
                learning.
              </p>
            </div>
            <div className="team-card">
              <h3>John Smith</h3>
              <p>Lead Instructor</p>
              <p>
                John is passionate about teaching and developing high-quality
                courses.
              </p>
            </div>
            <div className="team-card">
              <h3>Sarah Lee</h3>
              <p>Community Manager</p>
              <p>
                Sarah connects learners and instructors, fostering an engaged
                community.
              </p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>What Our Students Say</h2>
          <div className="testimonial-container">
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
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
