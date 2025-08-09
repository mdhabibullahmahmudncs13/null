import { FigmaIcon, GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import React from "react";
import { Separator } from "../../../../components/ui/separator";
import { usePersonalData } from "../../../../hooks/useJsonData";

export const FooterSection = (): JSX.Element => {
  const personalData = usePersonalData();

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray hover:text-app-primary transition-colors" />;
      case 'linkedin':
        return <LinkedinIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray hover:text-app-primary transition-colors" />;
      case 'figma':
        return <FigmaIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray hover:text-app-primary transition-colors" />;
      case 'mail':
        return <MailIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray hover:text-app-primary transition-colors" />;
      default:
        return <GithubIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray hover:text-app-primary transition-colors" />;
    }
  };

  if (!personalData) {
    return <div>Loading...</div>;
  }

  return (
    <footer className="w-full flex flex-col items-center gap-6 sm:gap-8 py-6 sm:py-8 bg-transparent">
      <Separator className="w-full bg-app-primary/30" />

      <div className="flex flex-col items-center gap-8 sm:gap-12 w-full max-w-[1025px] px-4">
        <div className="flex flex-col lg:flex-row w-full items-center lg:items-start justify-between gap-6 lg:gap-0">
          <div className="flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-[9px]">
                <div className="relative w-3 h-3 sm:w-4 sm:h-4 bg-[url(/union-1.svg)] bg-[100%_100%] filter brightness-0 invert"
                     style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(3207%) hue-rotate(130deg) brightness(101%) contrast(101%)' }} />
                <div className="font-medium text-app-primary text-sm sm:text-base [font-family:'Fira_Code',Helvetica] cyber-text-glow">
                  {personalData.shortName}
                </div>
              </div>

              <a
                className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-sm sm:text-base hover:text-app-secondary transition-colors duration-300 break-all"
                href={`mailto:${personalData.email}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {personalData.email}
              </a>
            </div>

            <div className="[font-family:'Fira_Code',Helvetica] font-normal text-white text-sm sm:text-base">
              {personalData.footer.description}
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start gap-3">
            <div className="text-lg sm:text-2xl [font-family:'Fira_Code',Helvetica] font-medium text-app-primary cyber-text-glow">
              Media
            </div>

            <div className="flex gap-2 sm:gap-3">
              {personalData.footer.socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  aria-label={link.name} 
                  className="transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getIcon(link.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-xs sm:text-base text-center">
          {personalData.footer.copyright}
        </div>
      </div>
    </footer>
  );
};