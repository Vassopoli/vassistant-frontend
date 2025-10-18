import React from 'react';
import FinancialClient from './FinancialClient';

const FinancialPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Financial Information</h1>
      <FinancialClient />
    </div>
  );
};

export default FinancialPage;
