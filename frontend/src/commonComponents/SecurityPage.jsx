import React, { useState } from 'react';
import { 
  Lock, 
  Shield, 
  Eye, 
  EyeOff, 
  Bell, 
  CheckCircle 
} from 'lucide-react';
import { TopNavbar } from './TopNavbar';

export const SecurityPage = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    emailNotifications: true,
    privacyMode: false
  });

  const toggleSetting = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className='bg-slate-300 h-full min-h-screen'>
      <div className='fixed w-full top-0 left-0 bg-white'>
        <div className='mt-5 pb-4 shadow-md border-b-2'>
          <TopNavbar page={"security"} />
        </div>
      </div>
      
      <div className='pt-32 px-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='bg-white rounded-2xl shadow-2xl p-8'>
            <h1 className='text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800'>
              Privacy & Security
            </h1>

            <div className='space-y-6'>
              <div className='flex justify-between items-center bg-blue-50 p-4 rounded-lg'>
                <div className='flex items-center'>
                  <Lock className='mr-4 text-blue-600' />
                  <div>
                    <h3 className='font-bold'>Two-Factor Authentication</h3>
                    <p className='text-sm text-gray-600'>Add an extra layer of security to your account</p>
                  </div>
                </div>
                <div 
                  onClick={() => toggleSetting('twoFactorAuth')}
                  className={`w-12 h-6 rounded-full transition-all cursor-pointer ${
                    securitySettings.twoFactorAuth 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                  }`}
                >
                  <div 
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                      securitySettings.twoFactorAuth 
                      ? 'translate-x-6' 
                      : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              <div className='flex justify-between items-center bg-green-50 p-4 rounded-lg'>
                <div className='flex items-center'>
                  <Bell className='mr-4 text-green-600' />
                  <div>
                    <h3 className='font-bold'>Email Notifications</h3>
                    <p className='text-sm text-gray-600'>Receive updates about your interactions</p>
                  </div>
                </div>
                <div 
                  onClick={() => toggleSetting('emailNotifications')}
                  className={`w-12 h-6 rounded-full transition-all cursor-pointer ${
                    securitySettings.emailNotifications 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                  }`}
                >
                  <div 
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                      securitySettings.emailNotifications 
                      ? 'translate-x-6' 
                      : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              <div className='flex justify-between items-center bg-purple-50 p-4 rounded-lg'>
                <div className='flex items-center'>
                  <Eye className={`mr-4 ${securitySettings.privacyMode ? 'text-gray-400' : 'text-purple-600'}`} />
                  <EyeOff className={`mr-4 ${securitySettings.privacyMode ? 'text-purple-600' : 'text-gray-400'}`} />
                  <div>
                    <h3 className='font-bold'>Privacy Mode</h3>
                    <p className='text-sm text-gray-600'>Hide your profile and interactions</p>
                  </div>
                </div>
                <div 
                  onClick={() => toggleSetting('privacyMode')}
                  className={`w-12 h-6 rounded-full transition-all cursor-pointer ${
                    securitySettings.privacyMode 
                    ? 'bg-purple-500' 
                    : 'bg-gray-300'
                  }`}
                >
                  <div 
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                      securitySettings.privacyMode 
                      ? 'translate-x-6' 
                      : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              <div className='bg-indigo-50 p-4 rounded-lg flex items-center'>
                <CheckCircle className='mr-4 text-indigo-600' />
                <div>
                  <h3 className='font-bold'>Last Security Check</h3>
                  <p className='text-sm text-gray-600'>January 20, 2024 at 10:35 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};