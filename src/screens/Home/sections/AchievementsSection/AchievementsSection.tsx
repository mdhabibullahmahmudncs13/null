import React, { useState } from "react";
import { Award, Trophy, Users, ExternalLink, Calendar, Building } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useAchievementsData } from "../../../../hooks/useJsonData";

export const AchievementsSection = (): JSX.Element => {
  const achievementsData = useAchievementsData();
  const [activeCategory, setActiveCategory] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'certificate':
        return <Award className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'trophy':
        return <Trophy className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'users':
        return <Users className="w-4 h-4 sm:w-6 sm:h-6" />;
      default:
        return <Award className="w-4 h-4 sm:w-6 sm:h-6" />;
    }
  };

  const handleVerificationClick = (url?: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  if (!achievementsData) {
    return <div>Loading...</div>;
  }

  const activeItems = achievementsData.categories[activeCategory]?.items || [];

  return (
    <section id="achievements" className="w-full max-w-[1024px] mx-auto py-8 sm:py-12 lg:py-16">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8 sm:mb-12">
        <div className="inline-flex items-start">
          <span className="font-medium text-2xl sm:text-[32px] [font-family:'Fira_Code',Helvetica] text-app-primary cyber-text-glow">
            #
          </span>
          <span className="font-medium text-2xl sm:text-[32px] [font-family:'Fira_Code',Helvetica] text-white">
            {achievementsData.sectionTitle}
          </span>
        </div>
        <Separator className="flex-1 bg-app-primary/30" />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
        {achievementsData.categories.map((category, index) => (
          <Button
            key={index}
            variant={activeCategory === index ? "default" : "outline"}
            onClick={() => setActiveCategory(index)}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-none [font-family:'Fira_Code',Helvetica] font-medium text-xs sm:text-base transition-all
              ${activeCategory === index 
                ? "bg-app-primary text-white border-app-primary cyber-glow" 
                : "bg-transparent text-gray border-gray hover:text-white hover:border-app-primary"
              }`}
          >
            {getIcon(category.icon)}
            <span className="hidden sm:inline">{category.title}</span>
            <span className="sm:hidden">{category.title.slice(0, 4)}</span>
          </Button>
        ))}
      </div>

      {/* Achievement Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {activeItems.map((item) => (
          <Card
            key={item.id}
            className="border-2 border-solid border-app-primary/30 rounded-none bg-app-background/50 backdrop-blur-sm hover:border-app-primary transition-colors group cyber-glow"
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-[150px] sm:h-[200px] object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-110 contrast-110"
                  alt={item.title}
                  src={item.image}
                />
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {item.credentialId && (
                    <Badge
                      variant="outline"
                      className="bg-app-background/80 border-app-primary text-app-primary [font-family:'Fira_Code',Helvetica] text-xs"
                    >
                      ID: {item.credentialId}
                    </Badge>
                  )}
                  {item.position && (
                    <Badge
                      variant="outline"
                      className="bg-app-background/80 border-yellow-500 text-yellow-500 [font-family:'Fira_Code',Helvetica] text-xs"
                    >
                      {item.position}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              {/* Title and Organization */}
              <div className="space-y-2">
                <h3 className="[font-family:'Fira_Code',Helvetica] font-semibold text-white text-base sm:text-lg leading-tight">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-gray">
                  <Building className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="[font-family:'Fira_Code',Helvetica] font-normal text-xs sm:text-sm">
                    {item.organization}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="[font-family:'Fira_Code',Helvetica] font-normal text-xs sm:text-sm">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {item.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-transparent border-app-secondary/50 text-app-secondary [font-family:'Fira_Code',Helvetica] text-xs rounded-none hover:border-app-primary hover:text-app-primary transition-colors duration-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Verification Link */}
              {item.verificationUrl && item.verificationUrl !== '#' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVerificationClick(item.verificationUrl)}
                  className="w-full border-2 border-app-primary text-app-primary hover:bg-app-primary/20 [font-family:'Fira_Code',Helvetica] rounded-none cyber-glow transition-all duration-300 text-xs sm:text-sm"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Verify Credential
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {activeItems.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="text-gray [font-family:'Fira_Code',Helvetica] text-base sm:text-lg">
            No items found in this category
          </div>
        </div>
      )}

      {/* Decorative Elements - Hidden on mobile */}
      <div className="relative mt-8 sm:mt-16">
        <div className="hidden lg:block absolute -top-8 left-0 w-[84px] h-[84px] opacity-30">
          <div className="grid grid-cols-5 gap-2 w-full h-full">
            {Array(25).fill(0).map((_, index) => (
              <div key={index} className="w-1 h-1 bg-gray rounded-sm" />
            ))}
          </div>
        </div>
        <div className="hidden lg:block absolute -top-8 right-0 w-[84px] h-[84px] opacity-30">
          <div className="grid grid-cols-5 gap-2 w-full h-full">
            {Array(25).fill(0).map((_, index) => (
              <div key={index} className="w-1 h-1 bg-gray rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};