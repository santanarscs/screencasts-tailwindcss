import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from "../../../services/api";
import { queryClient } from "../../../services/queryClient";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Input } from "../../../components/Form/Input";
import { Select } from "../../../components/Form/Select";
import { InputTags } from "../../../components/Form/InputTag";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { DefaultLayoutComponent } from "../../../components/DefaultLayout";
import { MultiSelect } from '../../../components/Form/MultiSelect';

type Schedule = {
  id: string;
  name: string;
  type_proposition: {label:string ,value: string}[];
  owner_id: string;
  type_schedule: string;
  tags: string[],
  active: boolean,
}

type CreateSchedule = {
  name: string;
  type_proposition: {label:string ,value: string}[];
  owner_id: string;
  type_schedule: string;
  tags: string[],
  active: boolean,
}

const acceptedTypeSchedule = {
  'daily': 'Diário',
  'weekly': 'Semanal',
  'monthly': 'Mensal'
}



type CreateScheduleFormData = {
  name: string;
  type_proposition: {label:string ,value: string}[];
  owner_id: string;
  type_schedule: {label:string ,value: string};
  tags: string[],
  active: boolean,
}
type ScheduleEditProps = {
  schedule: Schedule
}


const createScheduleFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  type_schedule: yup.string().required('Repetição obrigatório'),
  target: yup.string().required('Alvo obrigatório'),
})

export default function EditSchedule({ schedule }: ScheduleEditProps) {
  
  const router = useRouter()

  const [tags, setTags] = useState<string[]>(() => {
    if(schedule.tags){
      return schedule.tags
    }
    return [] 
  })

  const options = [
    {label: 'Diário', value:'daily'},
    {label: 'Semanal', value: 'weekly' },
    {label: 'Mensal', value: 'monthly'}
  ]

  const optionsPropositions = [
    {label: 'PEC - Proposta de Emenda à Constituição', value: 'PEC'},
    {label: 'PLP - Projeto de Lei Complementar', value: 'PLP'},
    {label: 'PL - Projeto de Lei', value: 'PL'},
    {label: 'MPV - Medida Provisória', value: 'MPV'},
    {label: 'PLV - Projeto de Lei de Conversão', value: 'PLV'},
    {label: 'PDC - Projeto de Decreto Legislativo', value: 'PDC'},
    {label: 'PRC - Projeto de Resolução', value: 'PRC'},
    {label: 'REQ - Requerimento', value: 'REQ'},
    {label: 'RIC - Requerimento de Informação', value: 'RIC'},
    {label: 'RCP - Requerimento de Instituição de CPI', value: 'RCP'},
    {label: 'MSC - Mensagem', value: 'MSC'},
    {label: 'INC - Indicação', value: 'INC'},
  ]

  const createSchedule = useMutation(async (data: CreateSchedule) => {
    const response = await api.put(`/schedules/${schedule.id}`, data)
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('schedules')
    }
  })

  const { register, control, handleSubmit, formState, reset } = useForm({
    // resolver: yupResolver(createScheduleFormSchema)
  })

  useEffect(() => {
    reset(schedule)
  },[reset])

  const handleCreateSchedule: SubmitHandler<CreateScheduleFormData> = async (values) => {
    await createSchedule.mutateAsync({
      ...values, 
      type_schedule: values.type_schedule.value,
      tags
    })
    router.push('/schedules')
  }
  const { errors } = formState

  function handleAddTag(tag: string) {
    setTags([...tags, tag])

  }
  function handleRemoveTag(index: number) {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  return (
    <DefaultLayoutComponent>
      <div className="flex flex-1 flex-col rounded-md bg-gray-100 p-4">
        <div className="flex justify-between w-full items-center mb-8 ">
          <h1 className="text-2xl font-normal text-gray-600">
            Novo Agendamento
          </h1>
        </div>
        <form className="flex flex-1 flex-col space-y-3" >
        <Input name="name" label="Nome" error={errors.name} {...register('name')} />
          <MultiSelect name="type_proposition" defaultValue={control.defaultValuesRef.current.type_proposition} label="Siglas" control={control} options={optionsPropositions} />
          <Select name="type_schedule" label="Tipo" placeholder="Selecione o tipo" error={errors.type_schedule} control={control} options={options} />
          <InputTags name="tags" label="Termos" tags={tags} handleAddTag={handleAddTag} handleRemoveTag={handleRemoveTag} />
          <button type="button" onClick={handleSubmit(handleCreateSchedule)} className="btn btn-primary">Salvar</button>
        </form>
      </div>
    </DefaultLayoutComponent>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({params}) => {
  const { id } = params;
  const response = await api.get(`/schedules/${id}`)

  const schedule = Object.assign(response.data, {
    type_schedule: {label: acceptedTypeSchedule[response.data.type_schedule], value: response.data.type_schedule}
  })
  return {
    props: { schedule }
  }
})
