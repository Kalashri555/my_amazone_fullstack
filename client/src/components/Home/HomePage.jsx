import React from 'react'
import iphone from "../../assets/iphone-14.png";
import mac from "../../assets/mac_system.png";
import HeroSection from './HeroSection'
import FeaturedProducts from './FeaturedProducts';

const HomePage = () => {
  return (
    <div>
      <HeroSection title="Buy iPhone 14 Pro" subtitle="Experience the
      power of the latest iphone 14 with high camera ever" 
      link="/" image={iphone} />
    
      <FeaturedProducts />      

      <HeroSection 
           title="Build the ultimate setup"
           subtitle="you can add studio Display
           and color-matched Magic accessories 
           to your bag after configure your Mac mini."
           link='/'
           image={mac} 
           />
    </div>
  )
}

export default HomePage
