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
        return <Award className="w-6 h-6" />;
      case 'trophy':
        return <Trophy className="w-6 h-6" />;
      case 'users':
        return <Users className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
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
    <section id="achievements" className="w-full max-w-[1024px] mx-auto py-16">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="inline-flex items-start">
          <span className="font-medium text-[32px] [font-family:'Fira_Code',Helvetica] text-app-primary">
            #
          </span>
          <span className="font-medium text-[32px] [font-family:'Fira_Code',Helvetica] text-white">
            {achievementsData.sectionTitle}
          </span>
        </div>
        <Separator className="flex-1" />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {achievementsData.categories.map((category, index) => (
          <Button
            key={index}
            variant={activeCategory === index ? "default" : "outline"}
            onClick={() => setActiveCategory(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-none [font-family:'Fira_Code',Helvetica] font-medium text-base transition-all
              ${activeCategory === index 
                ? "bg-app-primary text-white border-app-primary" 
                : "bg-transparent text-gray border-gray hover:text-white hover:border-white"
              }`}
          >
            {getIcon(category.icon)}
            {category.title}
          </Button>
        ))}
      </div>

      {/* Achievement Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeItems.map((item) => (
          <Card
            key={item.id}
            className="border border-solid border-[#abb2bf] rounded-none bg-transparent hover:border-app-primary transition-colors group"
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={item.title}
                  src={item.image}
                />
                <div className="absolute top-2 right-2">
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

            <CardContent className="p-4 space-y-4">
              {/* Title and Organization */}
              <div className="space-y-2">
                <h3 className="[font-family:'Fira_Code',Helvetica] font-semibold text-white text-lg leading-tight">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-gray">
                  <Building className="w-4 h-4" />
                  <span className="[font-family:'Fira_Code',Helvetica] font-normal text-sm">
                    {item.organization}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray">
                  <Calendar className="w-4 h-4" />
                  <span className="[font-family:'Fira_Code',Helvetica] font-normal text-sm">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-transparent border-gray text-gray [font-family:'Fira_Code',Helvetica] text-xs rounded-none"
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
                  className="w-full border-app-primary text-app-primary hover:bg-app-primary hover:text-white [font-family:'Fira_Code',Helvetica] rounded-none"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Verify Credential
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {activeItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray [font-family:'Fira_Code',Helvetica] text-lg">
            No items found in this category
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="relative mt-16">
        <div className="absolute -top-8 left-0 w-[84px] h-[84px] opacity-30">
          <div className="grid grid-cols-5 gap-2 w-full h-full">
            {Array(25).fill(0).map((_, index) => (
              <div key={index} className="w-1 h-1 bg-gray rounded-sm" />
            ))}
          </div>
        </div>
        <div className="absolute -top-8 right-0 w-[84px] h-[84px] opacity-30">
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