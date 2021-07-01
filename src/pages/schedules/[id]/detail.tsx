import NextLink from 'next/link'
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next';
import { api } from '../../../services/api';
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/queryClient';
import { useState } from 'react';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { DefaultLayoutComponent } from '../../../components/DefaultLayout';

type Schedule = {
  id: string;
  title: string;
  type_schedule: string;
  tags: string[];
  active: boolean
}

type ScheduleDetailProps = {
  schedule: Schedule
}

export default function DetailSchedule({schedule}: ScheduleDetailProps) {
  const router = useRouter()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isLoadingRunJob, setIsLoadingRunJob] = useState<boolean>(false)
  const updateSchedule = useMutation(async (data: Schedule) => {
    await api.put(`/schedules/${schedule.id}`, data)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('schedules')
    }
  })

  const removeSchedule = useMutation(async (schedule: Schedule) => {
    await api.delete(`schedules/${schedule.id}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('schedules')
    }
  })

  async function handleRunJob() {
    setIsLoadingRunJob(true)
    await api.post('/jobs/once', {
      schedule_id: schedule.id
    })
    setIsLoadingRunJob(false)
  }
   
  async function handleActiveSchedule() {
    await updateSchedule.mutateAsync({...schedule, active: true})
    router.push('/schedules')
  }

  async function handleDesactiveSchedule() {
    await updateSchedule.mutateAsync({...schedule, active: false})
    router.push('/schedules')
  }
  async function handleRemoveSchedule() {
    await removeSchedule.mutateAsync(schedule)
    setIsOpenModal(false)
    router.push('/schedules')
  }

  function openModalConfirm() {
    setIsOpenModal(true)
  }
 
  return (
    <DefaultLayoutComponent>
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
          <button onClick={handleRunJob} className="flex justify-center items-center uppercase  py-1 px-2 rounded-md text-sm bg-purple-400 text-white">
            {isLoadingRunJob ? 'Aguarde...' : 'Executar agora'}
          </button>
          {schedule.active 
          ? (
          <button onClick={handleDesactiveSchedule} className="flex justify-center items-center uppercase  py-1 px-2 rounded-md text-sm bg-gray-300 text-gray-700">
            Desativar
          </button>
          )
          : (
          <button onClick={handleActiveSchedule} className="flex justify-center items-center uppercase  py-1 px-2 rounded-md text-sm bg-green-500 text-white">
            Ativar
          </button>
          )
          }
          <button onClick={openModalConfirm} className="flex justify-center items-center uppercase  py-1 px-2 rounded-md text-sm bg-red-400 text-white">
            Remover
          </button>
        </div>
      </div>
      <ul className="space-y-3">
        <li><strong className="mr-2">Nome:</strong>{schedule.title}</li>
        <li><strong className="mr-2">Repetição:</strong>{schedule.type_schedule}</li>
        <li>
        <strong className="mr-2">Status:</strong>{schedule.active 
                  ? (<span className="bg-green-400 px-2 py-1 rounded-md text-xs text-white ">Ativado</span>) 
                  : (<span className="bg-gray-300 px-2 py-1 rounded-md text-xs text-gray-700 ">Desativado</span>)}
        </li>
        <li><strong className="mr-2">Termos:</strong>{schedule.tags.join(', ')}</li>
      </ul>
      
    </div>
    <ConfirmModal
      title="Tem certeza desta ação?"
      isOpen={isOpenModal}
      handleCloseModal={() => setIsOpenModal(false)}
      handleConfirmModal={handleRemoveSchedule}
      text="Deseja remover este item do banco de dados?"
    />
  </DefaultLayoutComponent>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({params}) => {
  const { id } = params;
  const response = await api.get(`/schedules/${id}`)
  const schedule = response.data

  return {
    props: { schedule }
  }
})
