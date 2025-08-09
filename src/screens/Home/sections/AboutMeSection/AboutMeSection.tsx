import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { usePersonalData, useImagesData } from "../../../../hooks/useJsonData";

export const AboutMeSection = (): JSX.Element => {
  const personalData = usePersonalData();
  const imagesData = useImagesData();

  // Dot pattern data for reusability
  const createDotPattern = (rows: number, cols: number) => {
    return Array(rows)
      .fill(0)
      .map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]"
        >
          {Array(cols)
            .fill(0)
            .map((_, colIndex) => (
              <div
                key={`dot-${rowIndex}-${colIndex}`}
                className="relative w-1 h-1 bg-app-primary rounded-sm cyber-pulse"
              />
            ))}
        </div>
      ));
  };

  const handleReadMoreClick = () => {
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
    <section id="about" className="flex flex-col w-full max-w-[1025px] mx-auto py-8 sm:py-12 lg:py-16">
      <div className="flex w-full items-center gap-4 mb-8 sm:mb-12 lg:mb-16">
        <div className="inline-flex items-start">
          <span className="font-medium text-2xl sm:text-[32px] [font-family:'Fira_Code',Helvetica] text-app-primary cyber-text-glow">
            #
          </span>
          <span className="font-medium text-2xl sm:text-[32px] [font-family:'Fira_Code',Helvetica] text-white">
            about-me
          </span>
        </div>
        <Separator className="flex-1 h-px bg-app-primary/30" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
        <div className="flex-1 order-2 lg:order-1">
          <Card className="border-0 bg-transparent">
            <CardContent className="p-0">
              <p className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-sm sm:text-base leading-[22px] sm:leading-[26px] mb-6 sm:mb-8">
                {personalData.bio.greeting}
                <br />
                <br />
                {personalData.bio.paragraphs.map((paragraph, index) => (
                  <React.Fragment key={index}>
                    {paragraph}
                    {index < personalData.bio.paragraphs.length - 1 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </p>

              <Button
                variant="outline"
                className="border-2 border-solid border-app-primary rounded-none px-4 py-2 h-auto bg-transparent hover:bg-app-primary/20 cyber-glow transition-all duration-300"
                onClick={handleReadMoreClick}
              >
                <span className="[font-family:'Fira_Code',Helvetica] font-medium text-app-primary text-sm sm:text-base">
                  Read more &gt;
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="relative w-full lg:w-[343px] order-1 lg:order-2">
          <Card className="border-0 bg-transparent h-full">
            <CardContent className="p-0 relative">
              <img
                className="w-full h-auto object-cover filter brightness-110 contrast-110"
                alt={imagesData.about.alt}
                src={imagesData.about.profileImage}
              />

              {/* Top left dot pattern - Hidden on mobile */}
              <div className="hidden sm:flex flex-col w-[50px] h-[50px] lg:w-[84px] lg:h-[84px] items-start justify-between absolute top-[40px] lg:top-[59px] left-0">
                {createDotPattern(5, 5)}
              </div>

              {/* Bottom right dot pattern - Hidden on mobile */}
              <div className="hidden sm:flex flex-col w-[60px] h-8 lg:w-[104px] lg:h-14 items-start justify-between absolute top-[200px] lg:top-[279px] right-2 lg:right-4">
                {createDotPattern(4, 5)}
              </div>
            </CardContent>
          </Card>
          <Separator className="w-full lg:w-[271px] mx-auto mt-0 bg-app-primary/30" />
        </div>
      </div>
    </section>
  );
};