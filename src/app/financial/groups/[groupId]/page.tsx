import FinancialGroupClient from "./FinancialGroupClient";

export default function FinancialGroupPage({ params }: { params: { groupId: string } }) {
  return <FinancialGroupClient groupId={params.groupId} />;
}
