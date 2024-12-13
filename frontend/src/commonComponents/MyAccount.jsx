import React, { useEffect, useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Edit3, 
  Save 
} from 'lucide-react';
import { TopNavbar } from './TopNavbar';
import axios from 'axios';

export const MyAccountPage = () => {
  const [userData, setUserData] = useState({
    name: 'Pranshul Gupta',
    email: 'pranshul18@gmail.com',
    joinDate: 'January 15, 2024',
    bio: 'Passionate innovator and tech enthusiast',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/users/",{
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }
    }).then((response)=>{
        setUserData({
            name:response.data.username,
            email:response.data.email,
            joinDate:response.data.createdAt,
            bio:response.data.bio
        })
    })
  },[isEditing])

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='bg-slate-300 h-full min-h-screen'>
      <div className='fixed w-full top-0 left-0 bg-white'>
        <div className='mt-5 pb-4 shadow-md border-b-2'>
          <TopNavbar page={"account"} />
        </div>
      </div>
      
      <div className='pt-32 px-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='bg-white rounded-2xl shadow-2xl p-8'>
            <div className='flex justify-between items-center mb-8'>
              <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800'>
                My Account
              </h1>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-full transition-all ${
                  isEditing 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <label className='flex items-center text-gray-700 mb-2'>
                    <User className='mr-2 text-blue-600' /> Name
                  </label>
                  {isEditing ? (
                    <input 
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border-2 border-blue-100 rounded-lg focus:outline-none focus:border-blue-500'
                    />
                  ) : (
                    <p className='bg-blue-50 px-4 py-3 rounded-lg'>{userData.name}</p>
                  )}
                </div>

                <div>
                  <label className='flex items-center text-gray-700 mb-2'>
                    <Mail className='mr-2 text-green-600' /> Email
                  </label>
                  {isEditing ? (
                    <input 
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border-2 border-green-100 rounded-lg focus:outline-none focus:border-green-500'
                    />
                  ) : (
                    <p className='bg-green-50 px-4 py-3 rounded-lg'>{userData.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className='flex items-center text-gray-700 mb-2'>
                  <Calendar className='mr-2 text-purple-600' /> Join Date
                </label>
                <p className='bg-purple-50 px-4 py-3 rounded-lg'>{userData.joinDate}</p>
              </div>

              <div>
                <label className='flex items-center text-gray-700 mb-2'>
                  <Edit3 className='mr-2 text-indigo-600' /> Bio
                </label>
                {isEditing ? (
                  <textarea 
                    name="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className='w-full px-4 py-3 border-2 border-indigo-100 rounded-lg focus:outline-none focus:border-indigo-500'
                  />
                ) : (
                  <p className='bg-indigo-50 px-4 py-3 rounded-lg'>{userData.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};