"use client";
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const TeamsSection = dynamic(() => import('@/components/TeamsSection'), { ssr: false });
const UpcomingEvents = dynamic(() => import('@/components/UpcomingEvents'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Hero />
      <About />
      <UpcomingEvents/>
      <TeamsSection />
    </main>
  );
}