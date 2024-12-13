import React, { useState } from 'react';
import { 
  Users, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  Shield 
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserSymbol } from './UserSymbol';

export const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: <User className="mr-2 text-blue-600" />, 
      label: 'My Account', 
      onClick: () => navigate('/account')
    },
    { 
      icon: <Shield className="mr-2 text-green-600" />, 
      label: 'Privacy & Security', 
      onClick: () => navigate('/security')
    },
    { 
      icon: <LogOut className="mr-2 text-red-600" />, 
      label: 'Log Out', 
      onClick: () => {
        console.log('Logging out');
        navigate('/signin');
      }
    }
  ];
    const [searchParams]=useSearchParams();
    const alpha=searchParams.get("name");
    const response=localStorage.getItem("name")
    


  return (
    <div className="relative">
      <div 
        className='mt-2 pt-2 ml-20 gap-3 bg-slate-300 cursor-pointer rounded-full px-2 py-2 h-10 flex items-center'
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <UserSymbol Alpha={response.toUpperCase()}/>
        <ChevronDown className='text-green-600'/>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
          <div className="py-2">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center transition-colors"
                onClick={() => {
                  item.onClick();
                  setIsDropdownOpen(false);
                }}
              >
                {item.icon}
                <span className="text-gray-800">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};