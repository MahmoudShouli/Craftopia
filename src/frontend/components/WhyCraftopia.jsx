import React, { useEffect } from 'react';
import {
  SectionWrapper,
  ContentWrapper,
  FeaturesGrid,
  FeatureCard,
  IconCircle,
  FeatureTitle,
  FeatureDescription,
  SectionTitle,
  ImageContainer,
  ImageWrapper,
  StyledImage
} from '../styles/WhyCraftopia.styled';

import { FaUserShield, FaComments, FaTools, FaMapMarkerAlt } from 'react-icons/fa';
import image from '../assets/why-craftopia.png';

import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  {
    icon: <FaUserShield />,
    title: 'Trusted Professionals',
    description: 'Every crafter is verified and rated by real users.',
  },
  {
    icon: <FaComments />,
    title: 'Seamless Communication',
    description: 'Chat, share images, and plan your project all in one place.',
  },
  {
    icon: <FaTools />,
    title: 'Skilled Across Industries',
    description: 'Connect with experts from carpentry, design, plumbing, and more.',
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Local & Nearby',
    description: 'Find trusted crafters near you, ready to help at your convenience.',
  },
];

const WhyCraftopia = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh(); 
  }, []);

  return (
    <SectionWrapper>
      <SectionTitle data-aos="fade-down" data-aos-delay="200">
        Why Craftopia?
      </SectionTitle>
      <ContentWrapper>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            marginLeft: '70px',
          }}
        >
          <FeaturesGrid>
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                data-aos="fade-right"
                data-aos-delay={idx * 100}
              >
                <IconCircle>{feature.icon}</IconCircle>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </div>

        <ImageContainer>
          <ImageWrapper>
            <StyledImage src={image} alt="Why Craftopia" />
          </ImageWrapper>
        </ImageContainer>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default WhyCraftopia;
