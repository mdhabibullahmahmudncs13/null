import { LinkedinIcon, GithubIcon, MailIcon } from "lucide-react";
import React from "react";
import { Separator } from "../../components/ui/separator";
import { HackerRankIcon } from "../../components/ui/icons/HackerRankIcon";
import { AboutMeSection } from "./sections/AboutMeSection";
import { AchievementsSection } from "./sections/AchievementsSection";
import { ContactSection } from "./sections/ContactSection";
import { FooterSection } from "./sections/FooterSection";
import { HeaderSection } from "./sections/HeaderSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { QuoteSection } from "./sections/QuoteSection";
import { SkillsSection } from "./sections/SkillsSection";
import { usePersonalData } from "../../hooks/useJsonData";

export const Home = (): JSX.Element => {
  const personalData = usePersonalData();

  // Create dot grid pattern data for reusability
  const dotGridPattern = Array(5).fill(Array(5).fill(0));

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-6 h-6 md:w-8 md:h-8 text-gray hover:text-app-primary transition-colors" />;
      case 'linkedin':
        return <LinkedinIcon className="w-6 h-6 md:w-8 md:h-8 text-gray hover:text-app-primary transition-colors" />;
      case 'mail':
        return <MailIcon className="w-6 h-6 md:w-8 md:h-8 text-gray hover:text-app-primary transition-colors" />;
      case 'hacker':
        return <HackerRankIcon className="w-6 h-6 md:w-8 md:h-8 text-gray hover:text-app-primary transition-colors" />;
      default:
        return <GithubIcon className="w-6 h-6 md:w-8 md:h-8 text-gray hover:text-app-primary transition-colors" />;
    }
  };

  if (!personalData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-app-background flex flex-col items-center w-full min-h-screen">
      <div className="relative w-full max-w-[1366px] overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Fixed social sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex flex-col items-center gap-2 fixed top-0 left-[17px] bg-app-background z-10">
          <Separator className="h-[191px] w-px bg-gray" />
          <div className="flex flex-col items-center gap-2">
            {personalData.socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                aria-label={link.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getIcon(link.icon)}
              </a>
            ))}
          </div>
        </div>

        {/* Main content sections */}
        <HeaderSection />
        <HeroSection />
        <QuoteSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <AboutMeSection />
        <ContactSection />
        <FooterSection />

        {/* Decorative elements - Responsive positioning */}
        <div className="hidden md:block absolute w-[100px] h-[100px] lg:w-[155px] lg:h-[155px] top-[1453px] left-0 border border-solid border-gray opacity-30 pointer-events-none" />
        <div className="hidden md:block absolute w-[100px] h-[100px] lg:w-[155px] lg:h-[155px] top-[800px] right-0 border border-solid border-gray opacity-30 pointer-events-none" />
        <div className="hidden sm:block absolute w-[60px] h-[60px] lg:w-[91px] lg:h-[91px] top-0 right-0 border border-solid border-gray opacity-30 pointer-events-none" />

        {/* Dot grid patterns - Responsive positioning */}
        {[
          { top: "top-[283px]", left: "left-[31px]", display: "hidden lg:inline-flex" },
          { top: "top-[2033px]", left: "left-[26px]", display: "hidden lg:inline-flex" },
          { top: "top-[1622px]", right: "right-[26px]", display: "hidden lg:inline-flex" },
        ].map((position, posIndex) => (
          <div
            key={`dot-grid-${posIndex}`}
            className={`${position.display} flex-col items-start justify-between absolute ${position.top} ${position.left || position.right} w-[63px] h-[63px] lg:w-[103px] lg:h-[103px] opacity-50 pointer-events-none`}
          >
            {dotGridPattern.map((row, rowIndex) => (
              <div
                key={`row-${posIndex}-${rowIndex}`}
                className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]"
              >
                {row.map((_, colIndex) => (
                  <div
                    key={`dot-${posIndex}-${rowIndex}-${colIndex}`}
                    className="relative w-1 h-1 bg-gray rounded-sm"
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};