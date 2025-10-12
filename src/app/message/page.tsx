"use client";

import React, { useEffect, useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const MessagePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await fetchAuthSession();
        const response = await fetch('/api/proxy', {
          headers: {
            Authorization: `Bearer ${session.tokens?.idToken}`,
          },
        });
        alert(`Authorization: Bearer ${session.tokens?.idToken}`);
        if (!response.ok) {
          const errorText = await response.text();
          alert(`Error Response: ${errorText}`);
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const jsonData = await response.json();
        alert("API Response: " + JSON.stringify(jsonData));
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Message Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2 className="text-xl font-semibold mt-4">Fetched Data:</h2>
          <pre className="bg-gray-100 p-4 rounded-md mt-2">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default withAuthenticator(MessagePage);
