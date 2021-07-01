import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";
import { InputTags } from "../../components/Form/InputTag";
import { useState } from "react";
import { DefaultLayoutComponent } from "../../components/DefaultLayout";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useUser } from '../../services/hooks/useUser';


type CreateScheduleFormData = {
  title: string;
  target:  string;
  owner_id: string;
  type_schedule: string;
  tags: string[],
  active: boolean,
}

const createScheduleFormSchema = yup.object().shape({
  title: yup.string().required('Nome obrigatório'),
  type_schedule: yup.string().required('Tipo é obrigatório'),
  target: yup.string().required('Alvo é obrigatório')
})



export default function CreateSchedule() {
  
  const router = useRouter()

  const [tags, setTags] = useState<string[]>([])

  const { id } = useUser()
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

  const createSchedule = useMutation(async (schedule: CreateScheduleFormData) => {
    const response = await api.post('schedules', schedule)
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('schedules')
    }
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createScheduleFormSchema)
  })

  const handleCreateSchedule: SubmitHandler<CreateScheduleFormData> = async (values) => {
    await createSchedule.mutateAsync({
      ...values, 
      active: true, 
      owner_id: id,
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
          <Input name="title" label="Nome" error={errors.title} {...register('title')} />
          <Select name="type_schedule" label="Tipo" error={errors.type_schedule} {...register('type_schedule')} options={options} />
          <Select name="target" label="Alvo" error={errors.target} {...register('target')} options={targetOptions} />
          <InputTags name="terms" label="Termos" tags={tags} handleAddTag={handleAddTag} handleRemoveTag={handleRemoveTag} />
          <button type="button" onClick={handleSubmit(handleCreateSchedule)} className="btn btn-primary">Salvar</button>
        </form>
      </div>
    </DefaultLayoutComponent>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {
    }
  }
})