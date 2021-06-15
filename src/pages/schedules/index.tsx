import { Sidebar } from "../../components/Sidebar";
import { PlusIcon } from '@heroicons/react/outline'
import NextLink from 'next/link'
import { Header } from "../../components/Header";

type Schedule = {
  id: string;
  title: string;
  description: string;
  repeat: string;
  terms: string[];
}

type ScheduleListProps = {
  schedules: Schedule[]
}


export default function ScheduleList({schedules}: ScheduleListProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex w-full my-6 mx-auto px-6 max-w-screen-2xl">
        <Sidebar />
        <div className="flex flex-1 flex-col rounded-md bg-gray-100 p-4">
          <div className="flex justify-between w-full items-center mb-8 ">
            <h1 className="text-2xl font-normal text-gray-600">Agendamentos</h1>
            <NextLink href="schedules/create" passHref>
              <a className=" flex justify-center items-center  py-2 px-3 rounded-md text-sm bg-blue-500 text-white">
                <PlusIcon className="h-5 w-5 mr-2" />
                <span className="uppercase">Criar novo</span>
              </a>
            </NextLink>
          </div>
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Nome</th>
                <th className="py-3 px-6 text-left">Descrição</th>
                <th className="py-3 px-6 text-left">Repetição</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap" >1</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Agendamento 001</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Descrição do agendamento</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Diário</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap" >1</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Agendamento 001</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Descrição do agendamento</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Diário</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap" >1</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Agendamento 001</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Descrição do agendamento</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Diário</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap" >1</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Agendamento 001</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Descrição do agendamento</td>
                <td className="py-3 px-6 text-left whitespace-nowrap" >Diário</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}