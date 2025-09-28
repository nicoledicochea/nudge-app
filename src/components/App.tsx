import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { AuthModal } from './AuthModal';
import { UserProfile } from './UserProfile';
import VisualPlateLogger from './VisualPlateLogger';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication modal if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome to Nudge
            </h1>
            <p className="text-lg text-gray-600">
              Your gentle companion for building healthy habits
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Get Started
              </h2>
              <p className="text-gray-600">
                Sign in to start your wellness journey
              </p>
            </div>
            
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg font-medium"
            >
              Sign In / Sign Up
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              By continuing, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  // Show main app if user is logged in
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Nudge
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium">
                  {user.displayName || user.email}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VisualPlateLogger />
      </main>
      
      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 z-10"
            >
              ×
            </button>
            <UserProfile />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
