import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  Lightbulb, 
  MessageCircle, 
  ThumbsUp, 
  Search, 
  PlusCircle,
  Star 
} from 'lucide-react';
import { TopNavbar } from '../commonComponents/TopNavbar';
import { Card } from '../commonComponents/Card';
import { UserProjectsCard } from '../commonComponents/UserProjectCard';
import { sampleIdeas } from '../assets/SampleIdeas';
import axios from 'axios';

export const Dashboard = () => {
    const [thoughts,setThoughts]=useState([])
    const [activeFilter, setActiveFilter] = useState('recent');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedSearchTerm = localStorage.getItem('searchTerm') || '';
        setSearchTerm(storedSearchTerm);
    }, []);

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/ideas/search?filter=${searchTerm}&sortBy=${'votes'}&order=${'desc'}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setThoughts(response.data.idea);
            } catch (error) {
                console.error("Error fetching ideas:", error);
            }
        };
    
        fetchIdeas();
    }, [searchTerm]);
    
    const filteredIdeas = sampleIdeas.filter(idea => {
        if (searchTerm === '') {
            return true;
        }

        const filterCondition = 
            activeFilter === 'recent' ? true : 
            activeFilter === 'popular' && idea.votes > 40 || 
            activeFilter === 'trending' && idea.comments > 15;

        const searchCondition = 
            idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            idea.technologies.some(tech => 
            tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
            idea.author.toLowerCase().includes(searchTerm.toLowerCase());

        return searchCondition && filterCondition;
    });

    return (
        <div className='bg-slate-300 h-full min-h-screen'>
            <div className='fixed w-full top-0 left-0 bg-white'>
                <div className='mt-5 pb-4 shadow-md border-b-2'>
                    <TopNavbar 
                        page={"home"} 
                        onSearchChange={setSearchTerm}
                    />
                </div>
            </div>
            
            <div className=' flex ml-10'>
                
                <div className='fixed left-20 top-40'>
                        <UserProjectsCard />
                </div>
                <div className=' justify-center items-center ml-[30%] gap-10 pt-28'>
                <div className='fixed '>
                    <div className='bg-white h-full  rounded-2xl border-2 flex justify-center ml-10 top-0'>
                        {['recent', 'popular', 'trending'].map(filter => (
                            <div key={filter} className='m-7'>
                                <button 
                                    onClick={() => setActiveFilter(filter)}
                                    className={`w-30 px-4 py-2 rounded-full transition-all duration-300 ${
                                        activeFilter === filter 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                    }`}
                                >
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                    <div className='grid grid-cols-1 gap-6 w-full pt-32'>
                        {thoughts.map(tech=>(
                            <div className='w-11/12'>
                                <Card
                                    title={tech.title}
                                    description={tech.description}
                                    author={tech.author} 
                                    votes={tech.votes} 
                                    comments={tech.comments} 
                                    technologies={tech.techno.split(",")}/>
                            </div>
                        ))}
                        {filteredIdeas.map(tech => (
                            activeFilter===tech.activeFilter&&
                            <div key={tech.id} className='w-11/12'>
                                <Card 
                                    title={tech.title} 
                                    description={tech.description}
                                    author={tech.author} 
                                    votes={tech.votes} 
                                    comments={tech.comments} 
                                    technologies={tech.technologies}
                                />
                            </div>
                        ))}
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
};