"use client";

import Link from "next/link";
export default function HomePage() {
  return (
    <div className="p-5">
      
      <div className="mt-4 space-x-4">
      <h1 className="text-xl font-bold">CRYPTOLEARN</h1>
      <div className="linkk">
        <Link href="/login">
          <button className="loginbtn">Login</button>
        </Link>
        <Link href="/signup">
          <button className="signupbtn">Sign Up</button>
        </Link>
      </div>
      </div>
      <div className="p-Aboutus">

        <div className="q-aboutus">
          <img src="/aboutuspage.webp" alt="A description of the image"  width={730} />
          <div className="r-aboutus">
            <h1 className="home-title1">About Us</h1>
            <h1 className="home-title1">Why CRYPTOLEARN?</h1>
            <p className="aboutusp1">Decentralized Rewards – By leveraging blockchain technology, we ensure that contributions are recognized fairly and transparently.
              Collaborative Learning – Our platform encourages peer-to-peer support. Students can upvote, comment, and share resources to highlight the best content.
              Accessible to All – Whether you’re a first-year student, a seasoned developer, or a teacher, CRYPTOLEARN has a place for you.</p>
            <h1 className="home-title1">Our Vision</h1>
            <p className="aboutusp1">We envision a future where students are not only consumers of educational content but also active contributors. By gamifying the process with crypto tokens, we aim to keep learners motivated and engaged. Ultimately, we hope to build a vibrant, knowledge-driven economy that benefits everyone involved.</p>
            <div className="iconwala">
              <h1>Join Us</h1>
              <a href="https://www.instagram.com/accounts/login/?hl=en" target="_blank" rel="noopener noreferrer"><img className="imgm" src="/instagram.svg" alt="i cant" /></a>
              <a href="https://www.google.com/search?q=twitter&rlz=1C1VDKB_enIN1111IN1111&oq=twitter&gs_lcrp=EgZjaHJvbWUqBwgAEAAYjwIyBwgAEAAYjwIyEwgBEC4YgwEYxwEYsQMY0QMYgAQyBggCEEUYOzIMCAMQABgUGIcCGIAEMgoIBBAAGLEDGIAEMgYIBRBFGDwyBggGEEUYPDIGCAcQBRhA0gEIMzI1NWowajmoAgCwAgE&sourceid=chrome&ie=UTF-8" target="_blank" rel="noopener noreferrer"><img className="imgm" src="/twitter.svg" alt="i cant" /></a>
              <a href="https://discord.com/login" target="_blank" rel="noopener noreferrer"><img className="imgm" src="/discord.svg" alt="i cant" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}
