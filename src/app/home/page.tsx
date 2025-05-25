'use client';

import React from 'react';
import { DuckHeroSection } from '../components/DuckHeroSection';
import PromoHeader from '../components/PromoHeader';

const Hero = () => {
  return (
    <div className="space-y-8">
      <PromoHeader />
      {/* Custom Configuration Example */}
      <DuckHeroSection
        title="Only Pato"
        subtitle="Si hay pato en la mesa, que venga el sake y la sobremesa."
        buttonText="Explore"
        backgroundColor=""
        duckCount={8}
        onButtonClick={() => alert('Custom button clicked!')}
      />
    </div>
  );
};

export default Hero;