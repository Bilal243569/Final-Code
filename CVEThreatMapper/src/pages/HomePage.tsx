import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/features/HeroSection';
import AboutSection from '../components/features/AboutSection';
import HowItWorks from '../components/features/HowItWorks';
import AIModelInterface from '../components/features/AIModelInterface';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <HowItWorks />
      <AIModelInterface />
    </Layout>
  );
};

export default HomePage;