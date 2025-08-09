import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
import { Button } from "../../../../components/ui/button";
import { useNavigationData } from "../../../../hooks/useJsonData";

export const HeaderSection = (): JSX.Element => {
  const navigationData = useNavigationData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  if (!navigationData) {
    return <div>Loading...</div>;
  }

  const { logo, menuItems, languages } = navigationData;

  return (
    <header className="flex w-full items-center justify-between pt-4 sm:pt-6 lg:pt-8 pb-2 px-0 sticky top-0 bg-app-background/80 backdrop-blur-md z-50 border-b border-app-primary/20">
      {/* Logo with cyber effect */}
      <Link className="inline-flex items-center gap-2 relative group" to="/home">
        <div className={`relative w-3 h-3 sm:w-4 sm:h-4 bg-[url(${logo.icon})] bg-[100%_100%] filter brightness-0 invert`} 
             style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(3207%) hue-rotate(130deg) brightness(101%) contrast(101%)' }} />
        <div className="relative w-fit mt-[-1.00px] font-bold text-app-primary text-sm sm:text-base [font-family:'Fira_Code',Helvetica] tracking-[0] leading-[normal] cyber-text-glow group-hover:text-app-secondary transition-colors duration-300">
          {logo.text}
        </div>
      </Link>

      {/* Desktop Navigation */}
      <NavigationMenu className="hidden lg:block max-w-none">
        <NavigationMenuList className="flex items-start gap-4 xl:gap-8">
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              {item.active ? (
                <button 
                  className="inline-flex items-start cursor-pointer group"
                  onClick={() => handleNavClick(item.href)}
                >
                  <span className="font-medium text-sm xl:text-base [font-family:'Fira_Code',Helvetica] text-app-primary tracking-[0] leading-[normal] cyber-text-glow">
                    #
                  </span>
                  <span className="text-sm xl:text-base [font-family:'Fira_Code',Helvetica] font-medium text-white tracking-[0] leading-[normal] group-hover:text-app-primary transition-colors duration-300">
                    {item.text}
                  </span>
                </button>
              ) : (
                <button 
                  className="inline-flex items-start cursor-pointer hover:opacity-80 transition-all duration-300 group"
                  onClick={() => handleNavClick(item.href)}
                >
                  <span className="font-normal text-sm xl:text-base [font-family:'Fira_Code',Helvetica] text-app-primary/60 tracking-[0] leading-[normal] group-hover:text-app-primary transition-colors duration-300">
                    #
                  </span>
                  <span className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-sm xl:text-base tracking-[0] leading-[normal] group-hover:text-app-primary transition-colors duration-300">
                    {item.text}
                  </span>
                </button>
              )}
            </NavigationMenuItem>
          ))}

          {/* Language Selector */}
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 focus:outline-none group">
                <span className="[font-family:'Fira_Code',Helvetica] font-semibold text-app-secondary text-sm xl:text-base tracking-[0] leading-[normal] group-hover:text-app-primary transition-colors duration-300">
                  {languages.find((lang) => lang.active)?.code}
                </span>
                <div className="relative w-2.5 h-[5px]">
                  <div className="relative h-1.5 -top-px">
                    <img
                      className="absolute w-1.5 h-1.5 top-0 left-0 filter brightness-0 invert"
                      style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(3207%) hue-rotate(130deg) brightness(101%) contrast(101%)' }}
                      alt="Line"
                      src="/line-14.svg"
                    />
                    <img
                      className="absolute w-1.5 h-1.5 top-0 left-1 filter brightness-0 invert"
                      style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(3207%) hue-rotate(130deg) brightness(101%) contrast(101%)' }}
                      alt="Line"
                      src="/line-15.svg"
                    />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-app-background/90 backdrop-blur-md border border-app-primary/30 cyber-glow">
                {languages
                  .filter((lang) => !lang.active)
                  .map((lang, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-base tracking-[0] leading-[normal] focus:bg-app-primary/20 focus:text-app-primary transition-colors duration-300"
                    >
                      {lang.code}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden p-2 text-app-primary hover:text-app-secondary hover:bg-app-primary/10"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-app-background/95 backdrop-blur-md border-b border-app-primary/20 lg:hidden z-40">
          <div className="flex flex-col p-4 space-y-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex items-start text-left group"
                onClick={() => handleNavClick(item.href)}
              >
                <span className="font-medium text-base [font-family:'Fira_Code',Helvetica] text-app-primary tracking-[0] leading-[normal]">
                  #
                </span>
                <span className={`text-base [font-family:'Fira_Code',Helvetica] font-medium tracking-[0] leading-[normal] group-hover:text-app-primary transition-colors duration-300 ${
                  item.active ? 'text-white' : 'text-gray'
                }`}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};