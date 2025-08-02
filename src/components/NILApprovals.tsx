export default function NILApprovals({ coachId, parentId }: { coachId?: string; parentId?: string }) {
  return (
    <div className="p-6 bg-gray-800 rounded-xl text-center text-white text-lg font-bold">
      NIL Approvals coming soon for {coachId ? `coach: ${coachId}` : `parent: ${parentId}`}
    </div>
  );
}