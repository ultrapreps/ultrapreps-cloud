import axios from 'axios';

export interface AthleteStats {
  height: string;
  weight: string;
  position: string;
  stats: string[];
  achievements: string[];
  imageUrl?: string;
}

export async function fetchAthleteStats(name: string): Promise<AthleteStats> {
  // Example: Use a real sports stats API (replace with actual endpoint and params)
  const apiUrl = `https://api.thesportsdb.com/v1/json/3/searchplayers.php?p=${encodeURIComponent(name)}`;
  const response = await axios.get(apiUrl);
  const player = response.data.player?.[0];
  if (!player) throw new Error('Athlete not found');

  return {
    height: player.strHeight || '',
    weight: player.strWeight || '',
    position: player.strPosition || '',
    stats: [player.strDescriptionEN?.slice(0, 50) || ''], // Example, replace with real stats fields
    achievements: [player.strTeam || '', player.strNationality || ''],
    imageUrl: player.strCutout || player.strThumb || undefined
  };
}