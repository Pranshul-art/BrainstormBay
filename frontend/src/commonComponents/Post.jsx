import React, { useState } from 'react';
import { 
  PlusCircle, 
  Tag, 
  FileText, 
  Globe, 
  Save, 
  ArrowLeft,
  Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopNavbar } from './TopNavbar';
import axios from 'axios';

const PostIdeaPage = () => {
  const navigate = useNavigate();
  const [ideaData, setIdeaData] = useState({
    title: '',
    description: '',
    technologies: '',
    visibility: 'public',
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIdeaData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdeaData(prevData => ({
        ...prevData,
        coverImage: URL.createObjectURL(file)
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
        
        const response=await axios.post("http://localhost:3000/api/v1/ideas/",{
            title:ideaData.title,
            description:ideaData.description,
            technologies:ideaData.technologies
        },{
            headers:{
            Authorization:"Bearer "+ localStorage.getItem("token")
        }})
        console.log('Idea Submitted:', ideaData);
        navigate("/dashboard")
    
  };

  return (
    <div className=''>
        <div className='fixed w-full top-0 left-0 bg-white'>
                <div className='mt-5 pb-4 shadow-md border-b-2'>
                    <TopNavbar page={"post"} />
                </div>
        </div>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6 mt-20 pt-12">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center">
            <button 
                onClick={() =>{
                    navigate("/dashboard")
                } }
                className="mr-4 hover:bg-blue-700 p-2 rounded-full transition-colors"
            >
                <ArrowLeft />
            </button>
            <h1 className="text-2xl font-bold flex-grow">Post Your Innovative Idea</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <label className="flex items-center text-gray-700 mb-2">
                    <FileText className="mr-2 text-blue-600" /> Idea Title
                </label>
                <input 
                    type="text"
                    name="title"
                    value={ideaData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a unique and compelling title"
                    required
                    className="w-full px-4 py-3 border-2 border-blue-100 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                />
                </div>

                <div>
                <label className="flex items-center text-gray-700 mb-2">
                    <FileText className="mr-2 text-green-600" /> Detailed Description
                </label>
                <textarea 
                    name="description"
                    value={ideaData.description}
                    onChange={handleInputChange}
                    placeholder="Explain your idea in depth. What problem does it solve?"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border-2 border-green-100 rounded-lg focus:outline-none focus:border-green-500 transition-all"
                />
                </div>

                <div>
                <label className="flex items-center text-gray-700 mb-2">
                    <Tag className="mr-2 text-purple-600" /> Technologies
                </label>
                <input 
                    type="text"
                    name="technologies"
                    value={ideaData.technologies}
                    onChange={handleInputChange}
                    placeholder="React, AI, Blockchain..."
                    className="w-full px-4 py-3 border-2 border-purple-100 rounded-lg focus:outline-none focus:border-purple-500 transition-all"
                />
                </div>

                <div>
                <label className="flex items-center text-gray-700 mb-2">
                    <Globe className="mr-2 text-indigo-600" /> Visibility
                </label>
                <div className="flex space-x-4">
                    {['public', 'private', 'community'].map(level => (
                    <label 
                        key={level} 
                        className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-all 
                        ${ideaData.visibility === level 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                    >
                        <input 
                        type="radio"
                        name="visibility"
                        value={level}
                        checked={ideaData.visibility === level}
                        onChange={handleInputChange}
                        className="hidden"
                        />
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </label>
                    ))}
                </div>
                </div>
            </form>

            <div className="space-y-6">
                <div>
                <label className="flex items-center text-gray-700 mb-2">
                    <Upload className="mr-2 text-blue-600" /> Cover Image
                </label>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 border-2 border-dashed border-blue-200 rounded-lg"
                />
                </div>

                {ideaData.coverImage && (
                <div className="relative">
                    <img 
                    src={ideaData.coverImage} 
                    alt="Cover Preview" 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                    <button 
                    onClick={() => setIdeaData(prev => ({...prev, coverImage: null}))}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                    >
                    <X size={16} />
                    </button>
                </div>
                )}

                <button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 
                transition-all duration-300 flex items-center justify-center"
                >
                <Save className="mr-2" /> Publish Idea
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default PostIdeaPage;