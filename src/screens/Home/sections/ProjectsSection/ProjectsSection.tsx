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
    <section id="projects" className="w-full max-w-[1027px] mx-auto py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between w-full mb-12">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-start">
            <span className="font-medium text-[32px] text-app-primary font-['Fira_Code',Helvetica]">
              #
            </span>
            <span className="font-medium text-[32px] text-white font-['Fira_Code',Helvetica]">
              {projectsData.sectionTitle}
            </span>
          </div>
          <Separator className="flex-1" />
        </div>
        <Link to="/projects">
          <Button
            variant="link"
            className="font-['Fira_Code',Helvetica] font-medium text-white text-base hover:text-app-primary transition-colors"
          >
            {projectsData.viewAllText}
          </Button>
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="flex flex-wrap gap-4">
        {projectsData.projects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col w-[330.58px] border border-solid border-[#abb2bf] rounded-none bg-transparent"
          >
            <CardHeader className="p-0">
              <img
                className="w-full h-[202px] object-cover"
                alt={project.title}
                src={project.image}
              />
            </CardHeader>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 p-2 border-b-0">
              {project.technologies.map((tech, index) => (
                <Badge
                  key={`${project.id}-tech-${index}`}
                  variant="outline"
                  className="bg-transparent border-0 text-gray font-['Fira_Code',Helvetica] font-normal rounded-none"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Project Info */}
            <CardContent className="flex flex-col gap-4 p-4 border-t border-solid border-[#abb2bf]">
              <h3 className="font-['Fira_Code',Helvetica] font-medium text-white text-2xl">
                {project.title}
              </h3>
              <p className="font-['Fira_Code',Helvetica] font-normal text-gray text-base">
                {project.description}
              </p>

              <div className="flex gap-4">
                {project.actions.map((action, index) => (
                  <Button
                    key={`${project.id}-action-${index}`}
                    variant="outline"
                    onClick={() => handleActionClick(project, action.type)}
                    className={`rounded-none px-4 py-2 h-auto font-['Fira_Code',Helvetica] font-medium text-base
                      ${
                        action.primary
                          ? "border-[#c778dd] text-white"
                          : "border-[#abb2bf] text-gray"
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