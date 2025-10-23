"use client";

import { useEffect, useState } from "react";
import { fetchAuthSession } from 'aws-amplify/auth';
import Link from 'next/link';
import LoadingModal from '@/components/LoadingModal';

interface Participant {
  userId: string;
  share: string;
}

interface FinancialExpense {
  expenseId: string;
  groupId: string;
  title: string;
  category: string;
  amount: string;
  dateTime: string;
  paidByUser: {
    showableName: string;
  };
  imageUrl: string;
  splitType: string;
  participants: Participant[];
}

export default function FinancialGroupClient({ groupId }: { groupId: string }) {
  const [expenses, setExpenses] = useState<FinancialExpense[]>([]);
  const [groupName, setGroupName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        if (!token) {
          throw new Error("Not authenticated");
        }

        const response = await fetch(`/api/financial/groups/${encodeURIComponent(groupId)}/expenses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Failed to fetch data. Status: ${response.status}. Body: ${errorBody}`);
        }

        const result = await response.json();
        if (Array.isArray(result)) {
          setExpenses(result);
        } else {
            setError("Unexpected response format.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [groupId]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        if (!token) {
          throw new Error("Not authenticated");
        }

        const response = await fetch(`/api/financial/groups/${encodeURIComponent(groupId)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Failed to fetch group details. Status: ${response.status}. Body: ${errorBody}`);
        }

        const result = await response.json();
        if (result && result.groupName) {
          setGroupName(result.groupName);
        } else {
          setError("Unexpected response format for group details.");
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (loading) {
    return <LoadingModal />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Group {groupName || groupId} Expenses</h1>
        <Link href={`/financial/groups/${encodeURIComponent(groupId)}/expenses/new`} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add Expense
        </Link>
      </div>
      {expenses.length === 0 ? (
        <p>No expenses found for this group.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li key={expense.expenseId} className="p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between">
                <span className="font-semibold">{expense.title}</span>
                <span className="text-gray-500">{new Date(expense.dateTime).toLocaleDateString()}</span>
              </div>
              <div className="text-lg font-mono">${expense.amount}</div>
              <div className="text-sm text-gray-600">Paid by: {expense.paidByUser.showableName}</div>
              <div className="text-sm text-gray-600">Category: {expense.category}</div>
              <div className="mt-4">
                <Link href={`/financial/groups/${encodeURIComponent(groupId)}/expenses/${encodeURIComponent(expense.expenseId)}`} className="text-indigo-600 hover:text-indigo-900">
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
