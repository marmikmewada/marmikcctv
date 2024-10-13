'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import * as THREE from 'three'
import { Canvas, useFrame, extend, useLoader } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

extend({ TextGeometry })

const StyledContainer = styled.div`
  min-height: 100vh;
  background-color: #000;
  color: #ff3e3e;
  font-family: 'Orbitron', sans-serif;
`

const StyledHeader = styled(motion.header)`
  position: fixed;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
`

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const StyledLogo = styled(motion.a)`
  color: #ff3e3e;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
`

const StyledMenu = styled(motion.div)`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${props => (props.isOpen ? 'flex' : 'none')};
  }
`

const StyledLink = styled(motion.a)`
  color: ${props => (props.active ? '#ff3e3e' : '#fff')};
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ff3e3e;
  }
`

const StyledMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`

const StyledButton = styled(motion.button)`
  background-color: #ff3e3e;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6b6b;
  }
`

const StyledSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
`

const StyledTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(45deg, #ff3e3e, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const StyledGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`

const StyledCard = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(255, 62, 62, 0.2);
  }
`

const StyledForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`

const StyledInput = styled.input`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ff3e3e;
  }
`

const StyledTextArea = styled.textarea`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  color: #fff;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #ff3e3e;
  }
`

const AnimatedBackground = () => {
  const mesh = useRef()

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.1
    mesh.current.rotation.y += delta * 0.12
  })

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[10, 3, 100, 16]} />
      <meshStandardMaterial color="#ff3e3e" wireframe />
    </mesh>
  )
}

const AnimatedText = ({ text }) => {
  const font = useLoader(FontLoader, 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')
  const mesh = useRef()

  useFrame(({ clock }) => {
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.3
    mesh.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.3
  })

  return (
    <mesh ref={mesh}>
      <textGeometry args={[text, { font, size: 5, height: 1 }]} />
      <meshPhongMaterial color="#ff3e3e" />
    </mesh>
  )
}

const services = [
  { name: 'Web Scraping', description: 'Extract valuable data efficiently', icon: '🕸️' },
  { name: 'IoT Solutions', description: 'Connect and manage your devices', icon: '🌐' },
  { name: 'Web Development', description: 'Create powerful web applications', icon: '💻' },
  { name: 'Mobile Development', description: 'Build iOS and Android apps', icon: '📱' },
  { name: 'Security Tools', description: 'Protect your digital assets', icon: '🛡️' },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight

    const sectionOffsets = {
      home: 0,
      about: windowHeight,
      services: windowHeight * 2,
      expertise: windowHeight * 3,
      contact: windowHeight * 4,
    }

    const currentSection = Object.keys(sectionOffsets).find(
      section => scrollPosition < sectionOffsets[section] + windowHeight
    )

    setActiveSection(currentSection)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 300, friction: 10 },
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <StyledContainer>
      <StyledHeader
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <StyledNav>
          <StyledLogo href="#home" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            TechGuard Solutions
          </StyledLogo>
          <StyledMenuButton onClick={toggleMenu} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            ☰
          </StyledMenuButton>
          <StyledMenu isOpen={isMenuOpen}>
            {['about', 'services', 'expertise', 'contact'].map((item) => (
              <StyledLink
                key={item}
                href={`#${item}`}
                active={activeSection === item}
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </StyledLink>
            ))}
          </StyledMenu>
        </StyledNav>
      </StyledHeader>

      <StyledSection id="home">
        <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedBackground />
          <OrbitControls enableZoom={false} />
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          </EffectComposer>
        </Canvas>
        <animated.div style={springProps}>
          <StyledTitle>Innovative Tech Solutions</StyledTitle>
          <p className="text-xl mb-8 text-center">
            Empowering businesses with cutting-edge web scraping, IoT, and development solutions.
          </p>
          <StyledButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </StyledButton>
        </animated.div>
      </StyledSection>

      <StyledSection id="about">
        <StyledTitle>About Marmik</StyledTitle>
        <StyledGrid>
          <StyledCard>
            <Canvas style={{ width: '100%', height: '200px' }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <AnimatedText text="MARMIK" />
              <OrbitControls enableZoom={false} />
            </Canvas>
            <h3 className="text-2xl font-semibold mb-4">Tech Innovator & Solution Architect</h3>
            <p>
              With over a decade of experience in the tech industry, Marmik has been at the forefront of innovation in web scraping, IoT solutions, and application development.
            </p>
          </StyledCard>
          <StyledCard>
            <h3 className="text-2xl font-semibold mb-4">Breaking Barriers in Tech</h3>
            <p>
              At TechGuard Solutions, we're on a mission to democratize access to advanced tech solutions. We believe every business, regardless of size, deserves access to cutting-edge technology.
            </p>
            <p className="mt-4">
              Our innovative approach allows us to offer premium services at a fraction of the traditional cost, showcasing our efficiency and cost-effectiveness.
            </p>
          </StyledCard>
        </StyledGrid>
      </StyledSection>

      <StyledSection id="services">
        <StyledTitle>Our Services</StyledTitle>
        <StyledGrid>
          {services.map((service, index) => (
            <StyledCard
              key={service.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p>{service.description}</p>
            </StyledCard>
          ))}
        </StyledGrid>
      </StyledSection>

      <StyledSection id="expertise">
        <StyledTitle>Our Expertise</StyledTitle>
        <StyledGrid>
          <StyledCard>
            <h3 className="text-2xl font-semibold mb-4">Web Scraping & Data Extraction</h3>
            <p>
              Our team of experts specializes in developing efficient and ethical web scraping solutions. We help businesses gather valuable data to drive informed decision-making.
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>Large-scale data extraction</li>
              <li>Real-time web monitoring</li>
              <li>Custom scraping tools development</li>
              <li>Data cleaning and structuring</li>
            </ul>
          </StyledCard>
          <StyledCard>
            <h3 className="text-2xl font-semibold mb-4">IoT & Web Development</h3>
            <p>
              We create powerful, interconnected solutions that bridge the physical and digital worlds. Our IoT and web development expertise helps businesses stay ahead in the connected era.
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>IoT device integration</li>
              <li>Real-time data processing</li>
              <li>Responsive web applications</li>
              <li>Cross-platform mobile apps</li>
            </ul>
          </StyledCard>
        </StyledGrid>
      </StyledSection>

      <StyledSection id="contact">
        <StyledTitle>Get in Touch</StyledTitle>
        <StyledForm>
          <StyledInput type="text" placeholder="Name" required />
          <StyledInput type="email" placeholder="Email" required />
          <StyledTextArea rows={4} placeholder="Message" required />
          <StyledButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </StyledButton>
        </StyledForm>
      </StyledSection>

      <footer className="bg-black text-red-500 py-8 border-t border-red-700">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 TechGuard Solutions. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-red-400 hover:text-red-300 mx-2">Privacy Policy</a>
            <a href="#" className="text-red-400 hover:text-red-300 mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    </StyledContainer>
  )
}
