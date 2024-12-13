import React from 'react';
import { Lightbulb, Eye, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserProjectsCard = () => {
    const navigate = useNavigate();

    const userProjects = [
        { 
            id: 1, 
            title: 'AI Chatbot', 
            type: 'private', 
            icon: <Lightbulb className="text-blue-600 mr-2" />
        },
        { 
            id: 2, 
            title: 'Blockchain Voting', 
            type: 'community', 
            icon: <Lightbulb className="text-green-600 mr-2" />
        },
        { 
            id: 3, 
            title: 'Climate Tech Dashboard', 
            type: 'public', 
            icon: <Lightbulb className="text-purple-600 mr-2" />
        }
    ];

    return (
        <div className='bg-white rounded-2xl shadow-lg p-6 w-80 '>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800'>
                    My Projects
                </h2>
                <button 
                    onClick={() => navigate('/all-projects')}
                    className='text-blue-600 hover:text-blue-800 flex items-center'
                >
                    See All <ChevronRight className='ml-1' size={18} />
                </button>
            </div>

            <div className='space-y-3'>
                {userProjects.slice(0, 3).map((project) => (
                    <div 
                        key={project.id} 
                        className='flex items-center justify-between bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition-colors'
                    >
                        <div className='flex items-center'>
                            {project.icon}
                            <span className='font-medium'>{project.title}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                            project.type === 'private' ? 'bg-red-100 text-red-600' :
                            project.type === 'community' ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                        }`}>
                            {project.type}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};