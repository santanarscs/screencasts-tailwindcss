import { useQuery, UseQueryOptions } from 'react-query'
import { api } from '../api'

export type Schedule = {
  id: string;
  title: string;
  description: string;
  repeat: string;
  terms: string[];
}

type GetSchedulesResponse = {
  totalCount: number;
  schedules: Schedule[]
}

export async function getSchedules(page: number): Promise<GetSchedulesResponse> {
  const {data, headers} = await api.get('/schedules', {
    params: {
      page,
    }
  })
  const totalCount = Number(headers['x-total-count'])
  const schedules = data.schedules
  return {schedules, totalCount}
}

export function useSchedules(page: number, options:UseQueryOptions ) {
  return useQuery(['schedules', page], () => getSchedules(page), {
    staleTime: 1000 * 60 * 10,
    ...options
  })
}