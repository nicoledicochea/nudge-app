import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 z-10"
        >
          ×
        </button>
        
        {isLoginMode ? (
          <LoginForm onToggleMode={toggleMode} onSuccess={handleSuccess} />
        ) : (
          <SignUpForm onToggleMode={toggleMode} onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
};
