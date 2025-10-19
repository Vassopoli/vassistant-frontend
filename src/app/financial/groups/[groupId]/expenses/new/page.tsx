import AddExpenseClient from "./AddExpenseClient";

export default function AddExpensePage({ params }: { params: { groupId: string } }) {
  return <AddExpenseClient groupId={params.groupId} />;
}
