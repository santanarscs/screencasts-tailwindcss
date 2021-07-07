import { useQuery, UseQueryOptions } from 'react-query'
import { api } from '../api'

export type Schedule = {
  id: string;
  name: string;
  description: string;
  repeat: string;
  tags: string[];
}

type GetSchedulesResponse = {
  totalCount: number;
  schedules: Schedule[]
}

const TEN_MINUTES_IN_MILLISECONDS = 1000 * 60 * 10;

export async function getSchedules(page: number, owner_id: string): Promise<GetSchedulesResponse> {
  const { data, headers } = await api.get('/schedules', {
    params: {
      'page': page,
      'limit': 10,
      owner_id
    }
  })
  const schedules= data
  const totalCount = headers['x-total-count']

  return { schedules, totalCount }
}

export function useSchedules(page: number, owner_id: string, options?:UseQueryOptions ) {
  return useQuery(['schedules', page], () => getSchedules(page, owner_id), {
    staleTime: TEN_MINUTES_IN_MILLISECONDS,
    ...options
  })
}