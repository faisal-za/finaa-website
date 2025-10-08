import React from 'react'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-[#f7f2ee] flex items-center justify-center z-50">
      {/* Background architectural pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={`vertical-${i}`}
            className="absolute bg-[#302c30] animate-pulse"
            style={{
              left: `${(i + 1) * 12}%`,
              top: 0,
              bottom: 0,
              width: '1px',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`horizontal-${i}`}
            className="absolute bg-[#302c30] animate-pulse"
            style={{
              top: `${(i + 1) * 16}%`,
              left: 0,
              right: 0,
              height: '1px',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with pulse effect */}
        <div className="relative mb-8">
          <div className="animate-pulse" style={{ animationDuration: '2s' }}>
            <Image
              src="/Finaa-Logo.svg"
              alt="Finaa Design & Build"
              width={160}
              height={60}
              className="opacity-90"
            />
          </div>
        </div>

        {/* Animated building blocks */}
        <div className="flex items-end gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-[#9c5748] animate-bounce"
              style={{
                width: '8px',
                height: `${(i + 1) * 8 + 16}px`,
                clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s',
              }}
            />
          ))}
        </div>

      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#9c5748] opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Loading