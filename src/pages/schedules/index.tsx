import { PlusCircleIcon, ClockIcon } from '@heroicons/react/outline'
import NextLink from 'next/link'
import { useSchedules } from "../../services/hooks/useSchedule";
import { useRouter } from "next/router";
import { DefaultLayoutComponent } from "../../components/DefaultLayout";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { getSession } from 'next-auth/client';

type Schedule = {
  id: string;
  name: string;
  type_schedule: string;
  type_scheduleDescription?: string;
  terms: string[];
  active: boolean
}

type ScheduleListProps = {
  schedules: Schedule[]
  owner_id: string;
}


export default function ScheduleList({schedules, owner_id}: ScheduleListProps) {
  const router = useRouter()
  const {data, isLoading, error, isFetching, refetch} = useSchedules(1, owner_id)


  function handleDetailSchedule(id: string) {
    router.push(`/schedules/${id}/detail`)
  }

  return (
    <DefaultLayoutComponent title="Agendamentos">
      <div className="grid grid-cols-4 gap-8 ">
        <NextLink href="/schedules/create" passHref>
          <div className="bg-transparent border-4 border-dashed border-blue-400 text-blue-400 rounded-md pt-4 pb-10 lg:pt-2 lg:pb-6 px-2 flex flex-col justify-center items-center cursor-pointer hover:-translate-y-1.5 hover:border-opacity-75 hover:text-opacity-75 transform transition">
            <PlusCircleIcon className="h-40 w-40 lg:h-28 lg:w-28" />
            <h1 className="text-2xl text-gray-700 tracking-wide text-center lg:text-xl">Novo agendamento</h1>
            <small className="text-gray-400 text-center text-md mt-2 lg:text-sm">Crie um agendamento para receber e-mails com informações.</small>
          </div>
        </NextLink>
        {data?.schedules.map(schedule => (
          <div key={schedule.id} onClick={() => handleDetailSchedule(schedule.id)} className="bg-white rounded-md pt-4 pb-10 px-2 flex flex-col justify-center items-center cursor-pointer hover:-translate-y-1.5 transform transition">
            {schedule.active
              ? (<ClockIcon className=" text-blue-400 h-40 w-40" />)
              : (<ClockIcon className=" text-gray-400 h-40 w-40" />)
            }
            
            <h1 className="text-2xl text-gray-700 tracking-wide text-center">{schedule.type_scheduleDescription}</h1>
            <small className="text-gray-400 text-center text-md mt-2">{schedule.name}</small>
            {schedule.active 
              ? (<span className="bg-green-400 mt-2 px-2 py-1 rounded-md text-xs text-white ">Ativado</span>) 
              : (<span className="bg-gray-300 mt-2 px-2 py-1 rounded-md text-xs text-gray-700 ">Desativado</span>)}
          </div>
        ))}
      </div>
    </DefaultLayoutComponent>
  )
}

export const getServerSideProps = withSSRAuth(async ({req}) => {
  const session = await getSession({req})

  return {
    props: {
      owner_id: session.sub
    }
  }
})