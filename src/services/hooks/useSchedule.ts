import { useQuery, UseQueryOptions } from 'react-query'
import { api } from '../api'

export type Schedule = {
  id: string;
  name: string;
  description: string;
  repeat: string;
  terms: string[];
}

type GetSchedulesResponse = {
  totalCount: number;
  schedules: Schedule[]
}

const TEN_MINUTES_IN_MILLISECONDS = 1000 * 60 * 10;

export async function getSchedules(page: number): Promise<GetSchedulesResponse> {
  
  const {data, headers} = await api.get('/schedules', {
    params: {
      '_page': page,
      '_limit': 10
    }
  })

  const totalCount = Number(headers['x-total-count'])
  const schedules = data
  return { schedules, totalCount }
}

export function useSchedules(page: number, options?:UseQueryOptions ) {
  return useQuery(['schedules', page], () => getSchedules(page), {
    staleTime: TEN_MINUTES_IN_MILLISECONDS,
    ...options
  })
}