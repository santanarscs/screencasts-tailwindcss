import { SubmitHandler, useForm } from 'react-hook-form'
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

type Tag = {
  id: string;
  name: string;
}

type Schedule = {
  id: string;
  title: string;
  type_schedule: string;
  target: string;
  tags: Tag[];
  active: boolean
}

type CreateScheduleFormData = {
  title: string;
  type_schedule: string;
  tags: string[],
  target: string;
  active: boolean,
}
type ScheduleEditProps = {
  schedule: Schedule
}


const createScheduleFormSchema = yup.object().shape({
  title: yup.string().required('Nome obrigatório'),
  type_schedule: yup.string().required('Repetição obrigatório'),
  target: yup.string().required('Alvo obrigatório'),
})


export default function EditSchedule({ schedule }: ScheduleEditProps) {
  
  const router = useRouter()

  const [tags, setTags] = useState<string[]>(() => {
    if(schedule.tags){
      return schedule.tags.map(tag => tag.name)
    }
    return [] 
  })

  const options = [
    {label: 'Diário', value:'daily'},
    {label: 'Semanal', value: 'weekly' },
    {label: 'Mensal', value: 'monthly'}
  ]

  const targetOptions = [
    {label: 'Câmara dos Deputados', value: 'camara_deputados'},
    {label: 'Senado Federal', value: 'senado'},
    {label: 'Diário Oficial da União', value: 'diario_oficial'},
  ]

  const createSchedule = useMutation(async (data: CreateScheduleFormData) => {
    const response = await api.put(`/schedules/${schedule.id}`, data)
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('schedules')
    }
  })

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(createScheduleFormSchema)
  })

  useEffect(() => {
    reset({...schedule})
  },[reset])

  const handleCreateSchedule: SubmitHandler<CreateScheduleFormData> = async (values) => {
    await createSchedule.mutateAsync({...values, tags})
    router.push('/schedules')
  }
  const { errors } = formState

  function handleAddTag(tag: string) {
    setTags([...tags, tag])

  }
  async function handleRemoveTag(index: number) {
    const tag_id = schedule.tags.find(tag => tag.name === tags[index]).id

    if(tag_id) {
      await api.delete(`/tags/${tag_id}`)
    }
    
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
          <Input name="title" label="Nome" error={errors.title} {...register('title')} />
          <Select name="type_schedule" label="Repetição" error={errors.type_schedule} {...register('type_schedule')} options={options} />
          <Select name="target" label="Alvo" error={errors.target} {...register('target')} options={targetOptions} />
          <InputTags name="terms" label="Termos" tags={tags} handleAddTag={handleAddTag} handleRemoveTag={handleRemoveTag} />
          <button type="button" onClick={handleSubmit(handleCreateSchedule)} className="btn btn-primary">Salvar</button>
        </form>
      </div>
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
