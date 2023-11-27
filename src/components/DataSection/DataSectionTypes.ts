import { Character } from '../DataCard/DataCardTypes';

export interface DataSectionProps {
  data: {
    count: number;
    next: string;
    results: Character[];
  } | null;
  isLoading: boolean;
}
