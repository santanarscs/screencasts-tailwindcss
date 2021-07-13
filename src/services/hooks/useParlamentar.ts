import { useQuery, UseQueryOptions } from 'react-query'
import { api } from '../api';

export type Representative = {
  id: string;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto: string;
  email: string;
}

type GetRepresentativesResponse = {
  totalCount: number;
  representatives: Representative[]
}

const TEN_MINUTES_IN_MILLISECONDS = 1000 * 60 * 10;


export async function getRepresentatives(page: number, name: string): Promise<GetRepresentativesResponse> {


  
  const { data, headers } = await api.get(`/representatives/`, {
    params: {
      page,
      limit: 10,
      name
    }
  })
  const representatives = data
  const totalCount = headers['x-total-count']

  return { representatives, totalCount }
}

export function useRepresentative(page: number, name?:string, options?:UseQueryOptions ) {
  return useQuery<GetRepresentativesResponse, Error>(['schedules', page, name], () => getRepresentatives(page, name), {
    staleTime: TEN_MINUTES_IN_MILLISECONDS,
    ...options
  } as any)
}