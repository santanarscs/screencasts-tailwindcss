import { Menu, Transition } from '@headlessui/react'
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next';
import { api } from '../../../../services/api';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from '../../../../services/queryClient';
import { Fragment, useState } from 'react';
import { ConfirmModal } from '../../../../components/ConfirmModal';
import { withSSRAuth } from '../../../../utils/withSSRAuth';
import { DefaultLayoutComponent } from '../../../../components/DefaultLayout';
import { PencilAltIcon, CogIcon, CheckIcon, TrashIcon, XIcon, ClockIcon, UserIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'


type Schedule = {
  id: string;
  name: string;
  type_proposition: {label:string ,value: string}[];
  type_schedule: string;
  type_scheduleDescription?: string;
  tags: string[];
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
          hour: 'numeric', minute: 'numeric', second: 'numeric'
        }).format(new Date(job.date_job))
      }))
      return jobs;
    }
    return []
  }
  const {data: jobsData, isLoading, error, refetch } = useQuery('jobs', fetchJobs, {
    initialData: jobs
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
  function handleEditSchedule() {
    router.push(`/schedules/${schedule.id}/edit`)
  }
  function handleDetailJob(job_id: string) {
    router.push(`/jobs/${job_id}`)
  }

  async function handleRunJob() {
    await api.post('/jobs/run',  {
      schedule_id: schedule.id
    })
    await refetch()
  }


  async function handleDownloadDoc(jobId: string) {
    const response = await api(`jobs/${jobId}/export_docx`);
    window.open(`${process.env.NEXT_PUBLIC_API}/files/${response.data}`)
  }

  return (
    <DefaultLayoutComponent title="Detalhes Agendamento">
    <div className="flex flex-1 flex-col rounded-md bg-gray-100 p-4">
      <div className="flex justify-between w-full items-center mb-8 ">
        <h1 className="text-2xl font-normal text-gray-600">
          Detalhes
        </h1>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-brand rounded-md  hover:bg-opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Opções
              <ChevronDownIcon
                className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleEditSchedule}
                    className={`${
                      active ? 'bg-violet-500 text-brand' : 'text-gray-700'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <PencilAltIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <PencilAltIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    Editar
                  </button>
                )}
              </Menu.Item>
              {schedule.active 
                ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleDesactiveSchedule}
                        className={`${
                          active ? 'bg-violet-500 text-brand' : 'text-gray-700'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <XIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <XIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        Desativar
                      </button>
                    )}
                  </Menu.Item>
                )
                : (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleActiveSchedule}
                        className={`${
                          active ? 'bg-violet-500 text-brand' : 'text-gray-700'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <CheckIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <CheckIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        Ativar
                      </button>
                    )}
                  </Menu.Item>
                )
              }
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleRunJob}
                    className={`${
                      active ? 'bg-violet-500 text-brand' : 'text-gray-700'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <CogIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <CogIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    Rodar Trabalho
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setIsOpenModal(true)}
                    className={`${
                      active ? 'bg-violet-500 text-brand' : 'text-gray-700'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <TrashIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <TrashIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    Deletar
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
        </Menu>
      </div>
      <ul className="space-y-3">
        <li><strong className="mr-2">Nome:</strong>{schedule.name}</li>
        <li><strong className="mr-2">Tipo:</strong>{schedule.type_scheduleDescription}</li>
        <li>
            <strong className="mr-2">Tipos de propostas:</strong>
            {schedule.type_proposition?.length 
              ? (<>{schedule.type_proposition.map(type => type.label).join(' - ')}</>)
              : (<span>Buscar por todos os tipos de Sigla</span>)
            }
            
        </li>
        <li>
        <strong className="mr-2">Status:</strong>{schedule.active 
                  ? (<span className="bg-green-400 px-2 py-1 rounded-md text-xs text-white ">Ativado</span>) 
                  : (<span className="bg-gray-300 px-2 py-1 rounded-md text-xs text-gray-700 ">Desativado</span>)}
        </li>
        <li><strong className="mr-2">Termos:</strong>
          <div className="space-x-2 mt-2">
            {schedule.tags.map(tag => ( <span className="py-1 px-2 bg-gray-300 rounded-md text-sm"  key={tag}>{tag}</span>))}
          </div>
        </li>
      </ul>
    </div>
    <div className="relative container mx-auto px-6 flex flex-col space-y-8">
      <div className="absolute z-0 w-2 h-full bg-white shadow-md inset-0 left-17 md:mx-auto md:right-0 md:left-0" ></div>
      {jobsData.map((job, index) => (
        <div key={job.id} className="relative z-10">
          {job.origin === 'schedule' ? (
            <div className="timeline-img flex items-center justify-center h-24 w-24 bg-yellow-100 rounded-full">
              <ClockIcon className="h-16 w-16  text-yellow-500" />
            </div>
          ) : (
            <div className="timeline-img flex items-center justify-center h-24 w-24 bg-blue-100 rounded-full">
              <UserIcon className="h-16 w-16  text-blue-500" />
            </div>
          )}
          
          <div className={(index % 2) === 0  ? `timeline-container` : 'timeline-container timeline-container-left'}>
            <div className={(index % 2) === 0 ? `timeline-pointer` : 'timeline-pointer timeline-pointer-left'} aria-hidden="true"></div>
            <div onClick={() => handleDetailJob(job.id)} className="bg-white p-6 rounded-md shadow-md cursor-pointer hover:shadow-xl transform transition">
              <span className="font-bold text-brand text-sm tracking-wide">{job.date_job_description}</span>
              {/* <h1 className="text-2xl font-bold pt-1">
                  An amazing travel
              </h1> */}
              <p className="pt-1">
                  Foram encontrados {job.items.length} propostas neste trabalho
              </p>
            </div>
          </div>
        </div>
      ))}
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
  const { data } = await api.get(`/schedules/${id}`)
  const schedule = Object.assign(data, {
    type_scheduleDescription: acceptedTypeSchedule[data.type_schedule]
  })

  const { data: jobs } = await api.get(`/jobs/schedule/${id}`)

  return {
    props: { schedule, jobs }
  }
})
