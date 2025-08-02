export default function Stickers({ eventId }: { eventId: string }) {
  return (
    <div className="p-6 bg-gray-800 rounded-xl text-center text-white text-lg font-bold">
      Stickers coming soon for event: {eventId}
    </div>
  );
}