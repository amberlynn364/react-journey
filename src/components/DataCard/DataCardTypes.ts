export interface DataCardProps {
  data: {
    count: number;
    next: string;
    results: Character[];
  } | null;
  isLoading: boolean;
}
export interface Character {
  name: string;
  eyeColor: string;
  hairColor: string;
  height: string;
  mass: string;
}
