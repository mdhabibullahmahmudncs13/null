import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useProjectsData } from "../../../../hooks/useJsonData";

export const ProjectsSection = (): JSX.Element => {
  const projectsData = useProjectsData();

  const handleActionClick = (project: any, actionType: string) => {
    if (actionType === 'live' && project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    } else if (actionType === 'code' && project.codeUrl) {
      window.open(project.codeUrl, '_blank');
    }
  };

  if (!projectsData) {
    return <div>Loading...</div>;
  }

  return (
    <section id="projects" className="w-full max-w-[1027px] mx-auto py-8 relative">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-8 sm:mb-12 relative z-10 gap-4 sm:gap-0">
        <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
          <div className="flex items-start">
            <span className="font-medium text-2xl sm:text-[32px] text-app-primary font-['Fira_Code',Helvetica] cyber-text-glow">
              #
            </span>
            <span className="font-medium text-2xl sm:text-[32px] text-white font-['Fira_Code',Helvetica]">
              {projectsData.sectionTitle}
            </span>
          </div>
          <Separator className="flex-1 bg-app-primary/30" />
        </div>
        <Link to="/projects">
          <Button
            variant="link"
            className="font-['Fira_Code',Helvetica] font-medium text-app-secondary text-sm sm:text-base hover:text-app-primary transition-colors duration-300 cyber-text-glow p-0"
          >
            {projectsData.viewAllText}
          </Button>
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 relative z-10">
        {projectsData.projects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col border-2 border-app-primary/30 rounded-none bg-app-background/50 backdrop-blur-sm hover:border-app-primary hover:cyber-glow transition-all duration-300 group cyber-scan-line"
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-[180px] sm:h-[202px] object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-110 contrast-110"
                  alt={project.title}
                  src={project.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-app-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardHeader>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1 sm:gap-2 p-2 border-b-0">
              {project.technologies.map((tech, index) => (
                <Badge
                  key={`${project.id}-tech-${index}`}
                  variant="outline"
                  className="bg-transparent border border-app-secondary/50 text-app-secondary font-['Fira_Code',Helvetica] font-normal text-xs sm:text-sm rounded-none hover:border-app-primary hover:text-app-primary transition-colors duration-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Project Info */}
            <CardContent className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 border-t border-solid border-app-primary/30 flex-1">
              <h3 className="font-['Fira_Code',Helvetica] font-medium text-white text-lg sm:text-2xl group-hover:text-app-primary transition-colors duration-300 leading-tight">
                {project.title}
              </h3>
              <p className="font-['Fira_Code',Helvetica] font-normal text-gray text-sm sm:text-base leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {project.actions.map((action, index) => (
                  <Button
                    key={`${project.id}-action-${index}`}
                    variant="outline"
                    onClick={() => handleActionClick(project, action.type)}
                    className={`rounded-none px-3 sm:px-4 py-2 h-auto font-['Fira_Code',Helvetica] font-medium text-sm sm:text-base transition-all duration-300 flex-1 sm:flex-none
                      ${
                        action.primary
                          ? "border-2 border-app-primary text-app-primary hover:bg-app-primary/20 cyber-glow"
                          : "border border-app-secondary/50 text-app-secondary hover:border-app-primary hover:text-app-primary"
                      }`}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};