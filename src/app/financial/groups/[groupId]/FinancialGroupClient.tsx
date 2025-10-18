"use client";

import { useEffect, useState } from "react";
import { fetchAuthSession } from 'aws-amplify/auth';

interface Participant {
  userId: string;
  share: string;
}

interface FinancialExpense {
  expenseId: string;
  groupId: string;
  description: string;
  category: string;
  amount: string;
  dateTime: string;
  paidBy: string;
  imageUrl: string;
  splitType: string;
  participants: Participant[];
  settled: boolean;
}

export default function FinancialGroupClient({ groupId }: { groupId: string }) {
  const [expenses, setExpenses] = useState<FinancialExpense[]>([]);
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

        const response = await fetch(`/api/financial/groups/${groupId}`, {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Group {groupId} Expenses</h1>
      {expenses.length === 0 ? (
        <p>No expenses found for this group.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li key={expense.expenseId} className="p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between">
                <span className="font-semibold">{expense.description}</span>
                <span className="text-gray-500">{new Date(expense.dateTime).toLocaleDateString()}</span>
              </div>
              <div className="text-lg font-mono">${expense.amount}</div>
              <div className="text-sm text-gray-600">Paid by: {expense.paidBy}</div>
              <div className="text-sm text-gray-600">Category: {expense.category}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
