import NextLink from 'next/link'
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next';
import { api } from '../../../services/api';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from '../../../services/queryClient';
import { useState } from 'react';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { DefaultLayoutComponent } from '../../../components/DefaultLayout';
import { PencilAltIcon, CogIcon, CheckIcon, XIcon  } from '@heroicons/react/outline'

type Tag = {
  id: string;
  name: string;
}

type Schedule = {
  id: string;
  title: string;
  type_schedule: string;
  type_scheduleDescription?: string;
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

const acceptedTypeSchedule = {
  'daily': 'Diário',
  'weekly': 'Semanal',
  'monthly': 'Mensal'
}

export default function DetailSchedule({schedule, jobs}: ScheduleDetailProps) {
  const router = useRouter()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  async function fetchJobs() {
    if(schedule.id) {
      const { data } = await api.get(`/jobs/schedule/${schedule.id}`)
      const jobs = data.map(job => ({
        ...job,
        date_job_description:  new Intl.DateTimeFormat('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date(data[0].date_job))
      }))
      return jobs;
    }
    return []
  }
  const {data: jobsData, isLoading, error, refetch } = useQuery('jobs', fetchJobs, {
    initialData: jobs
  })


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
    await refetch()
    console.log(jobsData)
  }

  function openModalConfirm() {
    setIsOpenModal(true)
  }

  async function handleDownloadDoc(jobId: string) {
    const response = await api(`jobs/${jobId}/export_docx`);
    window.open(`${process.env.NEXT_PUBLIC_API}/files/${response.data}`)
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
            <a className="btn btn-primary">
              <PencilAltIcon className="h-4 w-4" />
            </a>
          </NextLink>
          {schedule.active 
          ? (
          <button onClick={handleDesactiveSchedule} className="btn bg-gray-300 text-gray-700">
            <XIcon  className="h-4 w-4" />
          </button>
          )
          : (
          <button onClick={handleActiveSchedule} className="btn bg-green-500 text-white">
            <CheckIcon className="h-4 w-4" />
          </button>
          )
          }
          <button onClick={handleRunJob} className="btn bg-purple-400 text-white">
            {isLoading ? 'Executando...' : <CogIcon className="h-4 w-4"/>}
          </button>
        </div>
      </div>
      <ul className="space-y-3">
        <li><strong className="mr-2">Nome:</strong>{schedule.title}</li>
        <li><strong className="mr-2">Tipo:</strong>{schedule.type_scheduleDescription}</li>
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

    {jobsData.map(job => (
      <div key={job.id} className="flex flex-1 flex-col rounded-md bg-gray-100 p-4 mt-4">
        <div className="flex justify-between w-full items-center mb-8 ">
          <h1 className="text-2xl font-normal text-gray-600">
            Trabalho execuado em {job.date_job_description}
          </h1>
          <div>
            <button className="btn bg-blue-400 text-white mr-2" onClick={() => handleDownloadDoc(job.id)}>Detalhes</button>
            <button className="btn bg-green-500 text-white" onClick={() => handleDownloadDoc(job.id)}>Baixar .docx</button>
          </div>
        </div>
        <span>Foram encontradas: {job.items.length} propostas</span>
        {/* <table className="table-fixed text-sm">
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
        </table> */}
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
  const { data } = await api.get(`/schedules/${id}`)
  const schedule = Object.assign(data, {
    type_scheduleDescription: acceptedTypeSchedule[data.type_schedule]
  })

  const { data: jobs } = await api.get(`/jobs/schedule/${id}`)

  return {
    props: { schedule, jobs }
  }
})
