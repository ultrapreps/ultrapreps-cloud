import axios from 'axios';

export async function aggregateStats(name: string): Promise<string[]> {
  // Example: Use a real sports stats API (replace with actual endpoint and params)
  const apiUrl = `https://api.thesportsdb.com/v1/json/3/searchplayers.php?p=${encodeURIComponent(name)}`;
  const response = await axios.get(apiUrl);
  const player = response.data.player?.[0];
  if (!player) throw new Error('Athlete not found');

  // Aggregate stats (replace with real stat fields as needed)
  return [
    player.strHeight || '',
    player.strWeight || '',
    player.strPosition || '',
    player.strTeam || '',
    player.strNationality || ''
  ];
}