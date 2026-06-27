import React from 'react'
import hospital from '../components/img/hospital.png'

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
  {/* Left Column */}
  <div className="flex-1 flex items-center justify-center p-8 bg-white">
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Healthcare System</h1>
      <p className="text-lg text-gray-700">
        Our system provides comprehensive health management solutions to ensure you receive the best care possible. Explore our features and services to learn more about how we can assist you in managing your health.
      </p>
    </div>
  </div>

  {/* Right Column */}
  <div className="flex-1 flex items-center justify-center p-8 bg-white">
    <img 
      src={hospital} 
      alt="Healthcare" 
      className="w-full h-auto object-cover rounded-lg" 
      style={{
        opacity: 0.9, /* Slightly reduce opacity */
        backgroundBlendMode: 'multiply' /* Blend the image with the background color */
      }}
    />
  </div>
</div>

  )
}

export default HeroSection
