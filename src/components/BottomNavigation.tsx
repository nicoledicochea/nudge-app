import React from 'react';

interface BottomNavigationProps {
  activeTab: string;
  onNavigate: (page: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onNavigate }) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '🏠',
      active: activeTab === 'dashboard'
    },
    {
      id: 'log',
      label: 'Log',
      icon: '🎯',
      active: activeTab === 'log'
    },
    {
      id: 'water',
      label: 'Water',
      icon: '💧',
      active: activeTab === 'water'
    },
    {
      id: 'check-in',
      label: 'Check-in',
      icon: '✅',
      active: activeTab === 'check-in'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      active: activeTab === 'profile'
    }
  ];

  return (
    <nav style={{ 
      position: 'fixed', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      backgroundColor: 'white', 
      borderTop: '1px solid #e5e7eb',
      zIndex: 1000
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-around', 
        height: '64px' 
      }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 12px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: item.active ? '#0d9488' : '#6b7280'
            }}
          >
            <span style={{ fontSize: '18px', marginBottom: '4px' }}>{item.icon}</span>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
