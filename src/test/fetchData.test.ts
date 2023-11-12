import { fetchData } from '../services/fetchData';
import { ApiResponse } from '../services/types';

describe('fetchData function', () => {
  it('fetches data from API', async () => {
    const mockApiResponse: ApiResponse = {
      count: 1000,
      data: [
        {
          id: '1',
          name: 'Character Name',
          images: {
            small: 'character-image.jpg',
            large: 'character-image-large.jpg',
          },
        },
      ],
      totalCount: 100,
      pageSize: 10,
      page: 1,
    };
    const mockPage = '1';
    const mockPageSize = '10';

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockApiResponse),
      headers: {},
      redirected: false,
      status: 200,
      statusText: 'OK',
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await fetchData(mockPage, mockPageSize);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.pokemontcg.io/v2/cards/?page=${mockPage}&pageSize=${mockPageSize}&select=id,name,images`
    );

    expect(result).toEqual(mockApiResponse);
  });

  it('handles error when fetching data', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    await expect(fetchData('1', '10')).rejects.toThrow('Error fetching data: Error: Network error');
  });
});
