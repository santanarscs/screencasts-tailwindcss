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
import { Chart } from '../../../components/Chart';

type Tag = {
  id: string;
  name: string;
}

type Schedule = {
  id: string;
  title: string;
  type_schedule: string;
  tags: Tag[];
  active: boolean
}

type ItemJob = {
  id: string;
  proposition_id: string;
  type_proposition: string;
  date_apresentation: string;
  text: string;
  author: string;
  link: string;
  status: string
}

type Job = {
  id: string;
  date_job: string;
  schedule: Schedule;
  items: ItemJob[]
}

type ScheduleDetailProps = {
  schedule: Schedule
  jobs: Job[]
}

export default function DetailSchedule({schedule, jobs}: ScheduleDetailProps) {
  const router = useRouter()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [series, setSeries] = useState(() => {
    return jobs.map(job => job.items.length)
  })
  const [categories, setCategories] = useState(() => {
    return jobs.map(job => job.date_job)
  })

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

  async function handleRunJob() {
    await api.post('/jobs/once',  {
      schedule_id: schedule.id
    })
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
          <button onClick={handleRunJob} className="flex justify-center items-center uppercase  py-1 px-2 rounded-md text-sm bg-purple-400 text-white">
            Executar
          </button>
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
        <li><strong className="mr-2">Termos:</strong>
          <div className="space-x-2 mt-2">
            {schedule.tags.map(tag => ( <span className="py-1 px-2 bg-gray-300 rounded-md text-sm"  key={tag.id}>{tag.name}</span>))}
          </div>
        </li>
      </ul>
    </div>
    <div className="flex flex-1 flex-col rounded-md bg-gray-100 p-4 mt-4">
      <div className="flex justify-between w-full items-center mb-8 ">
        <h1 className="text-2xl font-normal text-gray-600">
          Últimos trabalhos
        </h1>
      </div>
      <Chart categories={categories} data={series} />
    </div>

    {jobs.map(job => (
      <div key={job.id} className="flex flex-1 flex-col rounded-md bg-gray-100 p-4 mt-4">
        <div className="flex justify-between w-full items-center mb-8 ">
          <h1 className="text-2xl font-normal text-gray-600">
            Trabalho execuado em {job.date_job}
          </h1>
        </div>
        <table className="table-fixed text-sm">
          <thead>
            <tr>
              <th className="text-left py-1 px-2 w-1/12">Número</th>
              <th className="text-left py-1 px-2 w-1/12">Tipo</th>
              <th className="text-left py-1 px-2 w-1/4">Apresentação</th>
              <th className="text-left py-1 px-2 w-1/2">Ementa</th>
              <th className="text-left py-1 px-2 w-1/5">Autor</th>
              <th className="text-left py-1 px-2 w-1/4">Status</th>
            </tr>
          </thead>
          <tbody>
            {job.items.map(item => (
              <tr key={item.id}>
                <td className="text-left py-1 px-2">{item.proposition_id}</td>
                <td className="text-left py-1 px-2">{item.type_proposition}</td>
                <td className="text-left py-1 px-2">{item.date_apresentation}</td>
                <td className="text-left py-1 px-2">{item.text}</td>
                <td className="text-left py-1 px-2">{item.author}</td>
                <td className="text-left py-1 px-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
    
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
  const {data: schedule} = await api.get(`/schedules/${id}`)

  const { data: jobs } = await api.get(`/jobs/schedule/${id}`)

  return {
    props: { schedule, jobs }
  }
})
