import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const HeroSection = (): JSX.Element => {
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
              className="relative w-1 h-1 bg-gray rounded-sm"
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

  return (
    <section id="home" className="flex justify-between items-center w-full max-w-[1024px] mx-auto py-16 min-h-[500px]">
      {/* Left content - Text and CTA */}
      <div className="flex flex-col gap-8 max-w-[541px]">
        <h1 className="text-[32px] font-normal [font-family:'Fira_Code',Helvetica] text-white leading-normal">
          <span className="font-semibold text-white">Md Habibullah Mahmud is a </span>
          <span className="font-semibold text-app-primary">Software Engineer</span>
          <span className="font-semibold text-white"> and </span>
          <span className="font-semibold text-app-primary">
            Full-Stack Developer
          </span>
        </h1>

        <p className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base leading-[25px] max-w-[463px]">
          He crafts scalable web applications and mobile solutions with modern technologies
        </p>

        <Button
          variant="outline"
          className="w-fit px-4 py-2 border border-solid border-app-primary bg-transparent rounded-none hover:bg-app-primary/10"
          onClick={handleContactClick}
        >
          <span className="[font-family:'Fira_Code',Helvetica] font-medium text-white text-base">
            Contact me!!
          </span>
        </Button>
      </div>

      {/* Right content - Image and decorative elements */}
      <div className="relative w-[469px] h-[386px] flex-shrink-0">
        {/* Geometric decorative shapes - positioned behind */}
        <div className="absolute w-[155px] h-[155px] top-[84px] left-0 z-0">
          <div className="relative w-[156px] h-[156px] -top-px">
            {/* Purple geometric shapes */}
            <div className="absolute w-[78px] h-[116px] top-10 left-0 border-2 border-app-primary opacity-60" />
            <div className="absolute w-20 h-[118px] top-0 left-[76px] border-2 border-app-primary opacity-40" />
          </div>
        </div>

        {/* Main person image */}
        <div className="absolute w-[350px] h-[386px] right-0 top-0 z-10">
          <img
            className="w-full h-full object-cover object-center"
            alt="Developer profile"
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
        </div>

        {/* Dot pattern decoration - top right */}
        <div className="flex flex-col w-[84px] h-[84px] items-start justify-between absolute top-0 right-[280px] z-20">
          {dotGrid}
        </div>

        {/* Additional geometric elements */}
        <div className="absolute w-[60px] h-[60px] top-[200px] left-[50px] border border-app-primary opacity-50 z-0" />
        <div className="absolute w-[40px] h-[40px] top-[150px] left-[200px] border border-gray opacity-30 z-0" />

        {/* Status indicator */}
        <Card className="absolute bottom-[-20px] left-[31px] w-[350px] bg-app-background border-gray rounded-none z-30">
          <CardContent className="flex items-center gap-2.5 p-3">
            <div className="relative w-4 h-4 bg-app-primary border border-solid border-app-primary" />
            <p className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base">
              <span className="font-medium text-gray">
                Currently working on{" "}
              </span>
              <span className="font-semibold text-white">Portfolio</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};