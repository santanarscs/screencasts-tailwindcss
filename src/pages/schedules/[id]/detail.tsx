import { PlusIcon, PencilIcon, XIcon, EyeIcon } from '@heroicons/react/outline'
import NextLink from 'next/link'
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next';
import { api } from '../../../services/api';

type Schedule = {
  id: string;
  title: string;
  repeat: string;
  terms: string[];
  active: boolean
}

type ScheduleDetailProps = {
  schedule: Schedule
}


export default function DetailSchedule({schedule}: ScheduleDetailProps) {
  const router = useRouter()
 
  function handleRemoveSchedule(id: string) {
    console.log(id)
  }
  function handleActiveSchedule(id: string) {
    console.log('Active', id)
  }
  function handleDesactiveSchedule(id: string) {
    console.log('Desactive', id)
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex w-full my-6 mx-auto px-6 max-w-screen-2xl">
        <Sidebar />
        <div className="flex flex-1 flex-col rounded-md bg-gray-100 p-4">
          <div className="flex justify-between w-full items-center mb-8 ">
            <h1 className="text-2xl font-normal text-gray-600">
              Detalhes
            </h1>
            <div className="flex space-x-2">
              <NextLink href={`/schedules/${schedule.id}/edit`} passHref>
                <a className="flex justify-center items-center  py-1 px-2 uppercase rounded-md text-sm bg-brand text-white">
                  Editar
                </a>
              </NextLink>
             {schedule.active 
             ? (
              <button onClick={() => handleDesactiveSchedule(schedule.id)} className="flex justify-center items-center uppercase  py-1 px-2 rounded-md text-sm bg-gray-300 text-gray-700">
                Desativar
              </button>
             )
             : (
              <button onClick={() => handleActiveSchedule(schedule.id)} className="flex justify-center items-center uppercase  py-1 px-2 rounded-md text-sm bg-green-500 text-white">
                Ativar
              </button>
             )
             }
              <button onClick={() => handleRemoveSchedule(schedule.id)} className="flex justify-center items-center uppercase  py-1 px-2 rounded-md text-sm bg-red-400 text-white">
                Remover
              </button>
            </div>
          </div>
          <ul className="space-y-3">
            <li><strong className="mr-2">Nome:</strong>{schedule.title}</li>
            <li><strong className="mr-2">Repetição:</strong>{schedule.repeat}</li>
            <li>
            <strong className="mr-2">Status:</strong>{schedule.active 
                      ? (<span className="bg-green-400 px-2 py-1 rounded-md text-xs text-white ">Ativado</span>) 
                      : (<span className="bg-gray-300 px-2 py-1 rounded-md text-xs text-gray-700 ">Desativado</span>)}
            </li>
            <li><strong className="mr-2">Termos:</strong>{schedule.terms.join(', ')}</li>
          </ul>
          
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { id } = params;
  const response = await api.get(`/schedules/${id}`)
  const schedule = response.data
  return {
    props: { schedule }
  }
}
