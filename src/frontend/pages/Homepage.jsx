import React from 'react';
import NavbarComponent from '../components/home/navbar/Navbar';
import HeroCarousel from '../components/home/hero/HeroCarousel';
import WhyCraftopia from '../components/home/whycraftopia/WhyCraftopia';
import Testimonials from '../components/home/testimonials/Testimonials';
import Contact from '../components/home/contact/Contact';
import Footer from '../components/home/footer/Footer';

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
