"use client";

import React from 'react';
import Link from 'next/link';

interface Group {
  groupId: string;
  groupName: string;
  groupImage: string;
}

interface FinancialProps {
  data: Group[];
}

const Financial: React.FC<FinancialProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No financial data available.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Financial Groups</h2>
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b"></th>
            <th className="py-2 px-4 border-b">Group Name</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((group) => (
            <tr key={group.groupId}>
              <td className="py-2 px-4 border-b">
                <img src={group.groupImage} alt={group.groupName} className="w-10 h-10 rounded-full" />
              </td>
              <td className="py-2 px-4 border-b">{group.groupName}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  href={`/financial/groups/${encodeURIComponent(group.groupId)}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Expenses
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Financial;
