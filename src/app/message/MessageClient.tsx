"use client";

import React, { useEffect, useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Chat from '@/components/Chat';
import LoadingModal from '@/components/LoadingModal';

const MessageClient = ({ user }: { user?: any }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await fetchAuthSession();
        const token = `Bearer ${session.tokens?.idToken}`;
        alert(`Authorization: ${token}`);
        setAuthToken(token);
        const response = await fetch('/api/proxy', {
          headers: {
            Authorization: token,
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4" style={{ height: 'calc(100vh - 200px)' }}>
      <h1 className="text-2xl font-bold">Message Page</h1>
      {loading && <LoadingModal />}
      {error && <p>Error: {error.message}</p>}
      {data && user && <Chat user={user} initialData={data} authToken={authToken} />}
    </div>
  );
};

export default withAuthenticator(MessageClient);
