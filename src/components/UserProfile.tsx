import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

interface UserProfileData {
  id: number;
  email: string;
  name: string;
  photo_url: string | null;
  goal: string | null;
  bariatric_stage: string | null;
  created_at: string;
}

interface UserProfileProps {
  onNavigate?: (page: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onNavigate }) => {
  const { user, signOut, getIdToken } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    bariatric_stage: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const token = await getIdToken();
      if (!token) return;

      const response = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);
        setFormData({
          name: data.user.name || '',
          goal: data.user.goal || '',
          bariatric_stage: data.user.bariatric_stage || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = await getIdToken();
      if (!token) return;

      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ textAlign: 'center', padding: '32px' }}>
        <p>Unable to load profile</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Profile</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
            Email
          </label>
          <p>{profile.email}</p>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
            Name
          </label>
          {editing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }}
            />
          ) : (
            <p>{profile.name || 'Not set'}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
            Goal
          </label>
          {editing ? (
            <select
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }}
            >
              <option value="">Select a goal</option>
              <option value="general_wellness">General Wellness</option>
              <option value="post_diet_recovery">Post Diet Recovery</option>
              <option value="bariatric_support">Bariatric Support</option>
            </select>
          ) : (
            <p>{profile.goal || 'Not set'}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
            Bariatric Stage
          </label>
          {editing ? (
            <select
              value={formData.bariatric_stage}
              onChange={(e) => setFormData({ ...formData, bariatric_stage: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }}
            >
              <option value="">Not applicable</option>
              <option value="pre_op">Pre-operative</option>
              <option value="post_op_early">Post-operative (Early)</option>
              <option value="post_op_late">Post-operative (Late)</option>
              <option value="maintenance">Maintenance</option>
            </select>
          ) : (
            <p>{profile.bariatric_stage || 'Not applicable'}</p>
          )}
        </div>

        <div style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {editing ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleSave}
                style={{ flex: 1, backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                style={{ flex: 1, backgroundColor: '#d1d5db', color: '#374151', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
            >
              Edit Profile
            </button>
          )}
          
          <button
            onClick={handleSignOut}
            style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
