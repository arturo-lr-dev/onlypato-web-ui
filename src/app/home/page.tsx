'use client';

import React, { useEffect, useMemo } from 'react';
import { DuckHeroSection } from '../components/DuckHeroSection';
import PromoHeader from '../components/PromoHeader';
import { DuckMenu } from '../components/DuckMenu';

const Hero = () => {

  function gtag_report_conversion() {
    var callback = function () {
      
    };

    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-716306015/G5nLCJahifoYEN_sx9UC',
        'event_callback': callback
      });
    }
    return false;
  }

  useEffect(() => {
    gtag_report_conversion();
  }, []);

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

      <DuckMenu />
    </div>
  );
};

export default Hero;