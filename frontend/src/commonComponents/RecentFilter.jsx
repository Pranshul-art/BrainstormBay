import React, { useState, useEffect } from 'react';
import { Card } from './Card';

const ScrollableFilters = ({ thoughts, filteredIdeas }) => {
  const [activeFilter, setActiveFilter] = useState('recent');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="justify-center items-center ml-[30%] gap-10 pt-28">
      <div 
        className={`
          fixed 
          transition-transform 
          duration-300 
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="bg-white h-full rounded-2xl border-2 flex justify-center ml-10 top-0">
          {['recent', 'popular', 'trending'].map(filter => (
            <div key={filter} className="m-7">
              <button 
                onClick={() => setActiveFilter(filter)}
                className={`
                  w-30 
                  px-4 
                  py-2 
                  rounded-full 
                  transition-all 
                  duration-300 
                  ${activeFilter === filter 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }
                `}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full pt-32">
        {thoughts.map(tech => (
          <div key={tech.title} className="w-11/12">
            <Card
              title={tech.title}
              description={tech.description}
              author={tech.author} 
              votes={tech.votes} 
              comments={tech.comments} 
              technologies={tech.techno.split(",")}
            />
          </div>
        ))}
        {filteredIdeas.map(tech => (
          activeFilter === tech.activeFilter && (
            <div key={tech.id} className="w-11/12">
              <Card 
                title={tech.title} 
                description={tech.description}
                author={tech.author} 
                votes={tech.votes} 
                comments={tech.comments} 
                technologies={tech.technologies}
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ScrollableFilters;