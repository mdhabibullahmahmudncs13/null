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

  // Define dot grid patterns
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
                className="w-1 h-1 bg-gray rounded-sm"
              />
            ))}
        </div>
      ));
  };

  if (!skillsData || !imagesData) {
    return <div>Loading...</div>;
  }

  return (
    <section id="skills" className="w-full max-w-[1024px] mx-auto py-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="inline-flex items-start">
          <span className="font-medium text-[32px] [font-family:'Fira_Code',Helvetica] text-app-primary">
            #
          </span>
          <span className="font-medium text-[32px] [font-family:'Fira_Code',Helvetica] text-white">
            {skillsData.sectionTitle}
          </span>
        </div>
        <Separator className="flex-1" />
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Left side decorative elements */}
        <div className="w-full md:w-[349px] relative">
          <div className="flex flex-col w-[63px] h-[63px] items-start justify-between absolute top-[38px] left-0">
            {createDotGrid()}
          </div>

          <div className="flex flex-col w-[63px] h-[63px] items-start justify-between absolute top-[143px] left-[177px]">
            {createDotGrid()}
          </div>

          <div className="absolute w-[52px] h-[52px] top-[193px] left-[297px] border border-solid border-[#abb2bf]" />

          <div className="absolute w-[86px] h-[86px] top-0 left-[227px] border border-solid border-[#abb2bf]" />

          <div className="absolute w-[113px] h-[113px] top-[169px] left-[15px]">
            <div className="relative w-[114px] h-[114px] -left-px">
              <img
                className="absolute w-14 h-[85px] top-0 left-[58px]"
                alt="Union"
                src={imagesData.decorative.union}
              />
              <img
                className="absolute w-[58px] h-[87px] top-[27px] left-0"
                alt="Union"
                src={imagesData.decorative.union3}
              />
            </div>
          </div>
        </div>

        {/* Right side skill cards */}
        <div className="w-full md:w-[584px] flex flex-wrap gap-4">
          {skillsData.categories.map((category, index) => (
            <Card
              key={`category-${index}`}
              className="border border-solid border-[#abb2bf] rounded-none shadow-none bg-transparent"
            >
              <CardHeader className="px-2 py-2 pb-0">
                <CardTitle className="[font-family:'Fira_Code',Helvetica] font-semibold text-white text-base">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <Separator className="w-full h-px" />
              <CardContent className="px-2 py-2">
                {category.skills.map((skillRow, rowIndex) => (
                  <div
                    key={`row-${rowIndex}`}
                    className="inline-flex items-start gap-2 mb-2 last:mb-0"
                  >
                    {skillRow.map((skill, skillIndex) => (
                      <span
                        key={`skill-${skillIndex}`}
                        className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base"
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