import React from 'react';

type GroupPageProps = {
  params: {
    groupId: string;
  };
};

const GroupPage = ({ params }: GroupPageProps) => {
  const { groupId } = params;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Group Details</h1>
      <p>This is the page for group with ID: {groupId}</p>
    </div>
  );
};

export default GroupPage;
