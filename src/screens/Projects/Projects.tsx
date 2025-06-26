import React, { useState } from "react";
import { ArrowLeft, ExternalLink, Github, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { useProjectsData } from "../../hooks/useJsonData";

export const Projects = (): JSX.Element => {
  const projectsData = useProjectsData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  if (!projectsData) {
    return <div>Loading...</div>;
  }

  // Get all unique technologies for filtering
  const allTechnologies = Array.from(
    new Set(projectsData.projects.flatMap(project => project.technologies))
  ).sort();

  // Filter projects based on search and technology
  const filteredProjects = projectsData.projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = !selectedTech || project.technologies.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  const handleActionClick = (project: any, actionType: string) => {
    if (actionType === 'live' && project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    } else if (actionType === 'code' && project.codeUrl) {
      window.open(project.codeUrl, '_blank');
    }
  };

  return (
    <div className="bg-app-background min-h-screen">
      <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/"
            className="flex items-center gap-2 text-gray hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="[font-family:'Fira_Code',Helvetica] font-medium text-base">
              Back to Home
            </span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="flex items-center gap-4 mb-12">
          <div className="inline-flex items-start">
            <span className="font-medium text-[40px] [font-family:'Fira_Code',Helvetica] text-app-primary">
              #
            </span>
            <span className="font-medium text-[40px] [font-family:'Fira_Code',Helvetica] text-white">
              all-projects
            </span>
          </div>
          <Separator className="flex-1" />
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-transparent border-gray text-white [font-family:'Fira_Code',Helvetica] focus:border-app-primary rounded-none"
            />
          </div>

          {/* Technology Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray" />
            <span className="[font-family:'Fira_Code',Helvetica] text-gray text-sm">Filter:</span>
            <Button
              variant={selectedTech === null ? "default" : "outline"}
              onClick={() => setSelectedTech(null)}
              className={`px-3 py-1 h-auto rounded-none [font-family:'Fira_Code',Helvetica] text-sm
                ${selectedTech === null 
                  ? "bg-app-primary text-white border-app-primary" 
                  : "bg-transparent text-gray border-gray hover:text-white"
                }`}
            >
              All
            </Button>
          </div>
        </div>

        {/* Technology Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allTechnologies.map((tech) => (
            <Button
              key={tech}
              variant={selectedTech === tech ? "default" : "outline"}
              onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
              className={`px-3 py-1 h-auto rounded-none [font-family:'Fira_Code',Helvetica] text-sm transition-all
                ${selectedTech === tech 
                  ? "bg-app-primary text-white border-app-primary" 
                  : "bg-transparent text-gray border-gray hover:text-white hover:border-white"
                }`}
            >
              {tech}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <span className="[font-family:'Fira_Code',Helvetica] text-gray text-sm">
            Showing {filteredProjects.length} of {projectsData.projects.length} projects
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col border border-solid border-[#abb2bf] rounded-none bg-transparent hover:border-app-primary transition-all duration-300 group"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={project.title}
                    src={project.image}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </CardHeader>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 p-3 border-b border-solid border-[#abb2bf]">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={`${project.id}-tech-${index}`}
                    variant="outline"
                    className={`bg-transparent border-0 text-gray [font-family:'Fira_Code',Helvetica] font-normal rounded-none cursor-pointer hover:text-app-primary transition-colors
                      ${selectedTech === tech ? 'text-app-primary' : ''}`}
                    onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Project Info */}
              <CardContent className="flex flex-col gap-4 p-4 flex-1">
                <h3 className="[font-family:'Fira_Code',Helvetica] font-semibold text-white text-xl leading-tight">
                  {project.title}
                </h3>
                <p className="[font-family:'Fira_Code',Helvetica] font-normal text-gray text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="flex gap-3 mt-auto">
                  {project.actions.map((action, index) => (
                    <Button
                      key={`${project.id}-action-${index}`}
                      variant="outline"
                      onClick={() => handleActionClick(project, action.type)}
                      className={`flex items-center gap-2 rounded-none px-4 py-2 h-auto [font-family:'Fira_Code',Helvetica] font-medium text-sm transition-all
                        ${action.primary
                          ? "border-app-primary text-app-primary hover:bg-app-primary hover:text-white"
                          : "border-[#abb2bf] text-gray hover:text-white hover:border-white"
                        }`}
                    >
                      {action.type === 'live' ? (
                        <ExternalLink className="w-4 h-4" />
                      ) : (
                        <Github className="w-4 h-4" />
                      )}
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray [font-family:'Fira_Code',Helvetica] text-lg mb-4">
              No projects found matching your criteria
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedTech(null);
              }}
              className="border-app-primary text-app-primary hover:bg-app-primary hover:text-white [font-family:'Fira_Code',Helvetica] rounded-none"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="relative">
          <div className="absolute -bottom-8 left-0 w-[84px] h-[84px] opacity-30">
            <div className="grid grid-cols-5 gap-2 w-full h-full">
              {Array(25).fill(0).map((_, index) => (
                <div key={index} className="w-1 h-1 bg-gray rounded-sm" />
              ))}
            </div>
          </div>
          <div className="absolute -bottom-8 right-0 w-[84px] h-[84px] opacity-30">
            <div className="grid grid-cols-5 gap-2 w-full h-full">
              {Array(25).fill(0).map((_, index) => (
                <div key={index} className="w-1 h-1 bg-gray rounded-sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};