"use client";

import { useEffect, useState } from "react";
import { fetchAuthSession } from 'aws-amplify/auth';
import Link from "next/link";

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

export default function ExpenseDetailClient({ groupId, expenseId }: { groupId: string, expenseId: string }) {
  const [expense, setExpense] = useState<FinancialExpense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        if (!token) {
          throw new Error("Not authenticated");
        }

        const response = await fetch(`/api/financial/groups/${encodeURIComponent(groupId)}/expenses/${encodeURIComponent(expenseId)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Failed to fetch data. Status: ${response.status}. Body: ${errorBody}`);
        }

        const result = await response.json();
        setExpense(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [groupId, expenseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!expense) {
    return <div>Expense not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Expense Details</h1>
        <Link href={`/financial/groups/${encodeURIComponent(groupId)}`} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Back to Group
        </Link>
      </div>
      <div className="p-4 border rounded-lg shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">Title:</span> {expense.title}
          </div>
          <div>
            <span className="font-semibold">Amount:</span> ${expense.amount}
          </div>
          <div>
            <span className="font-semibold">Date:</span> {new Date(expense.dateTime).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">Paid by:</span> {expense.paidByUser.showableName}
          </div>
          <div>
            <span className="font-semibold">Category:</span> {expense.category}
          </div>
          <div>
            <span className="font-semibold">Split Type:</span> {expense.splitType}
          </div>
        </div>
        {expense.imageUrl && (
            <div>
              <span className="font-semibold">Image:</span>
              <img src={expense.imageUrl} alt={expense.title} className="w-full h-auto" />
            </div>
          )}
        <div className="mt-4">
          <h2 className="text-xl font-bold">Participants</h2>
          <ul className="space-y-2">
            {expense.participants.map((participant) => (
              <li key={participant.userId}>
                <span className="font-semibold">User ID:</span> {participant.userId}, <span className="font-semibold">Share:</span> {participant.share}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
