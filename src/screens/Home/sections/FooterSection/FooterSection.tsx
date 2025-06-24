import { FigmaIcon, GithubIcon, LinkedinIcon } from "lucide-react";
import React from "react";
import { Separator } from "../../../../components/ui/separator";

export const FooterSection = (): JSX.Element => {
  const socialLinks = [
    { icon: <GithubIcon className="w-8 h-8" />, alt: "Github", href: "https://github.com/habibullah-dev" },
    { icon: <LinkedinIcon className="w-8 h-8" />, alt: "LinkedIn", href: "https://www.linkedin.com/in/md-habibullah-mahmud-3820382a9" },
    { icon: <FigmaIcon className="w-8 h-8" />, alt: "Figma", href: "#" },
  ];

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
                  Habibullah
                </div>
              </div>

              <a
                className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base"
                href="mailto:mdhabibullahmahmudncs13@gmail.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                mdhabibullahmahmudncs13@gmail.com
              </a>
            </div>

            <div className="[font-family:'Fira_Code',Helvetica] font-normal text-white text-base">
              Software Engineer and Full-Stack Developer
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <div className="text-2xl [font-family:'Fira_Code',Helvetica] font-medium text-white">
              Media
            </div>

            <div className="flex gap-2">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} aria-label={link.alt} className="text-gray hover:text-white transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base">
          © Copyright 2024. Made by Md Habibullah Mahmud
        </div>
      </div>
    </footer>
  );
};