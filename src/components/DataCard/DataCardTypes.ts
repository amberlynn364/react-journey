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
  gender: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
}
