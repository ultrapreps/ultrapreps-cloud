export default function RivalryCampaigns({ coachId }: { coachId: string }) {
  return (
    <div className="p-6 bg-gray-800 rounded-xl text-center text-white text-lg font-bold">
      Rivalry Campaigns coming soon for coach: {coachId}
    </div>
  );
}