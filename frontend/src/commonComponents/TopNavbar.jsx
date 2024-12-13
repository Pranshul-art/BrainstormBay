import {
    Home,
    Users,
    Lightbulb,
    Search,
    PlusCircle,
    ChevronDown,
    Star
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDropdown } from './UserDropDown'; 

export const TopNavbar = ({page, onSearchChange}) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState("home");

    useEffect(() => {
        setCurrentPage(page)
    }, [page]);
    
    const handlePostClick = () => {
        navigate("/post");
    }

    const handleHomeClick = () => {
        setCurrentPage("home")
        navigate("/dashboard")
    }

    const handleInteractionsClick = () => {
        setCurrentPage("interactions")
        navigate("/interactions")
    }

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        
        if (onSearchChange) {
            onSearchChange(term);
        }
    }

    return (
        <div className="">
            <div className='flex justify-center gap-20'>
                <h1 className="text-4xl pt-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800 cursor-pointer" onClick={handleHomeClick}>
                    BrainstormBay
                </h1>            
                <div className=' flex gap-2  transition-all duration-300  group'>
                    <div className={`cursor-pointer  pt-4 ${currentPage==="home"?"hover:bg-purple-100 border-b-2 border-b-purple-500":"hover:bg-purple-400"}  px-3 rounded `}>
                        <Home className={`${currentPage==="home"?"  fill-purple-400":""} text-blue-600 `} onClick={handleHomeClick}/>
                    </div>
                    <div 
                        className={`cursor-pointer pt-4 ${currentPage==="interactions"?"hover:bg-yellow-100 border-b-2 border-b-yellow-500":"hover:bg-yellow-400"} px-3 rounded`}
                        onClick={handleInteractionsClick}
                    >
                        <Star className={`${currentPage==="interactions"?" fill-yellow-400":""} text-yellow-600`}/>
                    </div>
                    <div className='pt-2 relative mr-2'>
                        <input 
                            type='text' 
                            placeholder='Search ideas...' 
                            value={searchTerm} 
                            onChange={handleSearchChange} 
                            className='px-2 py-2 border-2 border-blue-200 rounded-full focus:blue-400 focus:outline-none transition-all duration-300 w-64'
                        />
                        <Search className='absolute right-4 top-4 text-blue-400'/>
                    </div>
                    <div className='pt-2'>
                        <button 
                            onClick={handlePostClick} 
                            className="ml-auto flex items-center bg-green-500 text-white px-4 h-10 rounded-full hover:bg-green-600 transition-all"
                        >
                            <PlusCircle className="mr-2" /> Post Idea
                        </button>
                    </div>
                    
                    <UserDropdown />
                </div>
            </div>
        </div>
    );
};