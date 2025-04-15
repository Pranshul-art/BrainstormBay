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
import AnimatedCard from '../commonComponents/RecentFilter';
import ScrollableFilters from '../commonComponents/RecentFilter';

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

    useEffect(()=>{
       
    },[])

    return (
        <div className='bg-slate-300 h-full min-h-screen'>
            <div className='fixed w-full top-0 left-0 bg-white z-20'>
                <div className='mt-5 pb-4 shadow-md border-b-2'>
                    <TopNavbar 
                        page={"home"} 
                        onSearchChange={setSearchTerm}
                    />
                </div>
            </div>
            
            <div className=' flex ml-10'>
                
                <div className='fixed left-20 top-40 '>
                        <UserProjectsCard />
                </div>
                <ScrollableFilters thoughts={thoughts} filteredIdeas={filteredIdeas}/>
                
            </div>
        </div>
    );
};