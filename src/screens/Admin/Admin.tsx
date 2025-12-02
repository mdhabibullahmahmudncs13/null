import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { usePersonalData, useProjectsData, useSkillsData } from '../../hooks/useJsonData';
import { personalService, projectsService } from '../../services/appwrite.service';
import { useAuth } from '../../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export const Admin = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'personal' | 'projects' | 'skills'>('personal');
  const [isLoading, setIsLoading] = useState(false);

  const personalData = usePersonalData();
  const projectsData = useProjectsData();
  const skillsData = useSkillsData();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  // Personal Info Form
  const [personalForm, setPersonalForm] = useState({
    name: '',
    title: '',
    email: '',
  });

  React.useEffect(() => {
    if (personalData) {
      setPersonalForm({
        name: personalData.name,
        title: personalData.title,
        email: personalData.email,
      });
    }
  }, [personalData]);

  const handlePersonalUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await personalService.update(personalForm);
      toast.success('Personal info updated successfully!');
    } catch (error) {
      toast.error('Failed to update personal info');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Project Form
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    liveUrl: '',
    codeUrl: '',
  });

  const handleProjectCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newProject = {
        id: Date.now(),
        title: projectForm.title,
        description: projectForm.description,
        image: projectForm.image,
        technologies: projectForm.technologies.split(',').map(t => t.trim()),
        liveUrl: projectForm.liveUrl,
        codeUrl: projectForm.codeUrl,
        featured: false,
        order: 999,
        actions: [
          { label: 'Live <~>', primary: true, type: 'live' },
          { label: 'Code >=', primary: false, type: 'code' },
        ],
      };
      
      await projectsService.create(newProject);
      toast.success('Project created successfully!');
      setProjectForm({
        title: '',
        description: '',
        image: '',
        technologies: '',
        liveUrl: '',
        codeUrl: '',
      });
      // Refresh the page to show new project
      window.location.reload();
    } catch (error) {
      toast.error('Failed to create project');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    setIsLoading(true);
    try {
      await projectsService.delete(projectId);
      toast.success('Project deleted successfully!');
      // Refresh the page to show updated list
      window.location.reload();
    } catch (error) {
      toast.error('Failed to delete project');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-app-background p-4 sm:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white font-['Fira_Code',Helvetica] mb-2">
              <span className="text-app-primary">#</span>admin-panel
            </h1>
            <p className="text-gray font-['Fira_Code',Helvetica]">
              Manage your portfolio content
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-gray font-['Fira_Code',Helvetica] text-sm">
              Logged in as: <span className="text-app-primary">{user?.email}</span>
            </p>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-2 border-app-primary/30 text-app-primary hover:bg-app-primary/20 font-['Fira_Code',Helvetica] rounded-none"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-app-primary/30">
          {(['personal', 'projects', 'skills'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-['Fira_Code',Helvetica] transition-colors ${
                activeTab === tab
                  ? 'text-app-primary border-b-2 border-app-primary'
                  : 'text-gray hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <Card className="bg-app-background/50 border-app-primary/30">
            <CardHeader>
              <h2 className="text-2xl font-bold text-white font-['Fira_Code',Helvetica]">
                Personal Information
              </h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePersonalUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input
                    id="name"
                    value={personalForm.name}
                    onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                    className="bg-app-background border-app-primary/30 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="title" className="text-white">Title</Label>
                  <Input
                    id="title"
                    value={personalForm.title}
                    onChange={(e) => setPersonalForm({ ...personalForm, title: e.target.value })}
                    className="bg-app-background border-app-primary/30 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalForm.email}
                    onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                    className="bg-app-background border-app-primary/30 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-app-primary hover:bg-app-primary/80 text-app-background"
                >
                  {isLoading ? 'Updating...' : 'Update Personal Info'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Add New Project */}
            <Card className="bg-app-background/50 border-app-primary/30">
              <CardHeader>
                <h2 className="text-2xl font-bold text-white font-['Fira_Code',Helvetica]">
                  Add New Project
                </h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProjectCreate} className="space-y-4">
                  <div>
                    <Label htmlFor="project-title" className="text-white">Title</Label>
                    <Input
                      id="project-title"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="bg-app-background border-app-primary/30 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="project-description" className="text-white">Description</Label>
                    <Textarea
                      id="project-description"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="bg-app-background border-app-primary/30 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="project-image" className="text-white">Image URL</Label>
                    <Input
                      id="project-image"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      className="bg-app-background border-app-primary/30 text-white"
                      placeholder="/project-image.png"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="project-technologies" className="text-white">
                      Technologies (comma-separated)
                    </Label>
                    <Input
                      id="project-technologies"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                      className="bg-app-background border-app-primary/30 text-white"
                      placeholder="React, Node.js, MongoDB"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project-live" className="text-white">Live URL</Label>
                      <Input
                        id="project-live"
                        value={projectForm.liveUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                        className="bg-app-background border-app-primary/30 text-white"
                        placeholder="https://..."
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="project-code" className="text-white">Code URL</Label>
                      <Input
                        id="project-code"
                        value={projectForm.codeUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, codeUrl: e.target.value })}
                        className="bg-app-background border-app-primary/30 text-white"
                        placeholder="https://github.com/..."
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-app-primary hover:bg-app-primary/80 text-app-background"
                  >
                    {isLoading ? 'Creating...' : 'Create Project'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Projects */}
            <Card className="bg-app-background/50 border-app-primary/30">
              <CardHeader>
                <h2 className="text-2xl font-bold text-white font-['Fira_Code',Helvetica]">
                  Existing Projects ({projectsData?.projects.length || 0})
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectsData?.projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 border border-app-primary/30 rounded-lg hover:border-app-primary transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-['Fira_Code',Helvetica] font-medium flex-1">
                          {project.title}
                        </h3>
                        <Button
                          onClick={() => handleProjectDelete(project.$id || '')}
                          variant="outline"
                          className="text-red-500 border-red-500/30 hover:bg-red-500/20 text-xs px-2 py-1 h-auto rounded-none"
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-gray text-sm mb-2">{project.description}</p>
                      <div className="flex gap-2 flex-wrap">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-app-primary/20 text-app-primary rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <Card className="bg-app-background/50 border-app-primary/30">
            <CardHeader>
              <h2 className="text-2xl font-bold text-white font-['Fira_Code',Helvetica]">
                Skills Management
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsData?.categories.map((category, index) => (
                  <div key={index} className="p-4 border border-app-primary/30 rounded-lg">
                    <h3 className="text-white font-['Fira_Code',Helvetica] font-medium mb-3">
                      {category.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {category.skills.map((skillPair, i) => (
                        <div key={i} className="text-gray text-sm">
                          {skillPair.join(' • ')}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray text-sm mt-4 font-['Fira_Code',Helvetica]">
                To edit skills, update directly in Appwrite Console
              </p>
            </CardContent>
          </Card>
        )}

        {/* Info Box */}
        <Card className="mt-8 bg-app-primary/10 border-app-primary/30">
          <CardContent className="p-4">
            <p className="text-gray font-['Fira_Code',Helvetica] text-sm">
              <span className="text-app-primary">💡 Tip:</span> For more advanced editing, 
              use the <a href="https://cloud.appwrite.io" target="_blank" rel="noopener noreferrer" className="text-app-primary hover:underline">Appwrite Console</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
