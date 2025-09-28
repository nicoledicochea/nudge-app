import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);

  const dailyActions = [
    {
      id: 'log-meal',
      title: 'Log Meal',
      icon: '🍽️',
      action: () => onNavigate('plate-logger')
    },
    {
      id: 'log-water',
      title: 'Log Water',
      icon: '💧',
      action: () => onNavigate('water-logger')
    },
    {
      id: 'check-in',
      title: 'Check-in',
      icon: '✅',
      action: () => onNavigate('check-in')
    },
    {
      id: 'start-timer',
      title: 'Start Timer',
      icon: '⏱️',
      action: () => onNavigate('timer')
    }
  ];

  const progressItems = [
    {
      id: 'why-wall',
      title: 'Why Wall',
      icon: '📖',
      action: () => onNavigate('why-wall')
    },
    {
      id: 'progress',
      title: 'Progress',
      icon: '📊',
      action: () => onNavigate('progress')
    },
    {
      id: 'plate-log',
      title: 'Plate Log',
      icon: '🏆',
      action: () => onNavigate('plate-log')
    },
    {
      id: 'ai-help',
      title: 'How can I help you today?',
      icon: '✨',
      action: () => setShowChat(true),
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Nudge
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                🔔
              </button>
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.displayName || 'there'}! 👋
          </h2>
          <p className="text-gray-600">
            Ready to continue your wellness journey?
          </p>
        </div>

        {/* Daily Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {dailyActions.map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                className="bg-teal-600 text-white p-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="font-medium">{action.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Track Progress */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Track Progress</h3>
          <div className="space-y-3">
            {progressItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full p-4 rounded-lg text-left hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors ${
                  item.highlight 
                    ? 'bg-teal-600 text-white hover:bg-teal-700' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

          {/* AI Chat Interface - Full Screen */}
          {showChat && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
              {/* Chat Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #d1d5db', backgroundColor: 'white' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>AI Nudge Assistant</h3>
                <button
                  onClick={() => setShowChat(false)}
                  style={{ color: '#9ca3af', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              {/* Chat Messages */}
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', backgroundColor: '#e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: '#6b7280', fontSize: '12px', fontWeight: '500' }}>AI</span>
                    </div>
                    <div style={{ backgroundColor: '#f3f4f6', padding: '8px', maxWidth: '300px' }}>
                      <p style={{ fontSize: '12px', color: '#1f2937' }}>
                        Hello! I'm your Nudge AI Assistant. I can help you log meals, track water, and provide insights. What can I do for you today?
                      </p>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>10:00 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div style={{ padding: '16px', borderTop: '1px solid #d1d5db', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <button style={{ color: '#9ca3af', fontSize: '14px', cursor: 'pointer' }}>
                    📎
                  </button>
                  <button style={{ color: '#9ca3af', fontSize: '14px', cursor: 'pointer' }}>
                    📷
                  </button>
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    style={{ flex: 1, padding: '4px 8px', fontSize: '14px', border: '1px solid #d1d5db', outline: 'none' }}
                  />
                  <button style={{ color: '#9ca3af', fontSize: '14px', cursor: 'pointer' }}>
                    🎤
                  </button>
                  <button style={{ backgroundColor: '#0d9488', color: 'white', padding: '4px', fontSize: '14px', cursor: 'pointer' }}>
                    ➤
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};
