import { Character } from '../../components/DataCard/DataCardTypes';

export interface HomeStates {
  data: {
    count: number;
    next: string;
    results: Character[];
  } | null;
  searchValue: string;
  isLoading: boolean;
}
