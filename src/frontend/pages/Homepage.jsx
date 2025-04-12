import React from 'react';
import NavbarComponent from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import WhyCraftopia from '../components/WhyCraftopia';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <NavbarComponent />

      <div id="home">
        <HeroCarousel />
      </div>

      <div id="features">
        <WhyCraftopia />
      </div>

      <div id="reviews">
        <Testimonials />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
