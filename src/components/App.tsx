import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { AuthModal } from './AuthModal';
import { UserProfile } from './UserProfile';
import { Dashboard } from './Dashboard';
import { BottomNavigation } from './BottomNavigation';
import VisualPlateLogger from './VisualPlateLogger';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div>
        <div>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  // Show authentication modal if user is not logged in
  if (!user) {
    return (
      <div>
        <div>
          <div>
            <h1>Welcome to Nudge</h1>
            <p>Your gentle companion for building healthy habits</p>
          </div>
          
          <div>
            <div>
              <h2>Get Started</h2>
              <p>Sign in to start your wellness journey</p>
            </div>
            
            <button onClick={() => setShowAuthModal(true)}>
              Sign In / Sign Up
            </button>
          </div>
          
          <div>
            <p>By continuing, you agree to our terms of service and privacy policy.</p>
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

      const handleNavigate = (page: string) => {
        setCurrentPage(page);
      };

      const renderCurrentPage = () => {
        switch (currentPage) {
          case 'dashboard':
            return <Dashboard onNavigate={handleNavigate} />;
          case 'plate-logger':
            return <VisualPlateLogger />;
          case 'profile':
            return <UserProfile onNavigate={handleNavigate} />;
          default:
            return <Dashboard onNavigate={handleNavigate} />;
        }
      };

  // Show main app if user is logged in
  return (
    <div>
      {/* Main Content */}
      <div style={{ paddingBottom: '64px' }}>
        {renderCurrentPage()}
      </div>

      {/* Bottom Navigation - always show */}
      <BottomNavigation activeTab={currentPage} onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
