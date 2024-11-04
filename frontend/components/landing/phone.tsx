import React from 'react'

const PhoneVideo = () => {
  return (
        <div className="relative w-[300px] h-[600px]">
      {/* iPhone Frame */}
      <div className="absolute inset-0 bg-[#1F1F1F] rounded-[50px] p-4 shadow-xl overflow-hidden">
        {/* Top Notch Area */}
        
        {/* Side Buttons */}
        <div className="absolute left-[-2px] top-24 w-1 h-10 bg-gray-800 rounded-r" />
        <div className="absolute left-[-2px] top-40 w-1 h-12 bg-gray-800 rounded-r" />
        <div className="absolute right-[-2px] top-32 w-1 h-14 bg-gray-800 rounded-l" />
        
        {/* Screen Content */}
        <div className="h-full w-full bg-black rounded-[40px] overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/info-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}

export default PhoneVideo
