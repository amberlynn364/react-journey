export interface ApiResponse {
  count: number;
  data: PokemonCardData[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface PokemonCardData {
  id: string;
  name: string;
  images: {
    large: string;
    small: string;
  };
}
