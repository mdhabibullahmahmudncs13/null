import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const HeaderSection = (): JSX.Element => {
  // Navigation items data with section links
  const navItems = [
    { text: "home", href: "#home", active: true },
    { text: "works", href: "#projects", active: false },
    { text: "about-me", href: "#about", active: false },
    { text: "contacts", href: "#contacts", active: false },
  ];

  // Language options
  const languages = [
    { code: "EN", active: true },
    { code: "BN", active: false },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="flex w-full items-end justify-between pt-8 pb-2 px-0 sticky top-0 bg-app-background z-10">
      {/* Logo */}
      <Link className="inline-flex items-center gap-2 relative" to="/home">
        <div className="relative w-4 h-4 bg-[url(/union-1.svg)] bg-[100%_100%]" />
        <div className="relative w-fit mt-[-1.00px] font-bold text-white text-base [font-family:'Fira_Code',Helvetica] tracking-[0] leading-[normal]">
          Habibullah
        </div>
      </Link>

      {/* Navigation */}
      <NavigationMenu className="max-w-none">
        <NavigationMenuList className="flex items-start gap-8">
          {navItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              {item.active ? (
                <button 
                  className="inline-flex items-start cursor-pointer"
                  onClick={() => handleNavClick(item.href)}
                >
                  <span className="font-medium text-base [font-family:'Fira_Code',Helvetica] text-app-primary tracking-[0] leading-[normal]">
                    #
                  </span>
                  <span className="text-base [font-family:'Fira_Code',Helvetica] font-medium text-white tracking-[0] leading-[normal]">
                    {item.text}
                  </span>
                </button>
              ) : (
                <button 
                  className="inline-flex items-start cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleNavClick(item.href)}
                >
                  <span className="font-normal text-base [font-family:'Fira_Code',Helvetica] text-app-primary tracking-[0] leading-[normal]">
                    #
                  </span>
                  <span className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base tracking-[0] leading-[normal] hover:text-white transition-colors">
                    {item.text}
                  </span>
                </button>
              )}
            </NavigationMenuItem>
          ))}

          {/* Language Selector */}
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 focus:outline-none">
                <span className="[font-family:'Fira_Code',Helvetica] font-semibold text-gray text-base tracking-[0] leading-[normal]">
                  {languages.find((lang) => lang.active)?.code}
                </span>
                <div className="relative w-2.5 h-[5px]">
                  <div className="relative h-1.5 -top-px">
                    <img
                      className="absolute w-1.5 h-1.5 top-0 left-0"
                      alt="Line"
                      src="/line-14.svg"
                    />
                    <img
                      className="absolute w-1.5 h-1.5 top-0 left-1"
                      alt="Line"
                      src="/line-15.svg"
                    />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-app-background border border-solid border-[#abb2bf]">
                {languages
                  .filter((lang) => !lang.active)
                  .map((lang, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base tracking-[0] leading-[normal] focus:bg-transparent focus:text-white"
                    >
                      {lang.code}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};