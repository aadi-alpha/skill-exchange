import React from 'react'
import hero from '../assets/images/hero_sec_img.png'
import background from '../assets/images/hero_background.png'

const HeroLanding = () => {
  return (
   <>
     <section class="hero-sec">
    <img src={background} alt="bg-hero" class="hero-bg" />
    <div class="hero-left"> 
       <h1>Connect, Learn, Collaborate, Grow with SkillX</h1>
       <p>Empowering students to showcase their skills, connect with mentors, and work on real Organization projects — all in one smart AI-driven ecosystem.</p>
       <div class="btn-hero-left">
       <button class="login-cta" onclick="window.location.href='roleReg.html'"><i class="fa-solid fa-arrow-right-to-bracket"></i>&nbsp;Login</button>
        <button class="learn-btn-hero">Learn More</button>
       </div>
      </div>
    <div class="hero-right">
      <img src={hero} alt="SkillX related image" />
    </div>

  </section>
   </>
  )
}

export default HeroLanding
