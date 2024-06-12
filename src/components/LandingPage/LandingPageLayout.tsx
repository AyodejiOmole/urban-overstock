'use client';
import React from 'react'
import Navbar from '../Navbar';
import Hero from './Hero';
import Features from './Features';
import AboutUs from './AboutUs';
import WhyUs from './WhyUs';
import Testimonials from './Testimonials';
import FindYourStyle from './FindYourStyle';
import { Footer } from '../Footer';
import { useState, useEffect } from 'react';
import Button from '../Global/Button';

const LandingPageLayout = () => {
    const [showPopup, setShowPopup] = useState<boolean>(true);
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    if (storedConsent !== null) {
      setCookieConsent(storedConsent === 'true');
      setShowPopup(false);
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent(true);
    localStorage.setItem('cookieConsent', 'true');
    // onAccept();
    setShowPopup(false);
  };

  const handleDecline = () => {
    setCookieConsent(false);
    localStorage.setItem('cookieConsent', 'false');
    // onDecline();
    setShowPopup(false);
  };

  return (
    <div>
        <Navbar />
        <Hero />
        <Features />
        <AboutUs />
        <WhyUs />
        <Testimonials />
        <FindYourStyle />
        <Footer />
        {/* <!-- Popup container --> */}
        {showPopup && 
            <div className="fixed bottom-0 right-0 m-4 p-4 bg-white rounded shadow-md z-20">
                <h3>Cookies consent form</h3>
                {/* <!-- Popup content --> */}
                <div className="text-sm">
                    We use cookies to improve your experience on our website. 
                    By continuing to browse, you agree to our use of cookies. You can adjust your cookie settings below.
                </div>

                <div className='mt-4 flex justify-between items-center'>
                    <Button
                        onClick={handleDecline}
                        variant='outlined'
                        size='small'
                    >
                        Decline cookies
                    </Button>

                    <Button
                        onClick={handleAccept}
                        variant='fill'
                        size='small'
                    >
                        Accept cookies
                    </Button>
                </div>
            </div>
        }
    </div>
  )
}

export default LandingPageLayout;