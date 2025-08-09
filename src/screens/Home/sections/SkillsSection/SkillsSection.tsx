import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useSkillsData, useImagesData } from "../../../../hooks/useJsonData";

export const SkillsSection = (): JSX.Element => {
  const skillsData = useSkillsData();
  const imagesData = useImagesData();

  // Define dot grid patterns with cyber styling
  const createDotGrid = (rows = 5, cols = 5) => {
    return Array(rows)
      .fill(0)
      .map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="flex items-start justify-between w-full"
        >
          {Array(cols)
            .fill(0)
            .map((_, colIndex) => (
              <div
                key={`dot-${rowIndex}-${colIndex}`}
                className="w-1 h-1 bg-app-primary rounded-sm cyber-pulse"
              />
            ))}
        </div>
      ));
  };

  if (!skillsData || !imagesData) {
    return <div>Loading...</div>;
  }

  return (
    <section id="skills" className="w-full max-w-[1024px] mx-auto py-8 sm:py-12 lg:py-16 relative">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      
      <div className="flex items-center gap-4 mb-6 sm:mb-8 relative z-10">
        <div className="inline-flex items-start">
          <span className="font-medium text-2xl sm:text-[32px] [font-family:'Fira_Code',Helvetica] text-app-primary cyber-text-glow">
            #
          </span>
          <span className="font-medium text-2xl sm:text-[32px] [font-family:'Fira_Code',Helvetica] text-white">
            {skillsData.sectionTitle}
          </span>
        </div>
        <Separator className="flex-1 bg-app-primary/30" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 relative z-10">
        {/* Left side decorative elements - Hidden on mobile */}
        <div className="hidden lg:block w-full lg:w-[349px] relative">
          <div className="flex flex-col w-[40px] h-[40px] lg:w-[63px] lg:h-[63px] items-start justify-between absolute top-[38px] left-0">
            {createDotGrid()}
          </div>

          <div className="flex flex-col w-[40px] h-[40px] lg:w-[63px] lg:h-[63px] items-start justify-between absolute top-[143px] left-[120px] lg:left-[177px]">
            {createDotGrid()}
          </div>

          <div className="absolute w-[35px] h-[35px] lg:w-[52px] lg:h-[52px] top-[193px] left-[200px] lg:left-[297px] border-2 border-solid border-app-secondary cyber-glow" />

          <div className="absolute w-[60px] h-[60px] lg:w-[86px] lg:h-[86px] top-0 left-[150px] lg:left-[227px] border-2 border-solid border-app-primary cyber-glow" />

          <div className="absolute w-[80px] h-[80px] lg:w-[113px] lg:h-[113px] top-[169px] left-[15px]">
            <div className="relative w-full h-full">
              <img
                className="absolute w-8 h-12 lg:w-14 lg:h-[85px] top-0 right-0 filter brightness-0 invert"
                style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(3207%) hue-rotate(130deg) brightness(101%) contrast(101%)' }}
                alt="Union"
                src={imagesData.decorative.union}
              />
              <img
                className="absolute w-8 h-12 lg:w-[58px] lg:h-[87px] top-4 lg:top-[27px] left-0 filter brightness-0 invert"
                style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(3207%) hue-rotate(130deg) brightness(101%) contrast(101%)' }}
                alt="Union"
                src={imagesData.decorative.union3}
              />
            </div>
          </div>
        </div>

        {/* Right side skill cards */}
        <div className="w-full lg:w-[584px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {skillsData.categories.map((category, index) => (
            <Card
              key={`category-${index}`}
              className="border-2 border-app-primary/30 rounded-none shadow-none bg-app-background/50 backdrop-blur-sm hover:border-app-primary hover:cyber-glow transition-all duration-300 group"
            >
              <CardHeader className="px-2 py-2 pb-0">
                <CardTitle className="[font-family:'Fira_Code',Helvetica] font-semibold text-app-primary text-sm sm:text-base cyber-text-glow group-hover:text-app-secondary transition-colors duration-300">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <Separator className="w-full h-px bg-app-primary/30" />
              <CardContent className="px-2 py-2">
                {category.skills.map((skillRow, rowIndex) => (
                  <div
                    key={`row-${rowIndex}`}
                    className="flex flex-wrap items-start gap-1 sm:gap-2 mb-1 sm:mb-2 last:mb-0"
                  >
                    {skillRow.map((skill, skillIndex) => (
                      <span
                        key={`skill-${skillIndex}`}
                        className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-xs sm:text-base hover:text-app-secondary transition-colors duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};