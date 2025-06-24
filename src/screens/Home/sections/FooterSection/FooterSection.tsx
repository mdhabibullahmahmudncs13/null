import { FigmaIcon, GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import React from "react";
import { Separator } from "../../../../components/ui/separator";
import { usePersonalData } from "../../../../hooks/useJsonData";

export const FooterSection = (): JSX.Element => {
  const personalData = usePersonalData();

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-8 h-8" />;
      case 'linkedin':
        return <LinkedinIcon className="w-8 h-8" />;
      case 'figma':
        return <FigmaIcon className="w-8 h-8" />;
      case 'mail':
        return <MailIcon className="w-8 h-8" />;
      default:
        return <GithubIcon className="w-8 h-8" />;
    }
  };

  if (!personalData) {
    return <div>Loading...</div>;
  }

  return (
    <footer className="w-full flex flex-col items-center gap-8 py-8 bg-transparent">
      <Separator className="w-full" />

      <div className="flex flex-col items-center gap-12 w-full max-w-[1025px]">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-[9px]">
                <div className="relative w-4 h-4 bg-[url(/union-1.svg)] bg-[100%_100%]" />
                <div className="font-medium text-white text-base [font-family:'Fira_Code',Helvetica]">
                  {personalData.shortName}
                </div>
              </div>

              <a
                className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base"
                href={`mailto:${personalData.email}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {personalData.email}
              </a>
            </div>

            <div className="[font-family:'Fira_Code',Helvetica] font-normal text-white text-base">
              {personalData.footer.description}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <div className="text-2xl [font-family:'Fira_Code',Helvetica] font-medium text-white">
              Media
            </div>

            <div className="flex gap-2">
              {personalData.footer.socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  aria-label={link.name} 
                  className="text-gray hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getIcon(link.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base">
          {personalData.footer.copyright}
        </div>
      </div>
    </footer>
  );
};