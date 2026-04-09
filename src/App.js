import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WOW from 'wow.js';
import 'wow.js/css/libs/animate.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import CTA from './components/CTA';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import BackToTop from './components/BackToTop';
import NotFound from './components/NotFound';
import SEO from './components/SEO';

function Home() {
  return (
    <>
      <SEO />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none flex-1 w-full min-w-0">
        <Hero />
        <About />
        <Services />
        <CTA />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

function App() {
  useEffect(() => {
    // Initialize WOW.js
    const wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    });
    wow.init();

    // Hide spinner
    const spinner = document.getElementById('spinner');
    if (spinner) {
      setTimeout(() => {
        spinner.classList.remove('show');
        spinner.classList.add('opacity-0', 'invisible');
      }, 1);
    }

    // Sticky navbar
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 0) {
        navbar?.classList.add('fixed', 'top-0', 'navbar-scrolled', 'shadow-lg');
      } else {
        navbar?.classList.remove('fixed', 'top-0', 'navbar-scrolled', 'shadow-lg');
      }

      // Back to top button
      const backToTop = document.querySelector('.back-to-top');
      if (window.scrollY > 300) {
        backToTop?.classList.remove('hidden');
        backToTop?.classList.add('flex');
      } else {
        backToTop?.classList.add('hidden');
        backToTop?.classList.remove('flex');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="App min-h-dvh flex flex-col w-full min-w-0 overflow-x-hidden bg-background text-foreground dark:bg-black dark:text-gray-300">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Spinner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
