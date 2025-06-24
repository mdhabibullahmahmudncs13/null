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
                className="relative w-1 h-1 bg-gray rounded-sm"
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
    <section id="about" className="flex flex-col w-full max-w-[1025px] mx-auto py-16">
      <div className="flex w-full items-center gap-4 mb-16">
        <div className="inline-flex items-start">
          <span className="font-medium text-[32px] [font-family:'Fira_Code',Helvetica] text-app-primary">
            #
          </span>
          <span className="font-medium text-[32px] [font-family:'Fira_Code',Helvetica] text-white">
            about-me
          </span>
        </div>
        <Separator className="flex-1 h-px" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div className="flex-1">
          <Card className="border-0 bg-transparent">
            <CardContent className="p-0">
              <p className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base leading-[26px] mb-8">
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
                className="border border-solid border-[#c778dd] rounded-none px-4 py-2 h-auto bg-transparent hover:bg-[#c778dd]/10"
                onClick={handleReadMoreClick}
              >
                <span className="[font-family:'Fira_Code',Helvetica] font-medium text-white text-base">
                  Read more -&gt;
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="relative w-full md:w-[343px]">
          <Card className="border-0 bg-transparent h-full">
            <CardContent className="p-0 relative">
              <img
                className="w-full h-auto object-cover"
                alt={imagesData.about.alt}
                src={imagesData.about.profileImage}
              />

              {/* Top left dot pattern */}
              <div className="flex flex-col w-[84px] h-[84px] items-start justify-between absolute top-[59px] left-0">
                {createDotPattern(5, 5)}
              </div>

              {/* Bottom right dot pattern */}
              <div className="flex flex-col w-[104px] h-14 items-start justify-between absolute top-[279px] right-4">
                {createDotPattern(4, 5)}
              </div>
            </CardContent>
          </Card>
          <Separator className="w-[271px] mx-auto mt-0" />
        </div>
      </div>
    </section>
  );
};