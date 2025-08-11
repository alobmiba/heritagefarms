'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function DebugPage() {
  const { data: session, status } = useSession();
  const [adminEmails, setAdminEmails] = useState<string>('');

  useEffect(() => {
    // Fetch admin emails from environment (this will be empty on client side for security)
    fetch('/api/debug')
      .then(res => res.json())
      .then(data => {
        setAdminEmails(data.adminEmails || 'Not available');
      })
      .catch(() => {
        setAdminEmails('Error fetching');
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Session Status</h2>
          <div className="space-y-2">
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Authenticated:</strong> {status === 'authenticated' ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {session && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Session Data</h2>
            <div className="space-y-2">
              <p><strong>Email:</strong> {session.user?.email}</p>
              <p><strong>Name:</strong> {session.user?.name}</p>
              <p><strong>Image:</strong> {session.user?.image ? 'Yes' : 'No'}</p>
              <p><strong>Is Admin:</strong> {(session as any).isAdmin ? 'Yes' : 'No'}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          <div className="space-y-2">
            <p><strong>Admin Emails:</strong> {adminEmails}</p>
            <p><strong>NEXTAUTH_URL:</strong> {process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'Not set'}</p>
            <p><strong>NEXTAUTH_SECRET:</strong> {process.env.NEXT_PUBLIC_NEXTAUTH_SECRET ? 'Set' : 'Not set'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/api/auth/signin'}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
            <button
              onClick={() => window.location.href = '/api/auth/signout'}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-4"
            >
              Sign Out
            </button>
            <button
              onClick={() => window.location.href = '/admin'}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-4"
            >
              Try Admin Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
