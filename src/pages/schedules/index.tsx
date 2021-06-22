import { Sidebar } from "../../components/Sidebar";
import { PlusIcon, PencilIcon, XIcon, EyeIcon } from '@heroicons/react/outline'
import NextLink from 'next/link'
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { useSchedules } from "../../services/hooks/useSchedule";
import { useState } from "react";
import { useRouter } from "next/router";
import { ConfirmModal } from "../../components/ConfirmModal";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

type Schedule = {
  id: string;
  title: string;
  repeat: string;
  terms: string[];
  active: boolean
}

type ScheduleListProps = {
  schedules: Schedule[]
}


export default function ScheduleList({schedules}: ScheduleListProps) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const {data, isLoading, error, isFetching, refetch} = useSchedules(page)

  const removeSchedule = useMutation(async (schedule: Schedule) => {
    await api.delete(`schedules/${schedule.id}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('schedules')
    }
  })

  function handleEditSchedule(id: string) {
    router.push(`/schedules/${id}/edit`)
  }
  function handleDetailSchedule(id: string) {
    router.push(`/schedules/${id}/detail`)
  }

  function openModalConfirm(data: Schedule) {
    setSelectedSchedule(data)
    setIsOpenModal(true)
  }
  async function handleRemoveSchedule() {
    await removeSchedule.mutateAsync(selectedSchedule)
    setIsOpenModal(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex w-full my-6 mx-auto px-6 max-w-screen-2xl">
        <Sidebar />
        <div className="flex flex-1 flex-col rounded-md bg-gray-100 p-4">
          <div className="flex justify-between w-full items-center mb-8 ">
            <h1 className="text-2xl font-normal text-gray-600">
              Meus Agendamentos
            </h1>
            <NextLink href="/schedules/create" passHref>
              <a className=" flex justify-center items-center  py-2 px-3 rounded-md text-sm bg-brand text-white">
                <PlusIcon className="h-5 w-5 mr-2" />
                <span className="uppercase">Criar novo</span>
              </a>
            </NextLink>
          </div>
          {isLoading ? (
              <div className="w-full flex flex-col justify-center items-center">
                <svg className="animate-spin -ml-1 mr-3 h-14 w-14 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
          ) : (
          <>
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">#</th>
                  <th className="py-3 px-6 text-left">Nome</th>
                  <th className="py-3 px-6 text-left">Repetição</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {data.schedules.map(schedule => (
                  <tr key={schedule.id} className="border-b border-gray-200 hover:bg-gray-200">
                    <td className="py-3 px-6 text-left whitespace-nowrap" >{schedule.id}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap" >{schedule.title}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap" >{schedule.repeat}</td>
                    <td className="py-3 px-6 text-center" >
                      {schedule.active 
                      ? (<span className="bg-green-400 px-2 py-1 rounded-md text-xs text-white ">Ativado</span>) 
                      : (<span className="bg-gray-300 px-2 py-1 rounded-md text-xs text-gray-700 ">Desativado</span>)}
                    </td>
                    <td className="py-3 px-6 text-center flex space-x-1" >
                      <button onClick={() => handleDetailSchedule(schedule.id)} className="flex justify-center items-center  bg-brand text-xs text-white rounded-md p-1">
                        <EyeIcon className="h-3 w-3"/>
                      </button>
                      <button onClick={() => handleEditSchedule(schedule.id)} className="flex justify-center items-center  bg-blue-500 text-xs text-white rounded-md p-1">
                        <PencilIcon className="h-3 w-3"/>
                      </button>
                      <button onClick={() => openModalConfirm(schedule)} className=" flex justify-center items-center bg-red-400 text-xs text-white rounded-md p-1">
                        <XIcon className="h-3 w-3"/>
                      </button>
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
            <Pagination 
              totalCountOfRegisters={data.totalCount}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
          )}
        </div>
      </div>
      <ConfirmModal
        title="Tem certeza desta ação?"
        isOpen={isOpenModal}
        handleCloseModal={() => setIsOpenModal(false)}
        handleConfirmModal={handleRemoveSchedule}
        text="Deseja remover este item do banco de dados?"
      />
    </div>
  )
}
