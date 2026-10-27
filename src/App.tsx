/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { AboutSection } from './components/AboutSection';
import { Domains } from './components/Domains';
import { Projects } from './components/Projects';
import { InteractiveConsole } from './components/InteractiveConsole';
import { Process } from './components/Process';
import { TechArsenal } from './components/TechArsenal';
import { AuditsCompliance } from './components/AuditsCompliance';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToContact = () => {
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projetos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-[#F5F0E9] overflow-x-hidden selection:bg-[#E82626] selection:text-white">
      {/* Texture Layer 1: Subtle Film Grain Overlay */}
      <div className="fixed inset-0 grain-overlay z-40 pointer-events-none" />

      {/* Texture Layer 2: Vignette Radial Gradient */}
      <div className="fixed inset-0 vignette-overlay z-0 pointer-events-none" />

      {/* Main App Content Flow */}
      <div className="relative z-10 flex flex-col">
        {/* Floating Top Navbar */}
        <Navbar onOpenContact={scrollToContact} />

        <main id="main-content">
          {/* Hero Section with Massive Display Typography and 3D Cyber Globe */}
          <Hero
            onOpenContact={scrollToContact}
            onExploreProjects={scrollToProjects}
          />

          {/* Quantitative Metrics Bar */}
          <Metrics />

          {/* Narrative / Engineering Ethos & Profile Manifest */}
          <AboutSection />

          {/* 01-04 Domains of Expertise (Cybersecurity, Web Dev, Hardware, Infra T.I.) */}
          <Domains />

          {/* Selected Projects, Exploits & Interactive Technical Anatomy */}
          <Projects />

          {/* Interactive Cybersecurity CLI Terminal Simulator */}
          <InteractiveConsole onOpenContact={scrollToContact} />

          {/* 5-Step Methodology & Audit Pipeline */}
          <Process />

          {/* Hardware Workbench, Technical Stack & Compliance Frameworks */}
          <TechArsenal />

          {/* Testimonials & Proof of Work */}
          <AuditsCompliance />

          {/* Contact Section with Direct Email, PGP Fingerprint & Encrypted Form */}
          <ContactSection />
        </main>

        {/* Footer with Colossal Wordmark Closure */}
        <Footer />
      </div>
    </div>
  );
}
