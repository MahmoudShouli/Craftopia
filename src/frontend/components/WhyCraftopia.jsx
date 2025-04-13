import React from 'react';
import {
  SectionWrapper,
  ContentWrapper,
  FeaturesGrid,
  IconCircle,
  FeatureTitle,
  FeatureDescription,
  SectionTitle,
  ImageContainer,
  ImageWrapper,
  StyledImage,
} from '../styles/WhyCraftopia.styled';

import { motion } from 'framer-motion';
import { FaUserShield, FaComments, FaTools, FaMapMarkerAlt } from 'react-icons/fa';
import image from '../assets/why-craftopia.png';

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
  return (
    <SectionWrapper>
      <SectionTitle>Why Craftopia?</SectionTitle>
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
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  border: '2px solid #6a380f',
                  transition: { duration: 0.3 },
                }}
                style={{
                  background: '#f7e9d7',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                  color: '#6a380f',
                  textAlign: 'center',
                  border: '2px solid transparent',
                  cursor: 'pointer',
                }}
              >
                <IconCircle>{feature.icon}</IconCircle>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </motion.div>
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
