# Firebase Setup Guide

This guide will help you set up Firebase Authentication for the Nudge App.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "nudge-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Click on it and toggle "Enable"
   - **Google**: Click on it, toggle "Enable", and configure the OAuth consent screen if needed

## 3. Get Firebase Configuration

1. Go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a nickname (e.g., "nudge-app-web")
5. Copy the Firebase configuration object

## 4. Set Up Environment Variables

1. Copy `env.example` to `.env` in your project root
2. Fill in the Firebase configuration values:

```env
# Firebase Configuration (Frontend)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 5. Set Up Firebase Admin SDK (Backend)

1. In Firebase Console, go to "Project settings"
2. Go to the "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Extract the following values and add them to your `.env`:

```env
# Firebase Admin SDK (Backend)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

**Important**: The private key should be on a single line with `\n` characters for newlines.

## 6. Update Database Schema

The database schema has been updated to support Firebase UIDs. Run the following to update your existing database:

```sql
-- Add Firebase UID column to users table
ALTER TABLE users ADD COLUMN firebase_uid VARCHAR(255) UNIQUE;
ALTER TABLE users ADD COLUMN name VARCHAR(255);
ALTER TABLE users ADD COLUMN photo_url TEXT;
ALTER TABLE users ADD COLUMN goal VARCHAR(255);
ALTER TABLE users ADD COLUMN bariatric_stage VARCHAR(100);
```

## 7. Test the Setup

1. Start your development server: `npm run dev`
2. The app should now use Firebase Authentication
3. Try signing up with email/password or Google
4. Check that users are created in both Firebase and your PostgreSQL database

## 8. Production Considerations

- Set up proper Firebase security rules
- Configure authorized domains in Firebase Console
- Use environment variables for all sensitive data
- Consider setting up Firebase App Check for additional security

## Troubleshooting

### Common Issues

1. **"Firebase App named '[DEFAULT]' already exists"**
   - This usually means Firebase is being initialized multiple times
   - Check that you're only importing the Firebase config once

2. **"Invalid API key"**
   - Verify your environment variables are set correctly
   - Make sure the API key matches your Firebase project

3. **"Permission denied" errors**
   - Check that your Firebase Admin SDK credentials are correct
   - Verify the service account has the necessary permissions

4. **Database connection issues**
   - Ensure your PostgreSQL database is running
   - Check that the DATABASE_URL is correct

### Getting Help

- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Review the [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- Check the console for error messages
- Verify all environment variables are set correctly
