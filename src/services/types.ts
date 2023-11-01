import { Character } from '../components/DataCard/DataCardTypes';

export interface ApiResponse {
  count: number;
  next: string;
  results: Character[];
}
