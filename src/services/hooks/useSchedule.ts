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

export async function getSchedules(page: number): Promise<GetSchedulesResponse> {
  
  const { data } = await api.get('/schedules', {
    params: {
      'page': page,
      'limit': 10
    }
  })
  const [schedules, totalCount] = data

  return { schedules, totalCount }
}

export function useSchedules(page: number, options?:UseQueryOptions ) {
  return useQuery(['schedules', page], () => getSchedules(page), {
    staleTime: TEN_MINUTES_IN_MILLISECONDS,
    ...options
  })
}