import React, { useState } from 'react';
import { 
    Lightbulb, 
    Lock, 
    Globe, 
    Users, 
    ChevronDown, 
    ChevronUp 
} from 'lucide-react';
import { TopNavbar } from '../commonComponents/TopNavbar';

export const AllProjectsPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [expandedSections, setExpandedSections] = useState({
        private: false,
        community: false,
        public: false
    });

    const allProjects = {
        private: [
            { id: 1, title: 'Personal AI Assistant', technologies: ['React', 'OpenAI'] },
            { id: 2, title: 'Budget Tracking App', technologies: ['Flutter', 'Firebase'] }
        ],
        community: [
            { id: 3, title: 'Open Source Education Platform', technologies: ['Node.js', 'MongoDB'] },
            { id: 4, title: 'Climate Change Tracker', technologies: ['Python', 'Django'] }
        ],
        public: [
            { id: 5, title: 'Urban Mobility Solution', technologies: ['React Native', 'GraphQL'] },
            { id: 6, title: 'Mental Health Companion', technologies: ['Swift', 'CoreML'] }
        ]
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const renderProjectSection = (type, projects, icon, color) => {
        const isExpanded = expandedSections[type];
        const displayProjects = isExpanded ? projects : projects.slice(0, 2);

        return (
            <div className='mb-8 bg-white rounded-2xl shadow-lg p-6'>
                <div 
                    className='flex justify-between items-center mb-4 cursor-pointer'
                    onClick={() => toggleSection(type)}
                >
                    <div className='flex items-center'>
                        {icon}
                        <h2 className={`ml-2 text-xl font-bold ${color}`}>
                            {type.charAt(0).toUpperCase() + type.slice(1)} Projects
                        </h2>
                    </div>
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                </div>

                <div className='space-y-4'>
                    {displayProjects.map(project => (
                        <div 
                            key={project.id} 
                            className='bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors'
                        >
                            <div className='flex justify-between items-center'>
                                <h3 className='font-semibold'>{project.title}</h3>
                                <div className='flex space-x-2'>
                                    {project.technologies.map(tech => (
                                        <span 
                                            key={tech} 
                                            className='text-xs bg-blue-200 px-2 py-1 rounded'
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    {projects.length > 2 && !isExpanded && (
                        <div className='text-center'>
                            <button 
                                onClick={() => toggleSection(type)}
                                className='text-blue-600 hover:text-blue-800'
                            >
                                Show {projects.length - 2} more {type} projects
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className='bg-slate-300 h-full min-h-screen '>
            <div className='fixed w-full top-0 left-0 bg-white'>
                <div className='mt-5 pb-4 shadow-md border-b-2'>
                    <TopNavbar page={"projects"} />
                </div>
            </div>
            
            <div className='pt-32 px-8 max-w-4xl mx-auto'>
                <h1 className='text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800'>
                    My Projects
                </h1>

                {renderProjectSection(
                    'private', 
                    allProjects.private, 
                    <Lock className='text-red-600' />,
                    'text-red-600'
                )}
                
                {renderProjectSection(
                    'community', 
                    allProjects.community, 
                    <Users className='text-green-600' />,
                    'text-green-600'
                )}
                
                {renderProjectSection(
                    'public', 
                    allProjects.public, 
                    <Globe className='text-purple-600' />,
                    'text-purple-600'
                )}
            </div>
        </div>
    );
};