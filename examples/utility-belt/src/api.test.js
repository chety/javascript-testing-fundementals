import { vi } from 'vitest';
import * as api from './api';

const getConcerts = async (bandName) => {
  const response = await api.fetchConcerts(bandName);
  return response.data;
};

function delayedBandData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Green Day', genre: 'Punk Rock' });
    }, 5000);
  });
}

describe('delayedBandData', () => {
  it('should return  the band', () => {
    vi.useFakeTimers();

    const band = delayedBandData();
    vi.advanceTimersByTime(5000);
    expect(band).resolves.toEqual({ name: 'Green Day', genre: 'Punk Rock' });
  });
});

describe('api tests', () => {
  vi.mock('./api', () => ({
    fetchConcerts: vi
      .fn()
      .mockResolvedValue({ data: [{ id: 1, name: 'Mirko' }] }),
  }));

  it('should return the user if the response is OK', async () => {
    const concert = await getConcerts('Birci');
    expect(concert).toEqual([{ id: 1, name: 'Mirko' }]);
  });
});
