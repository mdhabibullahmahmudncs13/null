import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

// Project data for mapping
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React and Node.js",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    actions: [
      { label: "Live <~>", primary: true },
      { label: "Code >=", primary: false },
    ],
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Socket.io",
      "Tailwind CSS",
    ],
    actions: [
      { label: "Live <~>", primary: true },
      { label: "Code >=", primary: false },
    ],
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather data visualization",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400",
    technologies: ["React", "Chart.js", "Weather API", "CSS"],
    actions: [
      { label: "Live <~>", primary: true },
      { label: "Code >=", primary: false },
    ],
  },
];

export const ProjectsSection = (): JSX.Element => {
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
              projects
            </span>
          </div>
          <Separator className="flex-1" />
        </div>
        <Button
          variant="link"
          className="font-['Fira_Code',Helvetica] font-medium text-white text-base"
        >
          View all ~~&gt;
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
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