'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'expertise', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const services = [
    {
      name: 'Penetration Testing',
      description: 'Identify vulnerabilities in your systems before the bad guys do.',
      icon: '🛡️'
    },
    {
      name: 'Secure IoT Solutions',
      description: 'Fortify your connected devices against potential threats.',
      icon: '🌐'
    },
    {
      name: 'Secure Web Development',
      description: 'Build web applications with security at their core.',
      icon: '💻'
    },
    {
      name: 'Mobile Security',
      description: 'Protect your mobile apps from malicious attacks.',
      icon: '📱'
    },
    {
      name: 'Threat Intelligence',
      description: 'Stay one step ahead of cyber criminals with our data analysis.',
      icon: '📊'
    },
  ]

  return (
    <div className="min-h-screen bg-black text-red-500">
      <header className="fixed w-full bg-black border-b border-red-700 z-50">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <motion.a 
              href="#home" 
              className="text-2xl font-bold text-red-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              TechGuard Solutions
            </motion.a>
            <div className="hidden md:flex space-x-6">
              {['home', 'about', 'services', 'expertise', 'contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className={`capitalize ${activeSection === item ? 'text-red-500' : 'text-gray-500'} hover:text-red-400 transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <button
              className="md:hidden text-red-500 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
          >
            <motion.nav className="flex flex-col items-center space-y-6">
              {['home', 'about', 'services', 'expertise', 'contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className="text-2xl capitalize text-red-500 hover:text-red-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-red-500">
              Secure Your Digital Fortress
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-400">
              Elite cybersecurity solutions for the modern battlefield.
            </p>
            <motion.a
              href="#contact"
              className="bg-red-600 text-white font-bold py-3 px-8 rounded-full inline-block hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Fortify Your Defenses
            </motion.a>
          </motion.div>
        </section>

        <section id="about" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-red-500">
              The Mastermind
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <pre className="text-red-500 text-xs md:text-sm lg:text-base font-mono mb-4">
{`
        ███╗   ███╗ █████╗ ██████╗ ███╗   ███╗██╗██╗  ██╗
        ████╗ ████║██╔══██╗██╔══██╗████╗ ████║██║██║ ██╔╝
        ██╔████╔██║███████║██████╔╝██╔████╔██║██║█████╔╝ 
        ██║╚██╔╝██║██╔══██║██╔══██╗██║╚██╔╝██║██║██╔═██╗ 
        ██║ ╚═╝ ██║██║  ██║██║  ██║██║ ╚═╝ ██║██║██║  ██╗
        ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝ 
`}
                </pre>
                <h3 className="text-2xl font-semibold mb-4 text-red-400">Ethical Hacker & Security Expert</h3>
                <p className="text-gray-400 mb-4">
                  With over a decade of experience in the dark arts of cybersecurity, Marmik has been on both sides of the digital battlefield. Now, he uses his skills to protect and fortify digital assets against the ever-evolving threat landscape.
                </p>
                <p className="text-gray-400">
                  Marmik's unique approach combines offensive security techniques with robust defensive strategies, ensuring your digital fortress is impenetrable.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-black p-6 rounded-lg shadow-lg border border-red-700"
              >
                <h3 className="text-2xl font-semibold mb-4 text-red-400">Breaking Barriers, Not Systems</h3>
                <p className="text-gray-400 mb-4">
                  At TechGuard Solutions, we're on a mission to democratize high-grade security. We believe every entity, regardless of size, deserves fort knox-level protection.
                </p>
                <p className="text-gray-400 mb-4">
                  Our elite team of white-hat hackers provides top-tier security solutions at a fraction of the cost. This very website? Crafted in 10 minutes for just $40, showcasing our efficiency without compromising on security.
                </p>
                <p className="text-gray-400">
                  By leveraging cutting-edge tech and our vast experience in the cybersecurity trenches, we pass on significant savings to our clients. Your security is our mission, and it doesn't have to break the bank.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-red-500">
              Our Arsenal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  className="bg-gray-900 p-6 rounded-lg shadow-lg border border-red-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-red-400">{service.name}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="expertise" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-red-500">
              Our Battleground
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-black p-6 rounded-lg shadow-lg border border-red-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-red-400">Offensive Security</h3>
                <p className="text-gray-400 mb-4">
                  Our team of ethical hackers puts your systems to the test, identifying vulnerabilities before the bad guys do. We employ advanced penetration testing techniques to ensure your defenses are battle-ready.
                </p>
                <ul className="list-disc list-inside text-gray-400">
                  <li>Advanced Persistent Threat (APT) Simulation</li>
                  <li>Social Engineering Assessments</li>
                  <li>Red Team Operations</li>
                  <li>Vulnerability Assessment and Penetration Testing (VAPT)</li>
                </ul>
              </motion.div>
              <motion.div
                className="bg-black p-6 rounded-lg shadow-lg border border-red-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-red-400">Defensive Strategies</h3>
                <p className="text-gray-400 mb-4">
                  We don't just find the gaps; we fortify them. Our defensive strategies are designed to create an impenetrable shield around your digital assets.
                </p>
                <ul className="list-disc list-inside text-gray-400">
                  <li>Security Information and Event Management (SIEM)</li>
                  <li>Intrusion Detection and Prevention Systems (IDPS)</li>
                  <li>Zero Trust Architecture Implementation</li>
                  <li>Incident Response and Threat Hunting</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-red-500">
              Initiate Secure Comms
            </h2>
            <motion.form
              className="max-w-lg mx-auto bg-gray-900 p-8 rounded-lg shadow-lg border border-red-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-semibold text-red-400">Codename</label>
                <input type="text" id="name" className="w-full px-4 py-2 rounded bg-black text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-700" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-semibold text-red-400">Secure Channel (Email)</label>
                <input type="email" id="email" className="w-full px-4 py-2 rounded bg-black text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-700" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2 font-semibold text-red-400">Encrypted Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-2 rounded bg-black text-red-500 focus:outline-none  focus:ring-2 focus:ring-red-500 border border-red-700" required></textarea>
              </div>
              <motion.button
                className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-colors"
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Transmit
              </motion.button>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="bg-black text-red-500 py-8 border-t border-red-700">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 TechGuard Solutions. All rights secured.</p>
          <div className="mt-4">
            <a href="#" className="text-red-400 hover:text-red-300 mx-2">Privacy Policy</a>
            <a href="#" className="text-red-400 hover:text-red-300 mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}