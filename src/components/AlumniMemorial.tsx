export default function AlumniMemorial({ parentId }: { parentId: string }) {
  return (
    <div className="p-6 bg-gray-800 rounded-xl text-center text-white text-lg font-bold">
      Alumni/Memorial coming soon for parent: {parentId}
    </div>
  );
}