import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { usePersonalData, useImagesData } from "../../../../hooks/useJsonData";

export const HeroSection = (): JSX.Element => {
  const personalData = usePersonalData();
  const imagesData = useImagesData();

  // Create a 5x5 grid of dots for the decorative element
  const dotGrid = Array(5)
    .fill(null)
    .map((_, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]"
      >
        {Array(5)
          .fill(null)
          .map((_, colIndex) => (
            <div
              key={`dot-${rowIndex}-${colIndex}`}
              className="relative w-1 h-1 bg-app-primary rounded-sm cyber-pulse"
            />
          ))}
      </div>
    ));

  const handleContactClick = () => {
    const element = document.querySelector('#contacts');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!personalData || !imagesData) {
    return <div>Loading...</div>;
  }

  return (
    <section id="home" className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[1024px] mx-auto py-8 sm:py-12 lg:py-16 min-h-[400px] sm:min-h-[500px] relative gap-8 lg:gap-0">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      
      {/* Left content - Text and CTA */}
      <div className="flex flex-col gap-6 lg:gap-8 max-w-full lg:max-w-[541px] relative z-10 text-center lg:text-left">
        <h1 className="text-xl sm:text-2xl lg:text-[32px] font-normal [font-family:'Fira_Code',Helvetica] text-white leading-normal">
          <span className="font-semibold text-white">{personalData.name} is a </span>
          <span className="font-semibold text-app-primary cyber-text-glow">{personalData.title}</span>
          <span className="font-semibold text-white"> and </span>
          <span className="font-semibold text-app-secondary cyber-text-glow">
            {personalData.subtitle}
          </span>
        </h1>

        <p className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-sm sm:text-base leading-[25px] max-w-full lg:max-w-[463px]">
          {personalData.description}
        </p>

        <Button
          variant="outline"
          className="w-fit mx-auto lg:mx-0 px-4 sm:px-6 py-2 sm:py-3 border-2 border-app-primary bg-transparent rounded-none hover:bg-app-primary/20 cyber-glow transition-all duration-300 cyber-scan-line"
          onClick={handleContactClick}
        >
          <span className="[font-family:'Fira_Code',Helvetica] font-medium text-app-primary text-sm sm:text-base">
            Contact me!!
          </span>
        </Button>
      </div>

      {/* Right content - Image and decorative elements */}
      <div className="relative w-full max-w-[350px] lg:w-[469px] h-[300px] sm:h-[350px] lg:h-[386px] flex-shrink-0 order-first lg:order-last">
        {/* Cyber geometric decorative shapes - Hidden on mobile */}
        <div className="hidden sm:block absolute w-[100px] h-[100px] lg:w-[155px] lg:h-[155px] top-[60px] lg:top-[84px] left-0 z-0">
          <div className="relative w-full h-full">
            {/* Neon geometric shapes */}
            <div className="absolute w-[50px] h-[75px] lg:w-[78px] lg:h-[116px] top-6 lg:top-10 left-0 border-2 border-app-primary cyber-glow opacity-80" />
            <div className="absolute w-[50px] h-[75px] lg:w-20 lg:h-[118px] top-0 left-[48px] lg:left-[76px] border-2 border-app-secondary cyber-glow opacity-60" />
          </div>
        </div>

        {/* Main person image with cyber effect */}
        <div className="absolute w-full h-full right-0 top-0 z-10 cyber-scan-line">
          <img
            className="w-full h-full object-contain object-center filter brightness-110 contrast-110"
            alt={imagesData.hero.alt}
            src={imagesData.hero.profileImage}
          />
        </div>

        {/* Cyber dot pattern decoration - Hidden on mobile */}
        <div className="hidden sm:flex flex-col w-[50px] h-[50px] lg:w-[84px] lg:h-[84px] items-start justify-between absolute top-0 right-[100px] lg:right-[280px] z-20">
          {dotGrid}
        </div>

        {/* Additional cyber geometric elements - Hidden on mobile */}
        <div className="hidden sm:block absolute w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] top-[150px] lg:top-[200px] left-[30px] lg:left-[50px] border-2 border-app-accent cyber-glow opacity-70 z-0" />
        <div className="hidden sm:block absolute w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] top-[120px] lg:top-[150px] left-[150px] lg:left-[200px] border border-app-secondary opacity-50 z-0" />

        {/* Cyber status indicator */}
        <Card className="absolute bottom-0 left-0 right-0 lg:left-[31px] lg:right-auto w-full lg:w-[350px] bg-app-background/80 backdrop-blur-sm border-app-primary cyber-glow rounded-none z-30">
          <CardContent className="flex items-center gap-2.5 p-2 sm:p-3">
            <div className="relative w-3 h-3 sm:w-4 sm:h-4 bg-app-primary border border-solid border-app-primary cyber-pulse" />
            <p className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-xs sm:text-base">
              <span className="font-medium text-gray">
                Currently working on{" "}
              </span>
              <span className="font-semibold text-app-primary">{personalData.currentWork}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};