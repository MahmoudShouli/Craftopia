
import React from 'react';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram
} from 'react-icons/fa';
import {
  FooterWrapper,
  FooterContent,
  FooterColumn,
  SocialIcons,
  FooterBottom
} from './Footer.styled';



const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterColumn>
          <h4>Craftopia</h4>
          <p>Empowering local crafters, one project at a time.</p>
        </FooterColumn>

        <FooterColumn>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </FooterColumn>

        <FooterColumn>
          <h4>Contact</h4>
          <p><FaEnvelope className="icon" /> Craftopia@gmail.com</p>
          <p><FaPhoneAlt className="icon" /> +972592757823</p>
          <p><FaMapMarkerAlt className="icon" /> Palestine, Nablus</p>

          <SocialIcons>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
          </SocialIcons>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        © 2025 Craftopia. Built with 💛 in Palestine.
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
