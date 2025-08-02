export default function ESPNEventTicker({ eventId }: { eventId: string }) {
  return (
    <div className="p-6 bg-gray-800 rounded-xl text-center text-white text-lg font-bold">
      ESPN Event Ticker coming soon for event: {eventId}
    </div>
  );
}