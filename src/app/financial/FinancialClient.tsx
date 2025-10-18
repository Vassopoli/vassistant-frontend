"use client";

import React, { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchAuthSession } from 'aws-amplify/auth';
import Financial from '../../components/Financial';

interface Group {
  group_id: string;
  group_name: string;
}

const FinancialClient = () => {
  const [data, setData] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();

        if (!token) {
          setError('User is not authenticated.');
          return;
        }

        const response = await fetch('/api/financial/groups', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Failed to fetch data. Status: ${response.status}. Body: ${errorBody}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred")
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return <Financial data={data} />;
    };

export default withAuthenticator(FinancialClient);
