'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function TestAuthPage() {
  const { data: session, status } = useSession();
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('/api/debug')
      .then(res => res.json())
      .then(setConfig);
  }, []);

  if (status === 'loading') {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Authentication Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h2 className="text-lg font-semibold mb-3">Current Status</h2>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Authenticated:</strong> {status === 'authenticated' ? 'Yes' : 'No'}</p>
        </div>

        {session && (
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h2 className="text-lg font-semibold mb-3">Your Session</h2>
            <p><strong>Email:</strong> {session.user?.email}</p>
            <p><strong>Name:</strong> {session.user?.name}</p>
            <p><strong>Is Admin:</strong> {(session as any).isAdmin ? 'Yes' : 'No'}</p>
          </div>
        )}

        {config && (
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h2 className="text-lg font-semibold mb-3">Configuration</h2>
            <p><strong>Admin Emails:</strong> {config.adminEmails}</p>
            <p><strong>NEXTAUTH_URL:</strong> {config.nextauthUrl}</p>
          </div>
        )}

        {session && config && (
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h2 className="text-lg font-semibold mb-3">Email Match Test</h2>
            {session.user?.email && config.adminEmails ? (
              <div>
                <p><strong>Your Email:</strong> {session.user.email}</p>
                <p><strong>Admin Emails:</strong> {config.adminEmails}</p>
                <p><strong>Email Match:</strong> {
                  config.adminEmails.toLowerCase().includes(session.user.email.toLowerCase()) 
                    ? '✅ MATCH' 
                    : '❌ NO MATCH'
                }</p>
              </div>
            ) : (
              <p>Missing email information</p>
            )}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Actions</h2>
          <div className="space-y-2">
            {status === 'unauthenticated' ? (
              <button
                onClick={() => window.location.href = '/api/auth/signin'}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Sign In with Google
              </button>
            ) : (
              <>
                <button
                  onClick={() => window.location.href = '/api/auth/signout'}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Sign Out
                </button>
                <button
                  onClick={() => window.location.href = '/admin'}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Try Admin Page
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
