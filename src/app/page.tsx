import { Footer } from '@/components/Footer';
import AboutUs from '@/components/LandingPage/AboutUs';
import Features from '@/components/LandingPage/Features';
import FindYourStyle from '@/components/LandingPage/FindYourStyle';
import Hero from '@/components/LandingPage/Hero';
import Testimonials from '@/components/LandingPage/Testimonials';
import WhyUs from '@/components/LandingPage/WhyUs';
import Navbar from '@/components/Navbar';
import ENDPOINTS from '@/config/ENDPOINTS';
import React from 'react';

interface ISetting {
  id: string | number;
  name: string;
  value: any;
  group: string;
  createdAt: string;
  updatedAt: string;
}

async function getAllSettings() {
  const baseUrl = process.env.NEXT_PUBLIC_USER_API_BASE_URL;

  const apiRes = await fetch(
    `${baseUrl}/api/v1/${ENDPOINTS.LANDING_PAGE_SETTINGS}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const res = await apiRes.json();

  if (!res.status) throw new Error('Failed to fetch categories');

  return res.data;
}

export default async function Page() {
  const settings: Promise<ISetting[]> = getAllSettings();
  const settingsData = await settings;

  console.log(settingsData);

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <AboutUs />
      <WhyUs />
      <Testimonials />
      <FindYourStyle />
      <Footer />
    </>
  );
}
