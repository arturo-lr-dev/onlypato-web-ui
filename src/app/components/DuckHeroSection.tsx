import Image from "next/image";
import { DuckIcon } from "./DuckIcon";
import EnhancedCTAButton from "./LiquidBlueButton";
import LiquidBlueButton from "./LiquidBlueButton";

export const DuckHeroSection = ({
    title = "Only Pato",
    subtitle = "Discover amazing experiences with our minimalist approach",
    buttonText = "Get Started",
    onButtonClick = () => console.log('Button clicked'),
    backgroundColor = "bg-blue-50",
    showDucks = true,
    duckCount = 12
  }) => {
    // Generate random positions for floating ducks
    const generateDuckPositions = () => {
      const positions = [];
      for (let i = 0; i < duckCount; i++) {
        positions.push({
          left: Math.random() * 80 + 10, // 10% to 90%
          top: Math.random() * 10 + 5,  // 20% to 80%
          size: Math.random() * 0.5 + 0.5, // 0.5 to 1.0 scale
          delay: Math.random() * 2 // 0 to 2 seconds delay
        });
      }
      return positions;
    };
  
    const duckPositions = showDucks ? generateDuckPositions() : [];
  
    return (
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${backgroundColor}`}>
        {/* Floating Ducks Background */}
        {showDucks && (
          <div className="absolute inset-0 pointer-events-none">
            {duckPositions.map((duck, index) => (
              <div
                key={index}
                className="absolute animate-pulse opacity-20"
                style={{
                  left: `${duck.left}%`,
                  top: `${duck.top}%`,
                  transform: `scale(${duck.size})`,
                  animationDelay: `${duck.delay}s`
                }}
              >
                <DuckIcon />
              </div>
            ))}
          </div>
        )}
  
        {/* Main Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Central Duck Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="">
                <Image src="/logo.png" width={247} height={247} alt={title} />
              </div>
              {/* Decorative circles around main duck */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
  
          {/* Title with liquid effect */}
          {false & <h1 className="text-6xl md:text-8xl font-bold text-blue-600 mb-6 relative">
            <span className="relative inline-block">
              {title.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block hover:animate-bounce transition-all duration-300 hover:text-blue-800"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    filter: 'drop-shadow(2px 2px 0px rgba(59, 130, 246, 0.3))'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h1>}
  
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-900 mb-12 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
  
          {/* CTA Button */}
          <LiquidBlueButton />
  
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-2 h-16 bg-blue-300 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-3 h-8 bg-blue-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 right-8 w-1 h-12 bg-blue-500 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
      </section>
    );
  };