import ExpenseDetailClient from './ExpenseDetailClient';

export default function ExpenseDetailPage({ params }: { params: { groupId: string, expenseId: string } }) {
  return <ExpenseDetailClient groupId={params.groupId} expenseId={params.expenseId} />;
}
