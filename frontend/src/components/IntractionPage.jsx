import React, { useState, useEffect } from 'react';
import { 
  ThumbsUp, 
  MessageCircle, 
  Star, 
  Filter 
} from 'lucide-react';
import { TopNavbar } from '../commonComponents/TopNavbar';
import { sampleIdeas } from '../assets/SampleIdeas';

export const InteractionsPage = () => {
  const [interactions, setInteractions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const mockUserInteractions = [
      { 
        ideaId: 1, 
        type: 'vote', 
        timestamp: new Date('2024-01-15'),
        action: 'Upvoted the idea'
      },
      { 
        ideaId: 4, 
        type: 'comment', 
        timestamp: new Date('2024-01-20'),
        action: 'Commented on the idea'
      },
      { 
        ideaId: 10, 
        type: 'favorite', 
        timestamp: new Date('2024-01-25'),
        action: 'Marked as favorite'
      }
    ];

    const enhancedInteractions = mockUserInteractions.map(interaction => {
      const relatedIdea = sampleIdeas.find(idea => idea.id === interaction.ideaId);
      return {
        ...interaction,
        idea: relatedIdea
      };
    });

    setInteractions(enhancedInteractions);
  }, []);

  const filteredInteractions = interactions.filter(interaction => {
    if (activeFilter === 'all') return true;
    return interaction.type === activeFilter;
  });

  const getInteractionIcon = (type) => {
    switch(type) {
      case 'vote': return <ThumbsUp className="text-blue-600" />;
      case 'comment': return <MessageCircle className="text-green-600" />;
      case 'favorite': return <Star className="text-yellow-600" />;
      default: return null;
    }
  };

  return (
    <div className='bg-slate-300 h-full min-h-screen'>
      <div className='fixed w-full top-0 left-0 bg-white'>
        <div className='mt-5 pb-4 shadow-md border-b-2'>
          <TopNavbar page={"interactions"} />
        </div>
      </div>
      
      <div className='pt-32 px-8'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800'>
            My Interactions
          </h1>

          <div className='bg-white rounded-2xl p-4 mb-6 flex items-center'>
            <Filter className="mr-4 text-gray-500" />
            <div className='flex space-x-4'>
              {['all', 'vote', 'comment', 'favorite'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeFilter === filter 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            {filteredInteractions.map((interaction, index) => (
              <div 
                key={index} 
                className='bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    {getInteractionIcon(interaction.type)}
                    <div>
                      <h3 className='font-bold text-lg'>
                        {interaction.idea.title}
                      </h3>
                      <p className='text-gray-600'>
                        {interaction.action} on {interaction.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2 text-gray-500'>
                    <span>By {interaction.idea.author}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredInteractions.length === 0 && (
              <div className='text-center bg-white p-8 rounded-2xl'>
                <p className='text-gray-600'>
                  No interactions found. Start exploring and engaging with ideas!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};