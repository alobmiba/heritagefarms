# Firebase Setup Guide for Heritage Farms

This guide will help you set up Firebase for the Heritage Farms inventory and order management system.

## Prerequisites

- A Google account
- Node.js and npm installed
- Access to the Heritage Farms project

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `heritage-farms-{your-name}` (e.g., `heritage-farms-john`)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set up Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select a location close to your users (e.g., `us-central1`)
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web" (</>)
4. Register app with name: `Heritage Farms Website`
5. Copy the configuration object

## Step 4: Create Service Account

1. In Firebase Console, go to "Project settings"
2. Go to "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file (keep it secure!)

## Step 5: Set up Google OAuth (for Admin Access)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret

## Step 6: Configure Environment Variables

1. Copy `env.example` to `.env.local`
2. Fill in the values:

```bash
# Firebase client (from Step 3)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (from Step 4 JSON file)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# NextAuth (from Step 5)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Admin email whitelist
ADMIN_EMAILS=heritagefieldsandacreage@gmail.com
```

## Step 7: Add Sample Inventory Data

1. In Firebase Console, go to "Firestore Database"
2. Create a collection called "inventory"
3. Add some sample documents:

```json
{
  "sku": "CALLALOO-001",
  "name": "Callaloo (Amaranth)",
  "price": 500,
  "unit": "bunch",
  "stock": 25,
  "active": true,
  "imageUrl": "/branding/Images/products/callaloo-amaranth.png"
}
```

```json
{
  "sku": "PUMPKIN-001",
  "name": "Fluted Pumpkin Leaves",
  "price": 400,
  "unit": "bunch",
  "stock": 30,
  "active": true,
  "imageUrl": "/branding/Images/products/fluted-pumpkin-leaves.png"
}
```

## Step 8: Test the System

1. Start the development server: `npm run dev`
2. Test the public inventory API: `http://localhost:3000/api/inventory`
3. Test admin access: `http://localhost:3000/admin`
4. Test order submission through the website

## Security Rules (Optional but Recommended)

In Firestore Database > Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Inventory: read-only for public, full access for admin
    match /inventory/{document} {
      allow read: if true;
      allow write: if false; // Only through admin API
    }
    
    // Orders: create for public, read/write for admin
    match /orders/{document} {
      allow create: if true;
      allow read, write: if false; // Only through admin API
    }
  }
}
```

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized"**: Check your environment variables
2. **"Permission denied"**: Check Firestore security rules
3. **"Admin access denied"**: Verify your email is in ADMIN_EMAILS
4. **"Google OAuth error"**: Check redirect URIs in Google Cloud Console

### Debug Steps:

1. Check browser console for errors
2. Check server logs in terminal
3. Verify Firebase project settings
4. Test API endpoints directly

## Production Deployment

1. Update `NEXTAUTH_URL` to your production domain
2. Add production redirect URI to Google OAuth
3. Set up proper environment variables in your hosting platform
4. Consider setting up Firebase hosting for static assets

## Support

If you encounter issues:
1. Check the Firebase documentation
2. Review the NextAuth.js documentation
3. Check the browser console and server logs
4. Verify all environment variables are set correctly
